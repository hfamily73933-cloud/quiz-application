const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const socketHandler = require("./sockets/socketHandler");

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

socketHandler(io);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/quiz",quizRoutes);
app.use("/api/dashboard",dashboardRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});