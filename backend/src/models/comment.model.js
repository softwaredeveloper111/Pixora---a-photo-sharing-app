const mongoose = require("mongoose");





const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:[true,"post should be required in comment schema"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user should be required in comment scheam"],
    },

    text:{
        type:String,
        required:true,
        minlength:[1,"1 character should be required"],
        maxlength:[150,"150 character exceed"]
    }
},
{
    timestamps:true
}
)

const commentModel = mongoose.model("Comment", commentSchema)


module.exports = commentModel