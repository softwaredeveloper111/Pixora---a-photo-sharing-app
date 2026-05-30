const mongoose = require("mongoose");




const savedSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"user should be required in saved schema"],
   },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:[true,"post should be required in saved schema"],
   }
},{timestamps:true})

savedSchema.index({user:1,post:1},{unique:true})


const savedModel = mongoose.model('Saved',savedSchema)


module.exports = savedModel;