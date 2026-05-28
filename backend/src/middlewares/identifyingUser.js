const jwt = require("jsonwebtoken");
const AppError = require('../utils/AppError');
const config = require('../config/config')
const userModel = require("../models/user.model")
const asyncWrapper = require("./asyncWrapper")



const identifyingUser = asyncWrapper(async (req, res, next) => {
  
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError("Unauthorized access", 401);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

  const getUser = await userModel.findById(decoded.id);

  if (!getUser) {
    throw new AppError("Invalid credentials", 401);
  }

  req.user = getUser;

  next();
});

module.exports =identifyingUser;

