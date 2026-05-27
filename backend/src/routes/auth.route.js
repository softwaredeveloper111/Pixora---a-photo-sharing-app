const express = require("express");
const {registerUserController} = require('../controllers/auth.controller')
const {registerUserValidation} = require("../validations/auth.validator")

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

authRouter.post("/api/auth" ,registerUserValidation ,registerUserController  )







module.exports = authRouter;