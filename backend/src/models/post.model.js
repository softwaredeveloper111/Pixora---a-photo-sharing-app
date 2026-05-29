const mongoose = require("mongoose");






const postSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:[true,"image author should be required"]
  },

  image:{
    type:String,
    required:[true,'image url should be required'],
    },

  caption:{
    type:String,
    default:"",
    maxlength:[100,'caption should be less than 100 characters'],
  },

  hashtags: {
  type: [String],
  default: [],
  lowercase: true,
  trim: true,
},


},
  { timestamps: true }
)



const postModel = mongoose.model("Post" , postSchema);

module.exports = postModel;