import dotenv from 'dotenv'
dotenv.config();
import asyncHandler from 'express-async-handler';
import webpush from 'web-push';
import Sub from '../models/pushModel.js';

webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT, 
  process.env.PUBLIC_VAPID_KEY, 
  process.env.PRIVATE_VAPID_KEY
)

// REGISTER A PUSH NOTIFICATION CLIENT
export const registerPushNotify = asyncHandler(async(req, res) => {
    const {endpoint, expirationTime, keys} = req.body;
    try {
        let findSub = await Sub.find({});
        if(findSub){
          let pushList = findSub.find(subscriber => subscriber.keys.auth === keys.auth);
          if(pushList) return res.status(409).json({status:"Device Already subscribed"});
        }
        Sub.create({ endpoint, expirationTime, keys });
        return res.status(201).json({status: true, msg: "Data Added to notification subscribers"});
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"});
    }
});


// SEND A PUSH NOTIFICATION TO CLIENTS
export const sendPushNotification = asyncHandler(async(req, res) => {
    const { title, body } = req.body;
    let findSub = await Sub.find({});
    try {
      let url = 'https://hubsandy.netlify.app/'
      let vibrate = [24 * 60 * 60];
      const payload = JSON.stringify({ title, body, url, vibrate });
      findSub.map((push) => {
        return (
          webpush.sendNotification(push, payload)
          .then(result => console.log( {status: true } ))
          .catch(e => console.log(e.stack))
        )
      });
      return res.status(200).json({msg: "Notification sent successfully", status:true});
    } catch (error) {
      console.log(error)
      return res.status(404).json({msg: "Failed to notify subscribers", status:false});
    }
});