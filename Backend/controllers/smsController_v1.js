import dotenv from 'dotenv'
dotenv.config();

import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';


export const sendSms = asyncHandler(async(req, res) => {
  const { number } = req.body;

  const requestBody = {
    messages: [
      {
        from: 'InfoSMS',
        destinations: [ { to: number }, ],
        text: `Your order has been processed successfully. 
        Please check your email for order detail. 
        Thanks for patronage!`,
      },
    ],
  };

  const fetchOptions = {
    method: 'post',
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: `App ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const URL = process.env.BASE_URL;

  fetch(URL, fetchOptions)
    .then((response) => response.json())
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).json({ message: "We couldn't process your request!" });
    });
});
