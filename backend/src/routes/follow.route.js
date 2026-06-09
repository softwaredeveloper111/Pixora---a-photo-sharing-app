const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const checkObjectId = require("../validations/ObjectId.validator")
const {followStatusValidation}  = require("../validations/follow.validator")
const {sendFollowRequestController , modifiedFollowRequestController , getAllPendingRequest ,getFollowerListController , getFollowingListController } = require("../controllers/follow.controller")



const followRouter = express.Router();



/** 
 * @description     follow request vejo
 * @method         POST
 * @route         /api/follow/send/:userId
 * @access         Private
 * 
 * @param        {ObjectId} req.param.id  (userId)
 * 
 * @returns       {Object} 201 sucessfully send the follow request
 * @returns       {Object} 400 validation error
 * @returns       {Ojbect} 404 user not found
 * 
 * @throws        500 internal server error
*/
followRouter.post("/send/:userId" , checkObjectId("userId") ,    identifyingUser , sendFollowRequestController  )








/**
 * @description   accept or rejec the request
 * @method         PATCH
 * @route         /api/follow/respond/:id
 * @access         Private
 * 
 * @param        {ObjectId} req.param.id  (requestId)
 * 
 * @returns       {Object} 200 sucessfully accept or reject the request
 * @returns       {Object} 400 validation error
 * @returns       {Ojbect} 404 request is not found
 * 
 * @throws        500 internal server error
 */

followRouter.patch("/respond/:requestId" , checkObjectId("requestId") , followStatusValidation ,  identifyingUser , modifiedFollowRequestController)









/**
 * @description    apne saare pending request ko dekho jis jis ne tumme request veja hai
 * @Route           /api/follow/requests 
 * @method         GET 
 * @access          Private
 * 
 * @returns       {Object} 200 successfully get all the pending request
 * 
 * @throws         {Object} 500 internal server error 
 */
followRouter.get("/requests" ,  identifyingUser , getAllPendingRequest)











/**
 * @description   getting list of followers[member list] of any user
 * @route   /api/follow/followers/:id
 * @access     Public
 * @method      GET
 * 
 * @param     {ObjectId} req.paramd.id   {UserId}
 * 
 * 
 * @return  {Object} 200 getting all the followers of the user
 * @returns  {Object} 400 validation faild
 * @throws  {Object} 500 internal server error
 */

followRouter.get("/followers/:userId", checkObjectId("userId") ,   identifyingUser , getFollowerListController) 











/**
 * @description   getting list of following[member list] of any user
 * @route   /api/follow/followers/:id
 * @access     Public
 * @method      GET
 * 
 * @param     {ObjectId} req.paramd.id   {UserId}
 * 
 * 
 * @return  {Object} 200 getting all the followers of the user
 * @returns  {Object} 400 validation faild
 * @throws  {Object} 500 internal server error
 */

followRouter.get("/following/:userId", checkObjectId("userId") ,   identifyingUser , getFollowingListController ) 













module.exports = followRouter;










