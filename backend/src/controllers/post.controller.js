const postModel = require("../models/post.model");
const userModel = require("../models/user.model")
const followModel = require("../models/follow.model")

const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require('../utils/ApiError');
const ApiResponse = require("../utils/ApiResponse");


const uploadImageToImageKit = require("../config/imageKit")







const createPostController = asyncWrapper(async(req,res)=>{

  console.log("i am here.")

  const userId = req.user._id;

  const imageFile = req.file;

  const caption = req.body?.caption
  
  const hashtags = req.body.hashtags
  ? JSON.parse(req.body.hashtags)
  : [];

 
  const uploadResult = await uploadImageToImageKit(imageFile.buffer);
  
  if(!uploadResult || !uploadResult.url){
    throw new AppError("Failed to upload image" , 500)
  }

  const createPost =await postModel.create({
    user:userId,
    image:uploadResult.url,
    caption,
    hashtags
  })

  const populateCreatePost = await createPost.populate("user" , "username fullname email profilePhoto coverPhoto")


  
  res.status(201).json({
    success: true,
    message:"post created successfully",
    data: populateCreatePost,
    statusCode:201
  })
})






const feedPostController = asyncWrapper(async(req,res)=>{


const userId = req.user._id;

const following = await followModel.find({follower:userId,status:"accept"});

const followingIds = following.map(item=>item.following);

const posts = await postModel.find({
  user:{$in:followingIds}
}).sort({ createdAt: -1 }).populate("user" , "username fullname email profilePhoto coverPhoto")

res.status(200).json({
  success:true,
  message:"feed fetched successfully",
  data:posts,
  statusCode:200

})
})







const explorePostController = asyncWrapper(async(req,res)=>{
  const userId = req.user._id;
  const following = await followModel.find({follower:userId,status:"accept"});
  const followingIds = following.map(item=>item.following);
  
   
  const posts = await postModel.find({
    user:{$nin:[...followingIds,userId]}
  }).populate("user" , "username fullname email profilePhoto coverPhoto").sort({ createdAt: -1 })

  res.status(200).json({
    success:true,
    message:"explore feed fetched successfully",
    data:posts,
    statusCode:200
  })

})






const singlePostController = asyncWrapper(async(req,res)=>{

  const postId = req.params.postId;

  const validPost = await postModel.findById(postId).populate("user","fullname username email profilePhoto coverPhoto");

  if(!validPost){
    throw new AppError("post not found" , 404)
  }

  res.status(200).json({
    success:true,
    message:"post fetched successfully",
    data:validPost,
    statusCode:200
  })

})






const  deletePostController = asyncWrapper(async(req,res)=>{

  const postId = req.params.postId;
  const userId = req.user._id;

  const validPost = await postModel.findById(postId);

  if(!validPost){
    throw new AppError("post not found" , 404)
  }

  if(validPost.user.toString() !== userId.toString()){
    throw new AppError("you are not authorized to delete this post" , 403)
  }

  await postModel.findByIdAndDelete(postId);

  res.status(200).json({
    success:true,
    message:"post deleted successfully",
    statusCode:200
  })

})





const getAllPostController = asyncWrapper(async(req,res)=>{

  const userId = req.params.userId;
  const validUser = await userModel.findById(userId)
  if(!validUser){
    throw new AppError("user not found" , 404)
  }

  const userPost = await postModel.find({user:userId}).sort({createdAt:-1}).populate("user" , "fullname username email profilePhoto coverPhoto");

  res.status(200).json({
    success:true,
    message:"user posts fetched successfully",
    data:userPost,
    statusCode:200
  })
})








module.exports = {createPostController ,feedPostController ,explorePostController ,singlePostController , deletePostController ,getAllPostController}