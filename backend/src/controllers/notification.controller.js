const notificationModel = require("../models/notification.model");

const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require('../utils/ApiError');
const ApiResponse = require("../utils/ApiResponse");


const getYouAllNotifications = asyncWrapper(async(req,res)=>{
const notifications = await notificationModel.find({ recipient: req.user._id })
  .populate("sender", "username profilePhoto")
  .populate("post", "image")
  .sort({ createdAt: -1 });
  
  return res.status(200).json({
    success:true,
    message:"all notification get seccessfully",
    statusCode:200,
    data:notifications
  })

})



const markAsReadNotificatioNController  = asyncWrapper(async(req,res)=>{
  const notificationId = req.params.notificationId;
  
  const verifyNotification = await notificationModel.findById(notificationId);
   
  if(!verifyNotification){
    throw new AppError("notification not found",404)
  }
  
  if(verifyNotification.recipient.toString() !== req.user._id.toString()){
    throw new AppError("you are not authorized to access this notification",403)
  } 

  const result = await notificationModel.findByIdAndUpdate(notificationId, { read: true })
  return res.status(200).json({
    success:true,
    message:"mark as read successfully",
    statusCode:200,
    data:result
  })
})



module.exports = {getYouAllNotifications , markAsReadNotificatioNController }