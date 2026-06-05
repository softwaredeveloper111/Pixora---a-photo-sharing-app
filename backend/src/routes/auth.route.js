const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const {registerUserValidation ,loginUserValidation} = require("../validations/auth.validator")

const {registerUserController , loginUserController, getMeUserController ,logoutUserController} = require('../controllers/auth.controller')


const authRouter = express.Router();




/**
 * @description   register a new user
 * @method        POST 
 * @access        Public
 * @route        /api/auth/register
 * 
 * @param        {String} req.body.fullname
 * @param        {String} req.body.username,
 * @param        {String} req.body.email,
 * @param        {String} req.body.password,
 * 
 * @returns      {Object} 201 successfully register user
 * @returns      {Object} 409 Conflict if already email or username exist
 * @returns      {Object} 400 bad request validation error
 * 
 * @throws       {Object} 500 Internal server error 
 */

authRouter.post("/register" ,registerUserValidation ,registerUserController  )



/**
 * @description     logged in a user
 * @methodd        POST
 * @access          Public
 * @route          /api/auth/login
 * 
 * @param        {String} req.body.identifiers
 * @param        {String} req.body.password
 * 
 * @returns      {Object} 200 successfully login user
 * @returns      {Object} 404 user not found
 * @returns      {Object} 401 invalid credentials -wrong password
 * @returns      {Object} 400 validation error
 * 
 * @throws       {Object} 500 Internal server error 
 */

authRouter.post("/login", loginUserValidation ,loginUserController)




/**
 * @description    logged out a user
 * @methodd         POST
 * @access          Private
 * @route          /api/auth/logout
 * 
 * @returns      {Object} 200 successfully logged out user
 * @returns      {Object} 401 unauthorized -user not logged in
 * 
 * @throws       {Object} 500 Internal server error 
 */

authRouter.post("/logout", identifyingUser  ,logoutUserController)






/**
 * @description     get me user profile
 * @method        GET
 * @access        Private
 * @route        /api/auth/me
 * 
 * @returns      {Object} 200 successfully get user profile
 * @returns      {Object} 401 unauthorized access -user not logged in
 * @returns      {Object} 404 user not found
 * 
 * @throws       {Object} 500 Internal server error 
 */

authRouter.get("/me", identifyingUser , getMeUserController)





module.exports = authRouter;