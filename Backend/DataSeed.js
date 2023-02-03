import express from 'express';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import users from './data/users.js';
import Products from './data/Products.js';
import asyncHandler from 'express-async-handler'

const seedData = express.Router();

seedData.post('/seed/users', asyncHandler(async(req, res) => {
    await User.deleteMany({});
    const seedUser = await User.insertMany(users);
    return res.status(201).send({seedUser}) 
}))

seedData.post('/seed/products', asyncHandler(async(req, res) => {
    await Product.deleteMany({});
    const seedProduct = await Product.insertMany(Products);
    return res.status(201).send({seedProduct})  
}))

export default seedData;