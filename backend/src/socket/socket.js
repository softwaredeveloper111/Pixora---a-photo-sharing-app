const {Server} = require("socket.io");

let io;

function initSocket(server){
    io = new Server(server,{
        cors: {
            origin: "*",
        },
    });

    io.on("connect",(socket)=>{
        console.log(`user conneced ${socket.id}`);


     socket.on("disconnect",()=>{
            console.log(`user disconnected ${socket.id}`);
        });
    });

};

function getIO(){
    if(!io){
        throw new Error("Socket not initialized");
    }
    return io;
};

module.exports = {initSocket,getIO};