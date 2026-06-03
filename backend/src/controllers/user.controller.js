const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const postModel = require("../models/post.model")
const asyncWrapper = require("../middlewares/asyncWrapper.middleware")
const AppError = require("../utils/AppError")






const getProfileController = asyncWrapper(async(req,res)=>{

    const otheruserId = req.params.userId
    const currentUserId = req.user._id
    
    if(otheruserId.toString()=== currentUserId.toString()){
        throw new AppError("Use /api/auth/me for your own profile", 400)
    }

    const isValidUser = await userModel.findById(otheruserId);
    if(!isValidUser) {
         throw new AppError("user not found", 404)
    }
   
    /** find followers list, followngList , userpost's  this user */
    const  [followerCounts , followingCount ,  findAllUserPost  ] = await Promise.all([
            followModel.countDocuments({following:otheruserId ,status:"accept"}) ,
            followModel.countDocuments({follower:otheruserId , status:"accept"}) ,
             postModel.find({user: otheruserId})

    ])
  
   

    
    return res.status(200).json({
        success:true,
        message:"another user profile  fetch successfully",
        statusCode:200,
        data:{
            user:isValidUser,
            follower:followerCounts,
            following:followingCount,
            posts:findAllUserPost
        },
    })

})





const userProfileUpdateController = asyncWrapper(async(req,res)=>{
    const loggedinUser = req.user._id;
    console.log(req.file);
    console.log(req.body);
    
})



module.exports = {getProfileController ,userProfileUpdateController}