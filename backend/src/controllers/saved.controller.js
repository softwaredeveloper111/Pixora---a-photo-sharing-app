
const savedModel = require("../models/saved.model")
const postModel = require("../models/post.model")
const asyncWraaper= require("../middlewares/asyncWrapper.middleware");
const AppError = require("../utils/AppError")



const savedToggleController = asyncWraaper(async(req,res)=>{
  const userId = req.user._id;
  const postId = req.params.id;

  const checkValidPost = await postModel.findById(postId);
  if(!checkValidPost ){
    throw new AppError("post not found" , 404)
  }
   
  /** is post already Saved then removed the post from saved collection */
  const isSavedPost = await savedModel.findOne({user:userId, post:postId});
  if(isSavedPost){
    const response = await savedModel.findOneAndDelete({user:userId,post:postId});
    return res.status(200).json({
    success:true,
    message:"post remove from saved collection",
    statusCode:200,
    data:response
    })
  }

  /** saved post */
  const savedPost = await savedModel.create({user:userId, post:postId});
  const populateSavedPost = await savedPost.populate("post" , "user image caption hashtags")
  return res.status(201).json({
    success:true,
    message:"post saved successfully",
    statusCode:201,
    data:populateSavedPost
  })

})



module.exports = {savedToggleController}