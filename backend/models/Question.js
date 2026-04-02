const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  quizId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Quiz"
  },

  question:String,

  image:String, // ✅ NEW (SAFE)

  options:[
    {
      id:String,
      text:String
    }
  ],

  correctOptionId:String

});

module.exports = mongoose.model("Question",questionSchema);
