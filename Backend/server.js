import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";    
import ConnectDb from './config/MongoDb.js'
import seedData from './DataSeed.js';
import productRoute from './Routes/ProductRoutes.js';
import userRoute from './Routes/UserRoutes.js';
import orderRoute from './Routes/orderRoutes.js';
// import { errorHandler, notFound } from './Middleware/Errors.js';


// //Extra security
// const helmet = require('helmet')
// import xss from 'xss-clean'


const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json());


// API
app.use("/api/", seedData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

// Query Paypal
app.get("/api/config/paypal", (req, res) => {
    console.log("requested")
    return res.send(process.env.PAYPAL_CLIENT_ID);
})

// ERROR HANDLER
// app.use(notFound);
// app.use(errorHandler);


const start = async () => {
    try {
        await ConnectDb(url);
        app.listen(port, () => console.log(`Server running on port http://localhost:${port}...`))
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

start();