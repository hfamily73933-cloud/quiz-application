const express = require("express");
const router = express.Router();

const {
  loginUser,
  getProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/login",loginUser);

router.get("/profile",authMiddleware,getProfile);

module.exports = router;