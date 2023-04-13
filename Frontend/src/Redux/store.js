import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productCreateReviewReducer, productDetailsReducer, productListReducer } from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducer";

import { 
    userDetailsReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateProfileReducer 
} from "./Reducers/UserReducer";

import { 
    orderCreateReducer, 
    orderDetailReducer, 
    orderListMyReducer, 
    orderPayReducer 
} from "./Reducers/OrderReducer";

import { updateModalReducer } from './Reducers/ModalReducer'

const reducer = combineReducers({
    productList: productListReducer,
    detailProduct: productDetailsReducer,
    productReviewCreate: productCreateReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    modalShow: updateModalReducer,
})

//Cart Items 
const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[];

// Login
const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// ShippingAddress
const shippingAddress = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};

const initialState = {
    cart:{
        cartItems,
        shippingAddress
    },
    userLogin:{
        userInfo
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;