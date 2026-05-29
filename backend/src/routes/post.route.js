const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const handleFileMulter = require("../middlewares/multer.middleware")

const checkObjectId = require("../validations/ObjectId.validator")
const {postCreateValidation} = require("../validations/post.validator")

const {createPostController}  =require("../controllers/post.controller")


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

















module.exports = postRouter;