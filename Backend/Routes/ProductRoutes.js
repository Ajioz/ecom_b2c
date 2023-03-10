import express from 'express';
import protect from '../Middleware/AuthMiddleWare.js'
import { Admin } from '../Middleware/AuthMiddleWare.js'
import {
    createProduct,
    createProductCloud,
    deleteProduct,
    editProduct,
    getAllProductAdmin,
    getAllProducts, 
    getCountry, 
    getOneProduct,
    productReview,
} from '../controllers/productController.js';


const productRoute = express.Router();

// GET ALL PRODUCTS & CREATE PRODUCT
// productRoute.route('/').get(getAllProducts).post(protect, Admin, createProduct)
productRoute.route('/').get(getAllProducts).post(protect, Admin, createProductCloud)


// Get all product without search and pagination - Admin
productRoute.get('/all', protect, Admin, getAllProductAdmin);


// GET, EDIT & DELETE ONE PRODUCT
productRoute.route('/:id').get(getOneProduct).put(protect, Admin, editProduct).delete(protect, Admin, deleteProduct);


// PRODUCT REVIEW 
productRoute.post('/:id/review', protect, productReview);

// GET COUNTRY 
productRoute.post('/country', protect, getCountry);


export default productRoute;