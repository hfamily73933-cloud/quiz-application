const express = require("express");
const router = express.Router();

// temporary route
router.get("/", (req, res) => {
  res.json({ message: "Result route working" });
});

module.exports = router;