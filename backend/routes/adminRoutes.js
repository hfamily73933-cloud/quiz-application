const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  resetLogin,
  resetAttempt
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

// PUBLIC
router.post("/login",adminLogin);

// PROTECTED
router.get("/users",adminAuth,getUsers);
router.post("/user",adminAuth,addUser);
router.put("/user/:id",adminAuth,editUser);
router.delete("/user/:id",adminAuth,deleteUser);
router.patch("/reset-login/:id",adminAuth,resetLogin);
router.patch("/reset-attempt/:id",adminAuth,resetAttempt);

module.exports = router;