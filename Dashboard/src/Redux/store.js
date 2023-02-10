import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/UserReducer";
import { 
    productCreateReducer, 
    productDeleteReducer, 
    productEditReducer, 
    productListReducer, 
    productUpdateReducer 
} from "./Reducers/ProductReducer";
import { orderDeliveredReducer, orderDetailReducer, orderListReducer } from "./Reducers/OrderReducer";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetail: orderDetailReducer,
    orderDelivered: orderDeliveredReducer,
})

// Login
const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;


const initialState = {
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