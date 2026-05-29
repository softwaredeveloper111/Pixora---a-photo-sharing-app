const jwt = require("jsonwebtoken");
const AppError = require('../utils/AppError');
const config = require('../config/config')
const userModel = require("../models/user.model")




const identifyingUser = async (req, res, next) => {
  
 try {

   const token = req.cookies?.token;

  if (!token) {
    throw new AppError("Unauthorized access | token not found", 401);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

  const getUser = await userModel.findById(decoded.id);

  if (!getUser) {
    throw new AppError("Invalid credentials", 401);
  }

  req.user = getUser;

  next();
  
 } catch (error) {

    throw new AppError("unthorized access | invalid token" , 401)
 }

};



module.exports =identifyingUser;

