const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = async () => {

  await connectDB();

  await User.deleteMany();

  const users = [];

  for (let i = 1; i <= 150; i++) {

    const hashedPassword = await bcrypt.hash("123456", 10);

    users.push({
      name: `Student ${i}`,
      rollNumber: `ROLL${i}`,
      department: "CSE",
      password: hashedPassword,
      hasAttempted:false,
      submittedAt:null
    });

  }

  await User.insertMany(users);

  console.log("150 students created");

  process.exit();
};

seedUsers();