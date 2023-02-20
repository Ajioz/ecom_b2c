import dotenv from 'dotenv'
dotenv.config();
import asyncHandler from 'express-async-handler';
import Subscriber from '../models/subscriberModel.js';
import nodemailer from 'nodemailer';
import { genReceipt } from './genReceiptController.js'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user:  process.env.EMAIL,
    pass:  process.env.PASSWORD,
    clientId:  process.env.OAUTH_CLIENTID,
    clientSecret:  process.env.OAUTH_CLIENT_SECRET,
    refreshToken:  process.env.OAUTH_REFRESH_TOKEN
  }
});


//Send Single Mail mail method
const sendEmail = (subject, email, message, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text: message
    };
    transporter.sendMail(mailOptions , cb);
}

// Send Single Email controller
export const  sendSingleEmail = asyncHandler(async(req, res) => {
    const { email, subject, message } = req.body;
    try {
        sendEmail(subject, email, message, (err, data) => {
            if(err){
                return res.status(500).json({err, message: 'Internal Error'});
            }else{
               return res.status(200).json({data, Message: 'Email Sent!!!'});
            }
         });
    } catch (error) {
        console.error(error, "failed");
        return res.status(400).json({Message: "We couldn't process your request"})
    }
    
})


//Send Multiple Mail method
const sendMultiMail = (subject, emailList, message, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL,
        to: emailList,
        subject,
        text: message
    };
    transporter.sendMail(mailOptions , cb);
}

// Extract Emails from db to create a list
const mailList = (subscribers) => {
    let mailList =[];
    let email;
    subscribers.map((subscriber, index) => {
        for(let emails in subscriber){
            email =  subscriber['email'];
        }
        mailList.push(email)        
    })
    return mailList;
}

//   Send Multiple Emails controller
export const  sendEmails = asyncHandler(async(req, res) => {
    const { subject, message } = req.body;
    try {
        const findSubscribers = await Subscriber.find({ });
        let emailList = mailList(findSubscribers);
        sendMultiMail(subject, emailList, message, (err, data) => {
            if(err){
                return res.status(500).json({err, message: 'Internal Error'});
            }else{
               return res.status(200).json({data, Message: 'Email Sent!!!'});
            }
         });
    } catch (error) {
        console.error(error);
        return res.status(400).json({err: "We couldn't process your request"})
    }
});

// Send Order Summary

//Send Single Mail mail method
const sendOrder = (subject, email, emailBody, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL,
        to: ["sandiewhyte5@gmail.com", email],
        subject,
        html: emailBody
    };
    transporter.sendMail(mailOptions , cb);
}

// Send Single Email controller
export const  sendOrderSummary  = asyncHandler(async(req, res) => {
    const {  email, subject, user, name, Address, city, postalCode,country, } = req.body;
    const { emailBody } = genReceipt(name, Address, city, postalCode,country, user);
    try {
        sendOrder(subject, email, emailBody, (err, data) => {
            if(err){
                return res.status(500).json({err, message: 'Internal Error'});
            }else{
               return res.status(200).json({data, Message: 'Email Sent!!!'});
            }
         });
    } catch (error) {
        console.error(error, "failed");
        return res.status(400).json({Message: "We couldn't process your request"})
    }
})