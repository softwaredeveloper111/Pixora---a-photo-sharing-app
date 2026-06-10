const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const postModel = require("../models/post.model")

const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require('../utils/ApiError');
const ApiResponse = require("../utils/ApiResponse");
const jwt = require('jsonwebtoken')
const config = require("../config/config");


const redis = require("../config/redis")



const registerUserController = asyncWrapper(async(req,res)=>{
  
  const {fullname, username, email, password} = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  });

  if(isUserAlreadyRegistered){
    throw new ApiError("User is already registered", 409);
  }

  const createdNewUser = await userModel.create({
    fullname,
    username,
    email,
    password,
  });

  const token = jwt.sign({id:createdNewUser._id}, config.JWT_SECRET_KEY, {expiresIn:"1d"});
  res.cookie("token",token, {httpOnly:true, secure:true,sameSite:"strict", maxAge:24*60*60*1000})
  

  return  res.status(201).json(new ApiResponse(201,createdNewUser,"user registered successfully"))
})




const loginUserController = asyncWrapper(async(req,res)=>{
const {identifiers, password} = req.body;
 
const registerUser = await userModel.findOne({
  $or:[
    {username:identifiers},
    {email:identifiers},
  ]
}).select("+password");

if(!registerUser){
  throw new ApiError("invalid credential" , 401);
}

const matchPassword = await registerUser.comparePassword(password);
if(!matchPassword){
  throw new ApiError("invalid credentials",401)
}

const token = jwt.sign({id:registerUser._id} , config.JWT_SECRET_KEY , {expiresIn:"1d"});
res.cookie("token",token, {httpOnly:true, secure:true,sameSite:"strict", maxAge:24*60*60*1000});

return res.status(200).json(new ApiResponse(200,registerUser,"user logged in successfully"))

})




const getMeUserController = asyncWrapper(async(req,res)=>{

  const user = req.user.toObject();
 
  const followers = await followModel.countDocuments({following:user._id,status:"accept"});
  const following = await followModel.countDocuments({follower:user._id,status:"accept"});
  const posts = await postModel.countDocuments({user:user._id});
  
  user.followers = followers;
  user.following = following;
  user.posts = posts;


  return res.status(200).json(new ApiResponse(200,user,"user get successfully")) 

})




const logoutUserController = asyncWrapper(async(req,res)=>{
  const token = req.cookies?.token;
  if(token){
    await redis.set(token , Date.now().toString() , "EX" , 60*60*24);
  }
  res.clearCookie("token" ,{
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json(new ApiResponse(200,null,"user logged out successfully"))
})





module.exports = {registerUserController ,loginUserController , getMeUserController , logoutUserController}
