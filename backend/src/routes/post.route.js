const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const handleFileMulter = require("../middlewares/multer.middleware")

const checkObjectId = require("../validations/ObjectId.validator")
const {postCreateValidation} = require("../validations/post.validator")

const {createPostController ,feedPostController , explorePostController ,singlePostController , deletePostController }  =require("../controllers/post.controller")


const postRouter = express.Router();




/**
 * @description   create a new post
 * @route         /api/posts/create 
 * @method       POST 
 * @access        Private
 * 
 * @returns       {Object}   201 successfully create a post
 * @returns       {Object}   400 validation failed
 * 
 * @throws        {Object}   500 internal server error
 *  
 */

postRouter.post("/create" , identifyingUser ,  handleFileMulter , postCreateValidation ,  createPostController )






/**
 * @description     home feed - followed users ki posts
 * @route          /api/posts/feed             
 * @method         GET
 * @access          Private
 * 
 * @returns      {Object}  {200} successfully see the feed
 * 
 * 
 * @throws        {Object}  500 Internal server Error
 */

postRouter.get('/feed' , identifyingUser , feedPostController)





/**
 * @description   explore all public posts except following user posts [all public posts except following user]
 * @route          /api/posts/explore             
 * @method          GET
 * @access         Private
 * 
 * @returns      {Object}  {200} successfully see the explore feed
 * 
 * 
 * @throws        {Object}  500 Internal server Error
 */

postRouter.get('/explore' , identifyingUser , explorePostController)






/**
 * @description    single post fetch
 * @route         /api/posts/:id
 * @method        GET
 * @access         Private
 * 
 * @param           {ObjectId} req.params.id   {postId}
 * 
 * @returns       {Object}  {200} successfully see the post
 * @returns       {Object}  {400} validation failed error
 * 
 * @returns       {Object}  {500} Internal sever error  
 * 
 */

postRouter.get('/:id' , identifyingUser , checkObjectId , singlePostController)








/**
 * @description     user can delete their own post
 * @route           /api/posts/:id
 * @method           DELETE  
 * @access           Private
 * 
 * @param           {ObjectId} req.params.id   {postId}
 * 
 * @returns         {Object}  200 sucessfully deleted the post
 * @returns         {Object}  400  validation faliled
 * 
 * @returns         {Object}  500 Internal server error
 */
postRouter.delete('/:id' , identifyingUser , checkObjectId , deletePostController)














module.exports = postRouter;