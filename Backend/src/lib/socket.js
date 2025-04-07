import { Server } from "socket.io";
import http from "http";

let io;

const setupSocket = (app, server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const UserSocketMap = {};
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    const userId = socket.handshake.query.userId
    if(userId) UserSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(UserSocketMap))
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
        delete UserSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(UserSocketMap))
    });
  });
};
function getReceiverSocketId(userId){
  return UserSocketMap[userId];
}

export { setupSocket, io, getReceiverSocketId };
