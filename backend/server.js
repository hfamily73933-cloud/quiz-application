const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const compression = require("compression");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const adminRoutes = require("./routes/adminRoutes");

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

// ✅ KEEP CONNECTION ALIVE (faster repeated requests)
app.use((req, res, next) => {
  res.setHeader("Connection", "keep-alive");
  next();
});

app.use(express.json({ limit: "20kb" }));

// ✅ HANDLE INVALID JSON (prevents crash logs)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

app.use(compression());

app.use("/api/auth",authRoutes);
app.use("/api/quiz",quizRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.use("/api/admin",adminRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});