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
  },

  // ✅ NEW FIELDS
  hasAttempted:{
    type:Boolean,
    default:false
  },

  submittedAt:{
    type:Date,
    default:null
  },

    // ✅ NEW
  role:{
    type:String,
    default:"student"
  }

});


module.exports = mongoose.model("User",userSchema);