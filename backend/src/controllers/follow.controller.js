const followModel = require("../models/follow.model");
const userModel = require("../models/user.model")
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const AppError = require("../utils/AppError");

const config = require("../config/config");





const sendFollowRequestController = asyncWrapper(async(req,res)=>{
const followerUserId = req.user._id;
const followingUserId = req.params.id;

if(followerUserId.toString() === followingUserId.toString()){
throw new AppError("you cannot follow useself",400)
}

const checkFollowingUserId = await userModel.findById(followingUserId);
if(!checkFollowingUserId){
    throw new AppError("user not found",404)
}

/** cancel the follow request - delete the document , if already followed with status:pending  */
const isAlreadyFollowed = await followModel.findOne({ following:followingUserId , follower:followerUserId, status:"pending" });
if(isAlreadyFollowed){
    const deleteFollowedUser = await followModel.findOneAndDelete({following:followingUserId , follower:followerUserId, status:"pending"},{new:true})
    return res.status(200).json({
        success:true,
        message:"cancel the follow request  successfully ",
        statusCode:200,
        data:deleteFollowedUser 
    })
}


/** unfollow the person - delete the document , if already both are friend with status:accept */
const isAlreadyFriend = await followModel.findOne({ following:followingUserId , follower:followerUserId, status:"accept" });
if(isAlreadyFriend){
    const deleteFollowedUser = await followModel.findOneAndDelete({following:followingUserId , follower:followerUserId, status:"accept"},{new:true})
    return res.status(200).json({
        success:true,
        message:"Unfollow the user successfully ",
        statusCode:200,
        data:deleteFollowedUser
    })
}



const sendFollowRequest = await followModel.create({ following:followingUserId , follower:followerUserId})

return res.status(201).json({
    success:true,
    message:"follow request sending successfully",
    statusCode:201,
    data:sendFollowRequest
})

})




const modifiedFollowRequestController = asyncWrapper(async(req,res)=>{
    const userId = req.user._id;
    const requestId = req.params.id;
    const status = req.body?.status;
    
    const check = await followModel.findById(requestId)
    if(!check){
        throw new AppError("request not found" , 401)
    }

   

    if(!(check.status==="pending")){
        throw new AppError("already modifed status",401);
    }


    if(check.following.toString() !== userId.toString()){
        throw new AppError("unthorized access",403)
    }
  
    if(status==="accept"){
        const updatedStatus = await followModel.findByIdAndUpdate(requestId , {status},{new:true})
        return res.status(200).json({
            success:true,
            message:"user accept your request successfully",
            statusCode:200,
            data:updatedStatus
        })
    }

    if(status==="reject"){
        const deleteDocument = await followModel.findByIdAndDelete(requestId);
        return res.status(200).json({
            success:true,
            message:"user reject your request",
            statusCode:200,
            data:deleteDocument
        })
    }
   
})





const getAllPendingRequest = asyncWrapper(async(req,res)=>{
    const userId =req.user._id

    const findRequests = await followModel.find({ following : userId ,status:"pending"});

    return res.status(200).json({
        success:false,
        message:"get all pending requrest successfully",
        statusCode:200,
        data:findRequests 
    })
})




const getFollowerListController = asyncWrapper(async(req,res)=>{
    const userId = req.user._id;
    const findFollowings = await followModel.find({following:userId,status:"accept"});
    res.status(200).json({
        succes:true,
        message:"all following member list get succesfullly",
        data:findFollowings,
        statusCode:200
    })
})



const getFollowingListController = asyncWrapper(async(req,res)=>{
    const userId = req.user._id;
    const findFollowers = await followModel.find({follower:userId,status:"accept"});
    res.status(200).json({
        succes:true,
        message:"all followers get succesfullly",
        data:findFollowers,
        statusCode:200
    })
})




module.exports = {sendFollowRequestController ,modifiedFollowRequestController , getAllPendingRequest , getFollowerListController , getFollowingListController }

