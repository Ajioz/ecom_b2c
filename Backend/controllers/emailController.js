import dotenv from 'dotenv'
dotenv.config();
import asyncHandler from 'express-async-handler';
import Subscriber from '../models/subscriberModel.js';
import nodemailer from 'nodemailer';
import { genReceipt } from './genReceiptController.js'


let config = {
    service : 'gmail',
    auth : {
        user: process.env.EMAIL2,
        pass: process.env.APP_PASSWORD
    }
}
const transporter = nodemailer.createTransport(config);


/*
    01  Send Single Mail mail method
*/
const sendEmail = (subject, email, message, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL2,
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
                console.error({err, msg: 'Internal Error'});
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


/*
    02  Send Multiple Mail method
*/
const sendMultiMail = (subject, emailList, message, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL2,
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


/*
   03  Send Order Summary
   Send Single Mail mail method
*/  

const sendOrder = (subject, email, emailBody, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL2,
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
                console.error({err, msg: 'Internal Error'});
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


/*
    04 Contact form
    Send contact form to mail(s) method
*/
const contact = (name, email, message, isCheckecd, cb) => {
    const mailOptions  = {
        from: process.env.EMAIL2,
        to: isCheckecd ? [process.env.EMAIL2, email] : process.env.EMAIL2,
        subject: name,
        text: message.concat(`\n ${email}`)
    };
    transporter.sendMail(mailOptions , cb);
}

// Send Single Email controller
export const  sendContactEmail = asyncHandler(async(req, res) => {
    const { email, name, message, isChecked } = req.body;
    // console.log(req.body);
    try {
        contact(name, email, message, isChecked, (err, data) => {
            if(err){
                console.error({err, msg: 'Internal Error'});
                return res.status(500).json({err, message: 'Internal Error'});
            }else{
               return res.status(200).json({data, Message: 'Email Sent!!!'});
            }
         });
    } catch (error) {
        console.error(error, "failed...");
        return res.status(400).json({Message: "We couldn't process your request"});
    }
})