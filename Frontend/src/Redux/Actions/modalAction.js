import { MODAL_CLOSE } from "../Constants/ModalConstant";

// UPDATE MODAL
export const updateModal = () => async(dispatch) => {
    const data = await JSON.parse(localStorage.getItem('modal'));
    dispatch({ type: MODAL_CLOSE,  payload:!data  });
    await localStorage.setItem('modal', JSON.stringify(!data));
}