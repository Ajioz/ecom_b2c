import { 
    CART_ADD_ITEM, 
    CART_CLEAR_ITEMS, 
    CART_REMOVE_ITEM, 
    CART_SAVE_PAYMENT_METHOD, 
    CART_SAVE_SHIPPING_ADDRESS 
} from "../Constants/CartConstants";


export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {}, }, action) => {
    switch (action.type) {
        
        case CART_ADD_ITEM:
            const item = action.payload;
            const addItem = state.cartItems.find((x) => x.productId === item.productId)
            if(addItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) => cartItem.productId === addItem.productId ? item : cartItem 
                    )
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                    // cartItems: state.cartItems.filter((x) => x.product !== item)
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter( (cartItem) => cartItem.productId !== action.payload )
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems:[],
            }
        default:
            return state;
    }
}