const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Quiz = require("../models/Quiz");

const seedQuiz = async () => {

  await connectDB();

  await Quiz.deleteMany();

  const quiz = await Quiz.create({

    title: "College Technical Quiz",

    duration: 20, // minutes

    status: "active"

  });

  console.log("Quiz created:", quiz._id);

  process.exit();
};

seedQuiz();