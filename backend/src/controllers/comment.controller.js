const commentModel = require("../models/comment.model")
const postModel = require("../models/post.model")

const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require('../utils/ApiError');
const ApiResponse = require("../utils/ApiResponse");






const commentPostController = asyncWrapper(async(req,res)=>{
  const userId = req.user._id;
  const commentText = req.body.text;
  const postId = req.params.id;


  const isValidPost = await postModel.findById(postId);
  if(!isValidPost){
    throw new AppError('post is not found' , 404)
  }

  const createdComment = await commentModel.create({
    user:userId,
    post:postId,
    text:commentText
  })


  const populateCreatedComment = await createdComment.populate([
    {
        path:"post",
        select:"user image caption",
        populate:{
            path:"user",
            select:"fullname email username"
        }
    },
    {
        path:"user",
        select:"fullname username email"
    }
  ])
                                 

  return res.status(201).json({
    success:true,
    message:"comment created successfully",
    data:populateCreatedComment,
    statusCode:201
  })


})




const deleteCommentcontroller = asyncWrapper(async(req,res)=>{
    const userId = req.user._id;
    const commentId = req.params.commentId;
   
    /** first check postId or commentId valid or not */
    const isValidCommentId = await commentModel.findById(commentId);

    if (!isValidCommentId) {
    throw new AppError("Comment not found", 404);
    }


    /** unthorized acces loggedin user sirf apna comment ko delete kar payega */
 if(!(isValidCommentId.user.toString()===userId.toString())){
    throw new AppError("unthorized access",403)
 }

 /** delete the comment */
const deletedComment = await commentModel.findByIdAndDelete(commentId);
return res.status(200).json({
    success:true,
    message:"user delete the comment successfully",
    data:deletedComment,
    statusCode:200
})
      
})





const getAllCommentsController = asyncWrapper(async(req,res)=>{
  const postId = req.params.postId;
  const verifyPostId = await postModel.findById(postId);
  if(!verifyPostId){
    throw new AppError("post is not found" , 404);
  };

  const fetchedComment = await commentModel.find({post:postId}).populate([
    
    {
      path:"user",
      select:"username fullname email profilePhoto"
    }
  ]);
  return res.status(200).json({
    success:true,
    message:"fetch all comment successfully",
    data:fetchedComment,
    statusCode:200
  })

})



module.exports = {commentPostController ,deleteCommentcontroller , getAllCommentsController}