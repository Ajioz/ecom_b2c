import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_SUCCESS,
} from "../Constants/OrderConstants";
import { logout } from "./userActions";
import axios from "axios";
import { URL } from "../url";


//All Products
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/orders/all`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};


// GET ORDER DETAILS
export const getOrderDetail = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST })
        const { userLogin: { userInfo} } = getState();
        const config = {
            headers:{
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`${URL}/api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });

        localStorage.removeItem("cartItems");
    }catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message : error.message
        if(message === "Not Authorized, token failed!") dispatch(logout())
        dispatch(({
            type: ORDER_DETAIL_FAIL,
            payload: message
        }));
    }
}


// ORDER DELIVERED
export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST })
        const { userLogin: { userInfo} } = getState();
        const config = {
            headers:{
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`${URL}/api/orders/${order._id}/delivered`, {}, config);
        // console.log(data)
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });

        localStorage.removeItem("cartItems");
    }catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message : error.message
        if(message === "Not Authorized, token failed!") dispatch(logout())
        dispatch(({
            type: ORDER_DELIVERED_FAIL,
            payload: message
        }));
    }
}
