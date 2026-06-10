const jwt = require("jsonwebtoken");
const AppError = require('../utils/ApiError');
const config = require('../config/config')
const userModel = require("../models/user.model")
const redis = require("../config/redis")



const identifyingUser = async (req, res, next) => {
  
 try {

   const token = req.cookies?.token;

  if (!token) {
    throw new AppError("token not found", 401);
  }

  const isBlackListTOken = await redis.get(token);

  if(isBlackListTOken){
    throw new AppError("invalid token", 401)
  }

  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

  const getUser = await userModel.findById(decoded.id);

  if (!getUser) {
    throw new AppError("invalid credentials", 401);
  }

  req.user = getUser;

  next();
  
 } catch (error) {

    throw new AppError("invalid token" , 401)
 }

};





module.exports =identifyingUser;

