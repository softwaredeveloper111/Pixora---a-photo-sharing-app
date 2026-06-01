const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");
const validateObjectId = require("../utils/AppError")


const messageRouter = express.Router();




/**
 * @description     send message to the this userId
 * @route           /api/messages/:userId
 * @access          Private
 * @method          POST 
 * 
 * @params          {objectId} req.params.userId;
 * 
 * @returns         201 sucessfully send a message to this user is
 * @returns         400 validation error
 * 
 * @throws          500 Internal server error
 */








module.exports = messageRouter;