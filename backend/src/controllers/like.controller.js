const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");
const asyncWrapper = require("../middlewares/asyncWrapper.middleware")
const AppError = require("../utils/AppError")




const toggleLikeController = asyncWrapper(async(req , res) => {
const userId = req.user._id;
const postId = req.params.id;

const validPostCheck = await postModel.findById(postId);
if(!validPostCheck){
    throw new AppError("post not found" , 404)
}

/** check already user ne like kiya hai */
const alreadyLiked = await likeModel.findOne({user:userId,post:postId});
if(alreadyLiked ){
   const unlikePost =  await likeModel.findOneAndDelete({user:userId,post:postId}, {new:true});
   return res.status(200).json({
    success:true,
    message:"user unlike the post successfully",
    data:unlikePost,
    statusCode:200
   })
}


/** user first time like kar kar raha hai post ko */
const likePost = await likeModel.create({user:userId,post:postId});

const populateLikePost = await likePost.populate([
  {
    path: "post",
    select: "user image caption",
    populate: {
      path: "user",
      select: "username fullname"
    }
  },
  {
    path: "user",
    select: "username fullname email"
  }
])

return res.status(200).json({
    success:true,
    message:"user liked the post successfully",
    data:populateLikePost,
    statusCode:201
})


})





const getAllLikedUser = asyncWrapper(async(req,res)=>{
const postId = req.params.id;
const validPostCheck = await postModel.findById(postId);
if(!validPostCheck){
    throw new AppError("post is not found", 404)
}

const users = await likeModel.find({post:postId}).populate("user" ,"fullname username email");

return res.status(200).json({
    success:true,
    message:"all users list get successfully",
    data:users,
    statusCode:200
})





})





module.exports = { toggleLikeController ,getAllLikedUser}