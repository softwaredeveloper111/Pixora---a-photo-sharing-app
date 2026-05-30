const express = require("express");
const  identifyLoggedInUser  = require("../middlewares/auth.middleware");
const  checkObjectId = require("../validations/ObjectId.validator");
const { toggleLikeController ,getAllLikedUser} = require("../controllers/like.controller")



const likeRouter = express.Router();





/**
 *  @dsescription      Toggle like on a post
 *  @route            /api/posts/like/:id
 *  @access           Private
 *  @method           POST
 * 
 *  @param       {ObjectId}    req.params.id      {postId}
 *  
 * 
 *  @returns      {Object}    201 successfully liked message
 *  @returns      {Object}    200 successfully unliked message
 *  @returns      {Object}    400 validation failed
 * 
 * @throw        {Objct}    500 Internal server error
 */

likeRouter.post("/:id" , identifyLoggedInUser , checkObjectId , toggleLikeController )







/**
 * @description     see all users list jo jo post ko like kiya
 * @route           /api/posts/like/:id
 * @method          GET 
 * @access          Private
 * 
 * @param          {ObjectId} req.param.id 
 * 
 * @returns        {Object} 200 successfully get all user's list
 * @returns        {Object} 400 validation failed
 * 
 * @throws          {Object} 500 Interval server error
 */

likeRouter.get("/:id" ,  identifyLoggedInUser ,  checkObjectId , getAllLikedUser)






module.exports = likeRouter;