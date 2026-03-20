const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");
const Admin = require("../models/Admin");

const updateRoles = async()=>{

  try{

    await connectDB();

    // update users
    await User.updateMany(
      {},
      { $set:{ role:"student" } }
    );

    // update admins
    await Admin.updateMany(
      {},
      { $set:{ role:"admin" } }
    );

    console.log("Roles updated successfully");

    process.exit();

  }catch(err){
    console.log(err);
    process.exit(1);
  }

};

updateRoles();