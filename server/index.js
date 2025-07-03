const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
const Message = require("./models/message");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
mongoose.connect("mongodb+srv://user:user_123@cluster0.crrwfdn.mongodb.net/Chat_app?retryWrites=true&w=majority&appName=Cluster0");
// Socket connection
io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  // Send previous messages
  const oldMessages = await Message.find().sort({ timestamp: 1 });
  socket.emit("previous-messages", oldMessages);

  // Save and broadcast new message
  socket.on("send-message", async (data) => {
    const saved = await Message.create({ content: data });
    io.emit("receive-message", saved); // send back entire saved object
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
