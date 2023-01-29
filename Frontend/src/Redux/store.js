import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducer";
import { userLoginReducer, userRegisterReducer } from "./Reducers/UserReducer";


const reducer = combineReducers({
    productList: productListReducer,
    detailProduct:productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

//Cart Items 
const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[];

// Login
const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    cart:{
        cartItems
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