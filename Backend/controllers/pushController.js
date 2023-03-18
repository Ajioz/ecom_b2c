import dotenv from 'dotenv'
dotenv.config();
import asyncHandler from 'express-async-handler';
const fs = require("fs");
const webpush = require('web-push');
const sub = require('./db.json'); 

webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT, 
  process.env.PUBLIC_VAPID_KEY, 
  process.env.PRIVATE_VAPID_KEY
)

// REGISTER A PUSH NOTIFICATION CLIENT
export const registerPushNotify = asyncHandler(async(req, res) => {
    const subscription = req.body;
    try {
        let pushList = sub.find(subscriber => subscriber.keys.auth === subscription.keys.auth);
        if(pushList) return res.status(200).json({status:"Device Already subscribed"});
        fs.writeFile("db.json", JSON.stringify([...sub, subscription]), (err) => {
          if (err) throw err;
          console.log("done writing....");
        });
        return res.json({status: true, msg: "Data Added to Json DB"});
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: "Server Error"});
    }
});


// SEND A PUSH NOTIFICATION TO CLIENTS
export const sendPushNotification = asyncHandler(async(req, res) => {
    const { title, body } = req.body;
    try {
      let data = 'http://localhost:3000/'
      let vibrate = [24 * 60 * 60];
      const payload = JSON.stringify({ title, body, data, vibrate });
      sub.map((push) => {
        return (
          webpush.sendNotification(push, payload)
          .then(result => console.log( {status: true } ))
          .catch(e => console.log(e.stack))
        )
      });
      return res.status(200).json({'success': true});
    } catch (error) {
      console.log(error)
      return res.status(404).json({message: "Server Error"});
    }
});