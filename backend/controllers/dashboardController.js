const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");
const User = require("../models/User");

const getDashboard = async (req,res)=>{

  try{

    const user = await User.findById(req.user.id).select(
      "name rollNumber department hasAttempted submittedAt"
    );

    const quiz = await Quiz.findOne({ status:"active" });

    if(!quiz){
      return res.json({
        profile:user,
        attempted:false,
        quizId:null
      });
    }

    // ✅ SINGLE RESPONSE ONLY
    return res.json({
      profile:user,
      attempted: user.hasAttempted,
      quizId:quiz._id
    });

  }catch(err){

    res.status(500).json({message:err.message});

  }

};

module.exports = { getDashboard };