const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
  
},{timestamps:true})


likeSchema.index({user:1,post:1},{unique:true});

const likeModel = mongoose.model("Like" , likeSchema);


module.exports = likeModel;