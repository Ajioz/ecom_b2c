import React from 'react'
import { ModalContainer } from '../../pages/style'
import { MdKeyboardArrowDown } from "react-icons/md";
import ChatApp from '../chatComponents/ChatApp';

const show = {
  transform: "translateY(0) scale(1)",
  transition: "transform 300ms, opacity 300ms",
  opacity: "1",
  zIndex: 10
}

const hide = {
  transform: "translateY(50px) scale(0)",
  transition: "transform 300ms, opacity 300ms",
  opacity: "0",
  zIndex: -1,
}

const ChatModal = ({ showModal, setShowModal }) => {
   
  return (
    <>
        <ModalContainer  style={showModal ? show : hide } >
          <div className="close"><MdKeyboardArrowDown onClick={() => setShowModal(!showModal)}/></div>
          <ChatApp />
        </ModalContainer> 
    </>
  )
}

export default ChatModal