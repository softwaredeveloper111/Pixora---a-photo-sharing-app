const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");
const ObjecIdValidation = require("../validations/ObjectId.validator")

const {savedToggleController , getSavedPostsController} = require("../controllers/saved.controller")


const savedRouter = express.Router();





/**
 * @description       see all the saved post collection
 * @route            /api/posts/saved
 * @method           GET
 * @access           Private
 * 
 * @returns          {Object} 200 all the saved post successfully fetched 
 * 
 * @throws           {Object} internal server error
 */

savedRouter.get("/get", identifyingUser , getSavedPostsController)





/**
 * @description    save ya unsave toggle
 * @method         POST
 * @access         Private
 * @route         /api/posts/saved/:id
 * 
 * @params         {ObjectId} req.params.id  postId - mongo db object id of the post
 * 
 * @returns        {Object}  201 user sucesssfully saved the post
 * @returns        {Object}  200 user sucessfully remove saved post 
 * @returns        {Object}  400 validation failed
 * 
 * @throws         {Object}  Internal server error
 */

savedRouter.post('/:id' , identifyingUser , ObjecIdValidation , savedToggleController )








module.exports = savedRouter