const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    Name:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Avtar:{type:String,required:true},
    Address:{type:String,required:true},
    Age:{type:String,required:true},
    country:{type:String,required:true}
  },
  { timeStamp: true }
);
module.exports = mongoose.model("userRegister1", userSchema);
