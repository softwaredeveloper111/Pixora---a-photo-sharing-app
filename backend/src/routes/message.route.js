const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");

const validateObjectId = require("../validations/ObjectId.validator")
const {sendMessageValidation} = require("../validations/message.validator")

const {sendMessageController ,  getConversationController , getAllConversationsListController} = require("../controllers/message.controller")





const messageRouter = express.Router();




/**
 * @description     send message to the this userId
 * @route           /api/messages/:userId
 * @access          Private
 * @method          POST 
 * 
 * @params          {objectId} req.params.userId;
 * 
 * @returns         {Object} 201 sucessfully send a message to this user is
 * @returns         {Object} 400 validation error
 * 
 * @throws          {Object} 500 Internal server error
 */

messageRouter.post("/:userId" , identifyingUser , validateObjectId("userId") , sendMessageValidation , sendMessageController )





/**
 * @description     Get conversation history with a specific user
 * @route           /api/messages/:userId
 * @access          Private
 * @method          GET 
 * 
 * @params          {objectId} req.params.userId;
 * 
 * @returns         {Object} 200 sucessfull 
 * @returns         {Object} 400 validation error
 * 
 * @throws          {Object} 500 Internal server error
 */

messageRouter.get("/:userId" , identifyingUser , validateObjectId("userId") ,  getConversationController )




/**
 * @description     Get conversation list
 * @route           /api/messages
 * @access          Private
 * @method          GET 
 * 
 * 
 * @returns         {Object} 200 sucessfully 
 * 
 * @throws          {Object} 500 Internal server error
 */

messageRouter.get("/" , identifyingUser ,  getAllConversationsListController )









module.exports = messageRouter;