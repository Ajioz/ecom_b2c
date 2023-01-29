import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstants";


export const cartReducer = (state = { cartItems: [] }, action) => {
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

        default:
            return state;
    }
}