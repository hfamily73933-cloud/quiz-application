const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const quizController = require("../controllers/quizController");

router.get("/questions", authMiddleware, quizController.getQuestions);

router.post("/save-answer", authMiddleware, quizController.saveAnswer);

router.post("/submit", authMiddleware, quizController.submitQuiz);

router.get("/result/:quizId", authMiddleware, quizController.getResult);

router.get("/leaderboard/:quizId", authMiddleware, quizController.getLeaderboard);

router.get("/check-attempt", authMiddleware, quizController.checkAttempt);

module.exports = router;