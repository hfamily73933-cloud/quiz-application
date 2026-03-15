const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

  title:String,

  duration:Number,

  status:{
    type:String,
    enum:["inactive","active","completed"],
    default:"inactive"
  }

});

module.exports = mongoose.model("Quiz",quizSchema);