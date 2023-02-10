import { 
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
 } from "../Constants/UserConstant";
import axios from 'axios';
import { toast } from "react-toastify";


// LOGIN
export const login = (email, password) => async(dispatch) => {
    
    const ToastParams = {
        pauseOnFocusLoss : false,
        draggable: false,
        pauseOnHover:false,
        autoClose:2000
    }

    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`http://localhost:5001/api/users/login`, { email, password}, config);
        if(!data.isAdmin){
            toast.error("You are not Admin", ToastParams);
            dispatch({type: USER_LOGIN_FAIL})
        }else{
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        }
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)
        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: USER_LOGIN_FAIL,
            payload: message
        }));
    }
}


// LOGOUT
export const logout = () => async(dispatch) => {
    try {
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_LOGOUT})
        dispatch({ type: USER_LIST_RESET})
    } catch (error) {
        console.log("Something went wrong")
    }
}



// USER LISTS
export const listUsers = () => async(dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.get(`http://localhost:5001/api/users`, config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });


    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)
        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: USER_LIST_FAIL,
            payload: message
        }));
    }
}
