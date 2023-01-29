import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstants";


// ADD ITEM
export const addToCart = (id, qty) => async(dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${id}`);

   dispatch({
        type:CART_ADD_ITEM,
        payload:{
            productId:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            stock:data.stock,
            qty,
        },
   });

   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// REMOVE ITEM
export const removeFromCart = (id) => async (dispatch, getState ) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}