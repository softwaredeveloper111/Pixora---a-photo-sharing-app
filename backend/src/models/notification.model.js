const mongoose = require("mongoose");



const notificationSchema = new mongoose.Schema({
    /** jisse notification mila, like mujhe mila notification */
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    /** kisne notification ko trigger kiey ya diya */
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    /** "like" | "comment" | "follow_request" | "follow_accepted" */
    type:{
        type:String,
    },
  
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },

    read:{
        type:Boolean,
        default:false
    },  
    
},{timestamps:true})


const notificationModel = mongoose.model("Notification",notificationSchema);

module.exports = notificationModel;