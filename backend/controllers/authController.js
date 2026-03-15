const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async(req,res)=>{

  try{

    const {rollNumber,password} = req.body;

    const user = await User.findOne({rollNumber});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).json({message:"Invalid password"});
    }

    if(user.isLoggedIn){
      return res.status(403).json({
        message:"User already logged in on another device"
      });
    }

    user.isLoggedIn = true;

    await user.save();

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"6h"}
    );

    res.json({
      token,
      user:{
        name:user.name,
        rollNumber:user.rollNumber,
        department:user.department
      }
    });

  }catch(error){

    res.status(500).json({message:error.message});

  }

};

const getProfile = async(req,res)=>{

  const user = await User.findById(req.user.id).select("-password");

  res.json(user);

};

module.exports={
  loginUser,
  getProfile
};