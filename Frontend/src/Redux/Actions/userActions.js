import { USER_LOGIN_REQUEST } from "../Constants/UserConstant";





// LOGIN
export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers:{
                "Content-Type": "application/json",
                "methods": "POST"
            }
        }
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch(({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        }));
    }
}