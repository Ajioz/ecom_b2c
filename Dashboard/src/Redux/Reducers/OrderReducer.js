import {
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_RESET,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from "../Constants/OrderConstants";


// ORDER LIST
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
        return { loading: true };
    
    case ORDER_LIST_SUCCESS:
        return { loading: false, success: true, orders: action.payload };

    case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };

    default:
        return state;
  }
};


// ORDER DETAILS REDUCER
export const orderDetailReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} }, 
    action
    ) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { ...state, loading: true };

        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload };

        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
                          
        default:
            return state;
    }
}


// ORDER DELIVERED 
export const orderDeliveredReducer = (
    state = { }, 
    action
    ) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return { loading: true };

        case ORDER_DELIVERED_SUCCESS:
            return { loading: false, success: true };

        case ORDER_DELIVERED_FAIL:
            return { loading: false, error: action.payload };

        case ORDER_DELIVERED_RESET:
            return { };
                          
        default:
            return state;
    }
}

