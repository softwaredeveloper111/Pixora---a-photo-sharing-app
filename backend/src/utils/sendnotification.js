const notificationModel = require("../models/notification.model");
const {getIO} = require("../socket/socket");



/**
 * @description   create a notification and emit it via socket.io
 * @param         {Object} params
 * @param         {String} params.recipientId - Jisse notification milegi
 * @param         {String} params.senderId - Kisne trigger kiya
 * @param         {String} params.type - "like","comment","follow_request", "follow_accepted"
 * @param         {String} params.postId - optinal,like/comment ke liye
 */


const sendNotification = async({recipientId,senderId,type,postId=null})=>{
try {
    /**   dont send notification youself  */
   
    if(recipientId.toString() === senderId.toString()) return; 
    
    
     /** store into DB */
     const notification = await notificationModel.create({
      recipient:recipientId,
      sender:senderId,
      type:type,
      post:postId
     });

     /** populate the sender details */
    await notification.populate({
        path:"sender",
        select:"username profilePhoto"
    })

    if(postId){
        await notification.populate({
            path:"post",
            select:"image"
        })
    }


    /** socket.io se real time emit kar rahe hai */
    const io  = getIO();
     io.to(`user:${recipientId}`).emit("notification:new", {
      _id: notification._id,
      type: notification.type,
      sender: notification.sender,
      post: notification.post,
      read: notification.read,
      createdAt: notification.createdAt,
    });
 


} catch (error) {
    // Notification fail hone se main flow affect na ho
    console.error("Notification error:", error.message);
}
}



module.exports  = sendNotification;