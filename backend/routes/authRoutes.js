const express = require("express");
const router = express.Router();

const {
  loginUser,
  getProfile,
  logoutUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/login",loginUser);

router.get("/profile",authMiddleware,getProfile);

/* NEW ROUTE */
router.post("/logout",authMiddleware,logoutUser);

module.exports = router;