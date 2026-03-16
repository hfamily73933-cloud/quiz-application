const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");
const User = require("../models/User");

const getDashboard = async (req,res)=>{

  try{

    const user = await User.findById(req.user.id).select(
      "name rollNumber department"
    );

    const quiz = await Quiz.findOne({ status:"active" });

    if(!quiz){

      return res.json({
        profile:user,
        attempted:false,
        quizId:null
      });

    }

    const submission = await Submission.findOne({
      userId:req.user.id,
      quizId:quiz._id
    });

    res.json({
      profile:user,
      attempted: !!submission,
      quizId:quiz._id
    });

  }catch(err){

    res.status(500).json({message:err.message});

  }

};

module.exports = { getDashboard };