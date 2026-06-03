const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");
const  validateObjectId = require("../validations/ObjectId.validator")
const {multerUserProfileHandler} = require("../middlewares/multer.middleware")
const {getProfileController , ProfileUpdateController} = require("../controllers/user.controller")





const userRouter = express.Router();



/**
 * @description  Jab tum kisi ka username pe click karte ho — uska profile page open hota hai. Wahan uska naam, bio, profile photo, followers/following count aur posts grid dikhta hai. Yeh route woh sab data return karta hai.
 * @method     GET 
 * @route     /api/users/:userId
 * @access    Private
 * 
 * @param      {ObjectId} req.params.userId;
 * 
 * @returns    {Object} 200 Success
 * @returns    {Object} 401 Invalid token
 * @returns    {Object} 404 User Not Found 
 * @returns    {Object} 400 validation failed
 * 
 *
 * @throws     {Object} Internal server error 
 * 
 */

userRouter.get("/:userId" , identifyingUser ,   validateObjectId("userId") , getProfileController )





/**
 * @description    loggedin user can update her/him profile only
 * @method        PUT 
 * @route         /api/users/profile
 * @access         Private
 * 
 * @param         {String} req.body.fullname
 * @param         {String} req.body.bio
 * @param         {file} req.file.profilePhoto 
 * @param         {file} req.file.coverPhoto
 * 
 * @returns       {Object} successfully update the user profile.
 * @returns       {Object} validation failed
 * @return        {Object} unthorized access
 * 
 * @throws        {Object} 500 Internal server error.
 */

userRouter.put("/profile", identifyingUser ,  multerUserProfileHandler  , ProfileUpdateController )









module.exports =  userRouter
