const userModel = require("../models/user.model");
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const config = require("../config/config")



const registerUserController = asyncWrapper(async(req,res)=>{
  
  const {fullname, username, email, password} = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  });

  if(isUserAlreadyRegistered){
    throw new AppError("User is already registered", 409);
  }

  const createdNewUser = await userModel.create({
    fullname,
    username,
    email,
    password,
  });

  const token = jwt.sign({id:createdNewUser._id}, config.JWT_SECRET_KEY, {expiresIn:"1d"});
  res.cookie("token",token, {httpOnly:true, secure:true,sameSite:"strict", maxAge:24*60*60*1000})

  res.status(201).json({
    success:true,
    message:"user registered successfully",
    statusCode:201,
    data:createdNewUser
  })
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
  throw new AppError("user not found" , 404);
}

const matchPassword = await registerUser.comparePassword(password);
if(!matchPassword){
  throw new AppError("invalid credentials",401)
}

const token = jwt.sign({id:registerUser._id} , config.JWT_SECRET_KEY , {expiresIn:"1d"});
res.cookie("token",token, {httpOnly:true, secure:true,sameSite:"strict", maxAge:24*60*60*1000});

return res.status(200).json({
  success:true,
  statusCode:200,
  message:"user logged in successfully",
  data:registerUser
})

})




const getMeUserController = asyncWrapper(async(req,res)=>{

  const user = req.user;
  return res.status(200).json({
    success:true,
    message:"user get successfully",
    statusCode:200,
    data:user
  }) 

})




const logoutUserController = asyncWrapper(async(req,res)=>{
  res.clearCookie("token");
  return res.status(200).json({
    success:true,
    message:"user logged out successfully",
    statusCode:200,
    data:null
  })
})


module.exports = {registerUserController ,loginUserController , getMeUserController , logoutUserController}
