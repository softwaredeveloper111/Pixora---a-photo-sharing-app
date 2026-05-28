const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const checkObjectId = require("../validations/ObjectId.validator")
const {followStatusValidation}  = require("../validations/follow.validator")
const {sendFollowRequestController , modifiedFollowRequestController , getAllPendingRequest} = require("../controllers/follow.controller")



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
followRouter.post("/send/:id" , checkObjectId ,    identifyingUser , sendFollowRequestController  )




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

followRouter.patch("/respond/:id" , checkObjectId , followStatusValidation ,  identifyingUser , modifiedFollowRequestController)


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







module.exports = followRouter;











// POST   /api/follow/send/:userId        // follow request bhejo
// POST   /api/follow/accept/:requestId   // accept karo
// POST   /api/follow/reject/:requestId   // reject karo
// DELETE /api/follow/remove/:userId      // unfollow karo
// GET    /api/follow/requests            // apni pending requests dekho
// GET    /api/follow/followers/:userId   // kisi ki followers list
// GET    /api/follow/following/:userId   // kisi ki following list