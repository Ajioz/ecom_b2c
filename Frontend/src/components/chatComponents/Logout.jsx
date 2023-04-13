import React from "react";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { deleteRoute } from "../../utils/APIRoutes";
 

const toastParam = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark"
}

export default function Logout ({ id }) {

  const toastId = React.useRef(null);

  const handleClick = async () => {
      const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const { data:  { msg, status } } = await axios.post(`${deleteRoute}`, {id, user});
      if (status === 200) {
       window.location.reload();
      }else if(status === 401){
         if(!toast.isActive(toastId.current)) toastId.current = toast.error(msg, toastParam); 
      }
  };

  return (
    <>
      <Button onClick={handleClick}>
        <MdDelete />
      </Button>
      <ToastContainer />
    </>
  );

}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ff2c2c;
    cursor: pointer;
  }
`;