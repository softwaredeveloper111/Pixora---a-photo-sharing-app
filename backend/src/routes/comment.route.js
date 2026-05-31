const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");
const validateObjectId = require("../validations/ObjectId.validator")
const {commentValidation} = require("../validations/comment.validator")

const {commentPostController , deleteCommentcontroller , getAllCommentsController} = require("../controllers/comment.controller")


const commentRouter  = express.Router();



/**
 * @description   comment karo on a post
 * @access        Private
 * @route         /api/posts/comment/:id
 * @method        POST
 * 
 * @param         {Objectid} req.parmas.id  [postId];
 * 
 * @returns       {Object}  201 succesully create a comment;
 * @returns       {Object}  400 validation error
 * 
 * @throws        {object} 500 Internal server error
 */

commentRouter.post("/:id", identifyingUser , validateObjectId("id") , commentValidation , commentPostController)


/**
 * @description   delete you comment
 * @access        Private
 * @route         /api/posts/comment/:commentId 
 * @method        DELETE 
 * 
 * @params        {commentId} req.params.commentId;
 * 
 * @returns       {Object} 200 successfully delete the comment
 * @returns       {Object} validation error
 * 
 * @throws        {Object} 500 Internal server error

*/

commentRouter.delete("/:commentId" , identifyingUser , validateObjectId("commentId") , deleteCommentcontroller )



/**
 * @description    post ke saare comment fetch karo
 * @route         /api/posts/comment/:postId
 * @method        GET 
 * @access         Private
 * 
 * @param        {ObjectId} req.params.postId
 * 
 * @returns      {Object} 200 successfully fetch all the commnet
 * @returns      {Object} 400 validation failed
 * 
 * @throws       {Object} 500 Internal server error
 */
commentRouter.get("/:postId", identifyingUser , validateObjectId("postId") , getAllCommentsController)




module.exports = commentRouter;