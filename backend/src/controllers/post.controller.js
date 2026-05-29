const postModel = require("../models/post.model")
const asyncWrapper = require("../middlewares/asyncWrapper.middleware")
const AppError = require("../utils/AppError");


const uploadImageToImageKit = require("../config/imageKit")







const createPostController = asyncWrapper(async(req,res)=>{

  const userId = req.user._id;

  const imageFile = req.file;

  const caption = req.body?.caption
  
  const hashtags = req.body.hashtags
  ? JSON.parse(req.body.hashtags)
  : [];

  // console.log(userId);
  // console.log(imageFile);
  // console.log(caption);
  // console.log(hashtags); 



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

  const populateCreatePost = await createPost.populate("user" , "username fullname email")


  
  res.status(201).json({
    success: true,
    message:"post created successfully",
    data: populateCreatePost,
    statusCode:201
  })
})












module.exports = {createPostController}