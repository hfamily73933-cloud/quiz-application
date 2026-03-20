const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async()=>{

  try{

    await connectDB();

    const existing = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if(existing){
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashed
    });

    console.log("Admin seeded successfully");
    process.exit();

  }catch(err){
    console.log(err);
    process.exit(1);
  }

};

seedAdmin();