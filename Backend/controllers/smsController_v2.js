import dotenv from 'dotenv'
dotenv.config();
import asyncHandler from 'express-async-handler';
import infobip from 'infobip';


//Initialize the client
const Client = new infobip.Infobip(
    process.env.info_username, 
    process.env.info_password
);
  
//Send an SMS
export const sendSms = asyncHandler(async(req, res) => {
    let { code, phoneNumber } = req.body;
    code = code.split(' ')[1];
    phoneNumber = Number(code + phoneNumber);
    //Set the message
    const message = {
        from: "sandyHub", 
        to : phoneNumber, 
        text: `Your order has been processed successfully. Please check your email for order detail. Thanks for patronage!`,
    };
    try {
        Client.SMS.send(message, (err, response) => {} );
        return res.status(200).json({phoneNumber, message: "Message Sent Successfully!"});
    } catch (error) {
        console.error(error)
        return res.status(200).json({message: "Sorry, we couldn't process your request!"});
    }
});