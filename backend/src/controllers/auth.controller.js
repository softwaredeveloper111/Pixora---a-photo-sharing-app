const userModel = require("../models/user.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
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
    status:"success",
    message:"user registered successfully ",
    statusCode:201,
    data:createdNewUser
  })
})


module.exports = {registerUserController}
