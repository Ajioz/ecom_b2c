import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from "cors";    
import ConnectDb from './config/MongoDb.js'
import seedData from './DataSeed.js';
import productRoute from './Routes/ProductRoutes.js';
// import { errorHandler, notFound } from './Middleware/Errors.js';
import userRoute from './Routes/UserRoutes.js';

// //Extra security
// const helmet = require('helmet')
// import xss from 'xss-clean'


const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json());


// API
app.use("/api", seedData);
app.use("/api", productRoute);
app.use("/api/users", userRoute);

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