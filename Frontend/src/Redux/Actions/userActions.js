import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../Constants/UserConstant";
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants";
import { URL } from "../url";


// LOGIN
export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${URL}/api/users/login`, { email, password}, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch(({
            type: USER_LOGIN_FAIL,
            payload:"Invalid Email or Password"
        }));
    }
}


// LOGOUT
export const logout = () => async(dispatch) => {
    try {
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_LOGOUT})
        dispatch({ type: USER_DETAILS_RESET})
        dispatch({ type: ORDER_LIST_MY_RESET})
        //Optional
        document.location.href = "/login";
    } catch (error) {
        console.log("Something went wrong")
    }
}


// REGISTER
export const signup = (name, email, password, phoneNumber ) => async(dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${URL}/api/users/signup`, { name, email, password, phoneNumber}, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        // localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        console.log(error)
        dispatch(({
            type: USER_REGISTER_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        }));
    }
}


// User Details
export const getUserDetails = () => async(dispatch, getState) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })
        const { userLogin: { userInfo} } = getState();
        const config = {
            headers:{
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`${URL}/api/users/profile`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        console.log(error)

        if(message === "Not Authorized, token failed!"){
            dispatch(logout())
        }
        dispatch(({
            type: USER_DETAILS_FAIL,
            payload: message
            
        }));
    }
}


// UPDATE PROFILE
export const updateProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const { userLogin: { userInfo} } = getState();
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`${URL}/api/users/profile`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))

    }catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        if(message === "Not Authorized, token failed!") dispatch(logout())
        dispatch(({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: message
            
        }));
    }
}