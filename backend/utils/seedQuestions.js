const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

const quizId = "69b658b6002dab6133e915a9";

const questions = [

{
  quizId,
  question: "What does MERN stand for?",
  options: [
    { id: "A", text: "MongoDB Express React Node" },
    { id: "B", text: "MySQL Express React Node" },
    { id: "C", text: "MongoDB Express Redux Node" },
    { id: "D", text: "MongoDB Express React Nest" }
  ],
  correctOptionId: "A"
},

{
  quizId,
  question: "Which company developed React?",
  options: [
    { id: "A", text: "Google" },
    { id: "B", text: "Facebook" },
    { id: "C", text: "Microsoft" },
    { id: "D", text: "Amazon" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "Which database is used in MERN?",
  options: [
    { id: "A", text: "MySQL" },
    { id: "B", text: "MongoDB" },
    { id: "C", text: "PostgreSQL" },
    { id: "D", text: "SQLite" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "Which runtime runs Node.js?",
  options: [
    { id: "A", text: "Chrome V8" },
    { id: "B", text: "Java VM" },
    { id: "C", text: "Python Engine" },
    { id: "D", text: "Ruby Engine" }
  ],
  correctOptionId: "A"
}

];

const seedQuestions = async () => {

  await connectDB();

  await Question.deleteMany();

  await Question.insertMany(questions);

  console.log("Questions inserted");

  process.exit();
};

seedQuestions();