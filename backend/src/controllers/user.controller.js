const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const postModel = require("../models/post.model")
const asyncWrapper = require("../middlewares/asyncWrapper.middleware")
const AppError = require("../utils/AppError")
const uploadToImageKit = require("../config/imageKit")




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




const ProfileUpdateController = asyncWrapper(async(req,res)=>{
    const loggedinUser = req.user._id;
  
    const {fullname,bio} = req.body;
    const {profilePhoto,coverPhoto} = req.files || {};

  


    const [profilePhotoUrl, coverPhotoUrl] = await Promise.all([
  profilePhoto?.[0]
    ? uploadToImageKit(profilePhoto[0].buffer)
    : Promise.resolve(null),

  coverPhoto?.[0]
    ? uploadToImageKit(coverPhoto[0].buffer)
    : Promise.resolve(null),
]);
  
// console.log(profilePhotoUrl?.url)
// console.log(coverPhotoUrl?.url)
// console.log(fullname)
// console.log(bio)

const updateData = {};

if (fullname !== undefined) {
  updateData.fullname = fullname;
}

if (bio !== undefined) {
  updateData.bio = bio;
}

if (profilePhotoUrl?.url) {
  updateData.profilePhoto = profilePhotoUrl.url;
}

if (coverPhotoUrl?.url) {
  updateData.coverPhoto = coverPhotoUrl.url;
}

const updatedUserProfile = await userModel.findByIdAndUpdate(loggedinUser , updateData, {new:true})

return res.status(200).json({
    success:true,
    message:"user profile updated successfully",
    statusCode:200,
    data:updatedUserProfile
})

})









module.exports = {getProfileController ,ProfileUpdateController}