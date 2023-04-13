import { MODAL_CLOSE } from "../Constants/ModalConstant";


// MODAL REDUCER
export const updateModalReducer = (state = {}, action) => {
    switch (action.type) {
        case MODAL_CLOSE:
            return {  modalShow: action.payload };
       
        default:
            return state;
    }
}
