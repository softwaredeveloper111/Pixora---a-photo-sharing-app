const messageModel = require("../models/message.model");


const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require('../utils/ApiError');
const ApiResponse = require("../utils/ApiResponse");

 const { getIO } = require("../socket/socket");

// Helper function to generate consistent room ID
function getRoomId(userId1, userId2) {
  const sorted = [userId1, userId2].sort().join('_');
  return `room_${sorted}`;
}


const sendMessageController = asyncWrapper(async (req, res) => {
  const receiverId = req.params.userId;
  const { text } = req.body;
  const senderId = req.user._id;

  // Validation
  if (!text || !text.trim()) {
    throw new AppError("Message text cannot be empty", 400);
  }

  if (senderId.toString() === receiverId) {
    throw new AppError("Cannot message yourself", 400);
  }

  // Save message to DB
  const message = await messageModel.create({
    sender: senderId,
    receiver: receiverId,
    text: text.trim(),
    seen: false,
  });

  // Populate sender and receiver details
  await message.populate([
    { path: "sender", select: "username profilePhoto" },
    { path: "receiver", select: "username profilePhoto" },
  ]);

  // Emit via Socket.io (real-time)
 
  const io = getIO();
  const roomId = getRoomId(senderId, receiverId);

  io.to(roomId).emit("message:new", {
    _id: message._id,
    sender: message.sender,
    receiver: message.receiver,
    text: message.text,
    seen: message.seen,
    createdAt: message.createdAt,
  });

  // Also notify receiver if they're not in room
  io.to(`user:${receiverId}`).emit("message:received", {
    _id: message._id,
    sender: message.sender,
    text: message.text,
    createdAt: message.createdAt,
  });

  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: message,
    statusCode:201
  });
});




const getConversationController = asyncWrapper(async (req, res) => {
  const otherUserId  = req.params.userId;
  const currentUserId = req.user._id;
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  // Fetch messages between current user and other user
  const messages = await messageModel
    .find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    })
    .populate("sender", "username profilePhoto")
    .populate("receiver", "username profilePhoto")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  // Mark messages as seen
  await messageModel.updateMany(
    {
      receiver: currentUserId,
      sender: otherUserId,
      seen: false,
    },
    { seen: true }
  );

  // Emit "messages:read" event via Socket.io
  const { getIO } = require("../socket/socket");
  const io = getIO();
  const roomId = getRoomId(currentUserId, otherUserId);
  io.to(roomId).emit("messages:read", { userId: currentUserId });

  const total = await messageModel.countDocuments({
    $or: [
      { sender: currentUserId, receiver: otherUserId },
      { sender: otherUserId, receiver: currentUserId },
    ],
  });

  res.status(200).json({
    success: true,
    data: messages.reverse(),
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
});




const getAllConversationsListController = asyncWrapper(async (req, res) => {
  const currentUserId = req.user._id;

  // Get all unique users this user has messaged
  const conversations = await messageModel.aggregate([
    {
      $match: {
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$sender", currentUserId] },
            "$receiver",
            "$sender",
          ],
        },
        lastMessage: { $first: "$text" },
        lastMessageTime: { $first: "$createdAt" },
        unreadCount: {
          $sum: {
            $cond: [
              { $and: [
                { $eq: ["$receiver", currentUserId] },
                { $eq: ["$seen", false] },
              ] },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: { lastMessageTime: -1 },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        username: "$user.username",
        profilePhoto: "$user.profilePhoto",
        lastMessage: 1,
        lastMessageTime: 1,
        unreadCount: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: conversations,
  });
});




module.exports = {sendMessageController ,  getConversationController , getAllConversationsListController  }