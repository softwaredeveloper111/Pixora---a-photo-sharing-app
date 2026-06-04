const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware");
const { getYouAllNotifications , markAsReadNotificatioNController }  = require("../controllers/notification.controller")
const validateObjectId = require("../validations/ObjectId.validator")


const notificationRouter = express.Router();



/**
 * @description : get all notification of current user
 * @route :      api/notifications
 * @access :     private
 * @method :     GET     
 * 
 * @returns      {Object} 200 successfully fetch all the notifications
 * 
 * @throws      {Object} 500 Internal server error                                                                                           
 */
notificationRouter.get("/" , identifyingUser , getYouAllNotifications )




/** 
 * @description   mark as a read
 * @route        /api/notifications/read/:id
 * @method       POST 
 * @access        PRivate
 * 
 * @returns      {Object} 200 sucessfully update the notification
 * @returns      {Object} 400 validationf failed
 * 
 * @throw        {Object} 500 Internal server errro
 */
notificationRouter.patch('/read/:notificationId' ,identifyingUser , validateObjectId("notificationId") , markAsReadNotificatioNController )





module.exports = notificationRouter