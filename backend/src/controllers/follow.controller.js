const followModel = require("../models/follow.model");
const userModel = require("../models/user.model")
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const AppError = require("../utils/AppError");

const config = require("../config/config");





const sendFollowRequestController = asyncWrapper(async(req,res)=>{
const followerUserId = req.user._id;
const followingUserId = req.params.userId;

if(followerUserId.toString() === followingUserId.toString()){
throw new AppError("invalid input , you cannot follow useself",400)
}

const checkFollowingUserId = await userModel.findById(followingUserId);
if(!checkFollowingUserId){
    throw new AppError("user not found , invalid user",404)
}

/** cancel the follow request - delete the document , if already followed with status:pending  */
 const cancelledRequest = await followModel.findOneAndDelete({following:followingUserId , follower:followerUserId, status:"pending"},{new:true}).populate('following', 'fullname username email profilePhoto coverPhoto')
    if(cancelledRequest){
    return res.status(200).json({
        success:true,
        message:"follow request cancelled successfully ",
        statusCode:200,
        data:cancelledRequest 
    })
}  


/** unfollow the person - delete the document , if already both are friend with each other with status:accept */
const unfollowedUser = await followModel.findOneAndDelete({following:followingUserId , follower:followerUserId, status:"accept"},{new:true}).populate('following', 'fullname username email profilePhoto coverPhoto')
if(unfollowedUser){
    return res.status(200).json({
        success:true,
        message:"Unfollowed successfully ",
        statusCode:200,
        data:unfollowedUser
    })
}

/** sending the follow request */
const sendFollowRequest = await followModel.create({ following:followingUserId , follower:followerUserId})
const populateSendFollowRequest = await sendFollowRequest.populate('following', 'fullname username email profilePhoto coverPhoto')

return res.status(201).json({
    success:true,
    message:"follow request sent successfully",
    statusCode:201,
    data:populateSendFollowRequest
})
})











const modifiedFollowRequestController = asyncWrapper(async(req,res)=>{
    const userId = req.user._id;
    const requestId = req.params.requestId;
    const status = req.body?.status;
    
    const check = await followModel.findById(requestId)
    if(!check){
        throw new AppError("request not found" , 404)
    }

     
    if(check.following.toString() !== userId.toString()){
        throw new AppError("unthorized access",403)
    }


    if(!(check.status==="pending")){
        throw new AppError("already modifed status",400);
    }


    
  
    if(status==="accept"){
        const updatedStatus = await followModel.findByIdAndUpdate(requestId , {status},{new:true}).populate("follower","fullname username email profilePhoto coverPhoto")
        return res.status(200).json({
            success:true,
            message:"user accept  request successfully",
            statusCode:200,
            data:updatedStatus
        })
    }

    if(status==="reject"){
        const deleteDocument = await followModel.findByIdAndDelete(requestId).populate("follower" , "fullname username email profilePhoto coverPhoto");
        return res.status(200).json({
            success:true,
            message:"user reject request",
            statusCode:200,
            data:deleteDocument
        })
    }
   
})












const getAllPendingRequest = asyncWrapper(async(req,res)=>{
    const userId =req.user._id

    const findRequests = await followModel.find({ following : userId ,status:"pending"}).populate("follower","fullname username email profilePhoto coverPhoto");

    return res.status(200).json({
        success:true,
        message:"get all pending request successfully",
        statusCode:200,
        data:findRequests 
    })
})













const getFollowerListController = asyncWrapper(async(req,res)=>{
    const userId = req.params.userId;
    const isValidUserId = await userModel.findById(userId);
    
    if(!isValidUserId){
        throw new AppError("user not found",404)
    }

    const findFollowings = await followModel.find({following:userId,status:"accept"}).populate("follower","fullname username email profilePhoto coverPhoto");
    res.status(200).json({
        succes:true,
        message:"followers users fetch succesfullly",
        data:findFollowings,
        statusCode:200
    })
})











const getFollowingListController = asyncWrapper(async(req,res)=>{
    const userId = req.params.userId;
    const isValidUserId = await userModel.findById(userId);
    
    if(!isValidUserId){
        throw new AppError("user not found",404)
    }
    
    const findFollowers = await followModel.find({follower:userId,status:"accept"}).populate("following","fullname username email profilePhoto coverPhoto");
    res.status(200).json({
        succes:true,
        message:"following user fetch succesfullly",
        data:findFollowers,
        statusCode:200
    })
})









module.exports = {sendFollowRequestController ,modifiedFollowRequestController , getAllPendingRequest , getFollowerListController , getFollowingListController }

