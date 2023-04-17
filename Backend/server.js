import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import { Server } from "socket.io";
const app = express();

//securities
import cors from "cors";    
import helmet  from 'helmet';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

// User defined modules
import ConnectDb from './config/MongoDb.js'
import seedData from './DataSeed.js';
import productRoute from './Routes/ProductRoutes.js';
import userRoute from './Routes/UserRoutes.js';
import orderRoute from './Routes/orderRoutes.js';
import subRoute from './Routes/subRoutes.js';
import emailRoute from './Routes/emailRoute.js';
import smsRoute from './Routes/smsRoute.js';
import pushRoute from './Routes/pushRoutes.js';
import chatUserRoute from './Routes/chatUserRoute.js';
import chatRoute from './Routes/chatRoute.js';


// Fetching Environmental variables
const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5001;


// Middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.set('trust proxy', 1);
app.use(
    rateLimiter({
      windowMs: 10 * 60 * 1000, //10 minutes
      max: 500, //limit each IP to 500 requests per windowMs
  })
);


// API
app.use("/api/", seedData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/subscribers", subRoute);
app.use("/api/send", emailRoute);
app.use("/api/send/sms", smsRoute);
app.use("/api/notifications", pushRoute);
app.use('/api/chat', chatUserRoute);
app.use('/api/chat/messages', chatRoute);


// Query Paypal
app.get("/api/config/paypal", (req, res) => {
    return res.send(process.env.PAYPAL_CLIENT_ID);
})


const start = async () => {
    try {
        await ConnectDb(url);
        const server =  app.listen(port, () => console.log(`Server running on port https://localhost:${port}/api`))
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
                credentials: true
            }
        });
        
        global.onlineUsers = new Map();

        io.on("connection", (socket) => {
            global.chatSocket = socket;
            socket.on("add-user", (userId) => {
                onlineUsers.set(userId, socket.id);
            });

            socket.on("send-msg", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-recieve", data.msg);
                }
            });
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
start();