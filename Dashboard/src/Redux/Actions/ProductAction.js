import axios from "axios";
import { 
PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";


// PRODUCT LISTS
export const listProducts = () => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.get(`http://localhost:5001/api/products/all`, config);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)
        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: PRODUCT_LIST_FAIL,
            payload: message
        }));
    }
}


//DELETE  PRODUCT
export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST})

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        await axios.delete(`http://localhost:5001/api/products/${id}`, config);
        dispatch({ type: PRODUCT_DELETE_SUCCESS });

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)
        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: PRODUCT_DELETE_FAIL,
            payload: message
        }));
    }
}



//CREATE  PRODUCT
export const createProduct = (name, price, description, image, stock) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST})

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const {data} = await axios.post(`http://localhost:5001/api/products`, {name, price, description, image, stock}, config);
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)
        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        }));
    }
}

// SINGLE PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update Product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5001/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

