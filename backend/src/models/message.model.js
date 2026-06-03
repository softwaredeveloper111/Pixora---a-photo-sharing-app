const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    text:{
        type:String,
        minlength:[1,"message should be at least 1 character long"],
        maxlength:[1000,"message should be at most 1000 characters long"],
        required:[true,'message is required']
    },
    seen:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

const messageModel = mongoose.model("Message",messageSchema);

module.exports = messageModel;