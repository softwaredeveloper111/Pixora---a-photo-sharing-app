const mongoose = require("mongoose");



const followSchema = new mongoose.Schema({

    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"following user is required"],
    },
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"followers user is required"],
    },

    status:{
        type:String,
        default:"pending",
        enum:{
            values: ["pending","accept","reject"],
             message: '{VALUE} is not valid for status'
        }
    }

}, {timestamps:true})

followSchema.index({following:1,follower:1} , {unique:true});


const followModel = mongoose.model("Follow" , followSchema);

module.exports = followModel;