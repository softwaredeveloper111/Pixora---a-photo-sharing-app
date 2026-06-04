const notificationModel = require("../models/notification.model");
const asyncWrapper = require("../middlewares/asyncWrapper.middleware");
const AppError = require("../utils/AppError");



const getYouAllNotifications = asyncWrapper(async(req,res)=>{
const notifications = notificationModel.find({ recipient: req.user._id })
  .populate("sender", "username profilePhoto")
  .populate("post", "image")
  .sort({ createdAt: -1 });
  
  return res.status()

})



const markAsReadNotificatioNController  = asyncWrapper(async(req,res)=>{
  const notificationId = req.params.notificationId
  const result =  notificationModel.findByIdAndUpdate(notificationId, { read: true })
  return res.status(200).json({
    success:true,
    message:"mark as read successfully",
    statusCode:200,
    data:result
  })
})



module.exports = {getYouAllNotifications , markAsReadNotificatioNController }