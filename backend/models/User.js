const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name:String,

  rollNumber:{
    type:String,
    unique:true
  },

  department:String,

  password:String,

  isLoggedIn:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model("User",userSchema);