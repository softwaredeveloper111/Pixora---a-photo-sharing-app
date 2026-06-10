const { Server } = require("socket.io");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/ApiError");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");

let io;

/** Helper function to generate consistent room ID */ 
function getRoomId(userId1, userId2) {
  const sorted = [userId1, userId2].sort().join('_');
  return `room_${sorted}`;
}

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: config.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });


  /** Middleware - Verify JWT token */
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new AppError("Authentication required", 401));
    }

    try {
      socket.user = jwt.verify(token, config.JWT_SECRET_KEY);
      next();
    } catch (error) {
      return next(new AppError("Invalid token", 401));
    }
  });



  /**  Track online users and rooms (temporary, in-memory)*/
  const onlineUsers = new Map(); // userId -> socketId
  const userRooms = new Map(); // userId -> Set of roomIds

  io.on("connection", async (socket) => {
    console.log(`[+] User connected: ${socket.id}`);

    const userId = socket.user?.id;

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }

      const username = user?.username;

      /** Track online user **/
      onlineUsers.set(userId, socket.id);
      socket.join(`user:${userId}`); /**  Personal room for notifications */

      /**  Broadcast user is online */
      socket.broadcast.emit("user:online", {
        userId,
        username,
      });

      console.log(`[+] ${username} connected (${socket.id})`);

      // ==================== MESSAGING EVENTS ====================

      /** Join a conversation room */
      socket.on("room:join", ({ otherUserId }, ack) => {
        if (!otherUserId || otherUserId === userId.toString()) {
          return ack?.({ success: false, error: "Invalid user" });
        }

        const roomId = getRoomId(userId, otherUserId);
        socket.join(roomId);

        // Track rooms for this user
        if (!userRooms.has(userId)) {
          userRooms.set(userId, new Set());
        }
        userRooms.get(userId).add(roomId);

        // Notify in room that user joined
        socket.to(roomId).emit("room:userJoined", {
          userId,
          username,
          roomId,
        });

        ack?.({ success: true, roomId });
        console.log(`[+] ${username} joined room: ${roomId}`);
      });

      // Leave a conversation room
      socket.on("room:leave", ({ roomId }, ack) => {
        socket.leave(roomId);
        userRooms.get(userId)?.delete(roomId);

        socket.to(roomId).emit("room:userLeft", {
          userId,
          username,
          roomId,
        });

        ack?.({ success: true });
        console.log(`[-] ${username} left room: ${roomId}`);
      });

      // Send a message (real-time)
      socket.on("message:send", async ({ roomId, text }, ack) => {
        if (!text || !text.trim()) {
          return ack?.({ success: false, error: "Empty message" });
        }

        try {
          // Extract receiver ID from room ID
          const [id1, id2] = roomId.split("_").slice(1); // room_id1_id2 -> [id1, id2]
          const receiverId = id1 === userId.toString() ? id2 : id1;

          // Save to DB
          const message = await messageModel.create({
            sender: userId,
            receiver: receiverId,
            text: text.trim(),
            seen: false,
          });

          // Populate and send
          await message.populate([
            { path: "sender", select: "username profilePhoto" },
            { path: "receiver", select: "username profilePhoto" },
          ]);

          // Emit to room
          io.to(roomId).emit("message:new", {
            _id: message._id,
            sender: message.sender,
            receiver: message.receiver,
            text: message.text,
            seen: message.seen,
            createdAt: message.createdAt,
          });

          // Notify receiver (even if not in room)
          io.to(`user:${receiverId}`).emit("message:received", {
            _id: message._id,
            sender: message.sender,
            text: message.text,
            createdAt: message.createdAt,
          });

          ack?.({ success: true, messageId: message._id });
          console.log(`[msg] ${username} -> ${receiverId}: ${text.substring(0, 30)}...`);
        } catch (error) {
          ack?.({ success: false, error: error.message });
        }
      });

      // Mark messages as seen
      socket.on("message:markSeen", async ({ roomId }, ack) => {
        try {
          const [id1, id2] = roomId.split("_").slice(1);
          const senderId = id1 === userId.toString() ? id2 : id1;

          await messageModel.updateMany(
            {
              sender: senderId,
              receiver: userId,
              seen: false,
            },
            { seen: true }
          );

          io.to(roomId).emit("messages:read", {
            userId,
            username,
          });

          ack?.({ success: true });
        } catch (error) {
          ack?.({ success: false, error: error.message });
        }
      });

      // ==================== TYPING INDICATORS ====================

      socket.on("typing:start", ({ roomId }, ack) => {
        socket.to(roomId).emit("typing:update", {
          userId,
          username,
          isTyping: true,
        });
        ack?.({ success: true });
      });

      socket.on("typing:stop", ({ roomId }, ack) => {
        socket.to(roomId).emit("typing:update", {
          userId,
          username,
          isTyping: false,
        });
        ack?.({ success: true });
      });

      // ==================== DISCONNECT ====================

      socket.on("disconnect", () => {
        onlineUsers.delete(userId);
        userRooms.delete(userId);

        io.emit("user:offline", { userId, username });
        console.log(`[-] ${username} disconnected (${socket.id})`);
      });
    } catch (error) {
      console.error(`[Error] ${error.message}`);
      socket.emit("error", { message: error.message });
    }
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
}

module.exports = { initSocket, getIO };