import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducer";
import { userLoginReducer } from "./Reducers/UserReducer";


const reducer = combineReducers({
    productList: productListReducer,
    detailProduct:productDetailsReducer,
    cart: cartReducer,
    UserLogin: userLoginReducer,
})

const cartItemLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) 
: [];

const initialState = {
    cart:{
        cartItems : cartItemLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;