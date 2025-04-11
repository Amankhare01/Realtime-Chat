import { Server } from "socket.io";

let io;

const UserSocketMap = {};

const setupSocket = (app, server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      UserSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(UserSocketMap));

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
      if (userId) {
        delete UserSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(UserSocketMap));
    });
  });
};

function getReceiverSocketId(userId) {
  return UserSocketMap[userId];
}

export { setupSocket, getReceiverSocketId, io };
