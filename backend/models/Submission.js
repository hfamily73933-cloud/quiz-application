const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },

  answers: [
    {
      questionId: String,
      selectedOptionId: String
    }
  ],

  score: {
    type: Number,
    default: 0
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Submission", submissionSchema);