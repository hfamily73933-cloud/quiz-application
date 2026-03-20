const User = require("../models/User");
const Submission = require("../models/Submission");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// 🔐 ADMIN LOGIN (DB BASED)
exports.adminLogin = async (req,res)=>{

  try{

    const {email,password} = req.body;

    const admin = await Admin.findOne({email});

    if(!admin){
      return res.status(401).json({message:"Admin not found"});
    }

    const match = await bcrypt.compare(password,admin.password);

    if(!match){
      return res.status(401).json({message:"Invalid password"});
    }

    const token = jwt.sign(
      {id:admin._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({token});

  }catch(err){
    res.status(500).json({message:err.message});
  }

};



// 👥 GET USERS + STATUS (UPDATED)
exports.getUsers = async (req,res)=>{

  const users = await User.find().select("-password");

  const result = users.map(user=>({
    ...user.toObject(),
    attempted: user.hasAttempted,
    submittedAt: user.submittedAt
  }));

  res.json(result);
};



// ➕ ADD USER
exports.addUser = async (req,res)=>{

  try{

    const {name,rollNumber,department,password} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = new User({
      name,
      rollNumber,
      department,
      password:hashed
    });

    await user.save();

    res.json({message:"User added"});

  }catch(err){
    res.status(400).json({message:"Roll number already exists"});
  }

};



// ✏️ EDIT USER
exports.editUser = async (req,res)=>{

  const {id} = req.params;

  const data = {...req.body};

  if(data.password){
    data.password = await bcrypt.hash(data.password,10);
  }

  const updated = await User.findByIdAndUpdate(id,data,{new:true});

  res.json(updated);
};



// ❌ DELETE USER (SAFE)
exports.deleteUser = async (req,res)=>{

  const {id} = req.params;

  await Submission.deleteMany({userId:id}); // keep this

  await User.findByIdAndDelete(id);

  res.json({message:"User deleted"});
};



// 🔄 RESET LOGIN
exports.resetLogin = async (req,res)=>{

  const {id} = req.params;

  await User.findByIdAndUpdate(id,{isLoggedIn:false});

  res.json({message:"Login reset"});
};



// 🔄 RESET ATTEMPT (UPDATED)
exports.resetAttempt = async (req,res)=>{

  const {id} = req.params;

  // delete submission (keep for safety/analytics reset)
  await Submission.deleteMany({userId:id});

  // reset user attempt state
  await User.findByIdAndUpdate(id,{
    hasAttempted:false,
    submittedAt:null,
    isLoggedIn:false
  });

  res.json({
    message:"Attempt reset"
  });
};