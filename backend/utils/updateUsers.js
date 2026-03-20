const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");

const updateUsers = async () => {

  try{

    await connectDB();

    await User.updateMany(
      {},
      {
        $set:{
          hasAttempted:false,
          submittedAt:null,
          isLoggedIn:false
        }
      }
    );

    console.log("All users updated successfully");

    process.exit();

  }catch(err){
    console.log(err);
    process.exit(1);
  }

};

updateUsers();