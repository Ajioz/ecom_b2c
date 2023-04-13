import React, {  useState, useEffect } from 'react';
import Chat from "./Chat";
import { FormContainer } from'./style';
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes'

const toastParam = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover:false,
    autoClose:2000
}

const Register = () => {

  const [values, setValues] = useState({
      username: "",
      email: "",
      message: ""
  });

  const [status, setStatus] = useState(false);
  const toastId = React.useRef(null);

  useEffect(() => {
      let isMounted = true;
      if(isMounted){
        if(localStorage.getItem('chatty-users')){
        }
      }
      return () => { isMounted = false }
  }, [])


  const handleSubmit = async(e) => {
      e.preventDefault();
      if(handleValidation()){
          const { username, email, message } = values;
          const { data } = await axios.post(registerRoute, {username, email, message});
          if(data.status === false){
            if(!toast.isActive(toastId.current)) toastId.current = toast.error(data.msg, toastParam); 
          }
          if(data.status ===true ) {
            toast.success(data.status, toastParam);
            localStorage.setItem('chatty-users', JSON.stringify(data.user))
            setStatus(true);
          }
      }
  }
  
  const handleChange =(e) => {
      setValues({...values, [e.target.name]: e.target.value })
  }

  const isValidEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
  }

  const handleValidation = () => {
      const { username, email } = values;
      if(username.length < 3){
        toast.error("Name must be above 4 character", toastParam); return false;
      }else if(!isValidEmail(email)){
        toast.error("Email is invalid", toastParam); return false;
      }
      return true;
  }

  return (
    <>
        {
          !status ? (
            <>
              <FormContainer>
                  <form onSubmit={handleSubmit}>
                      <p>Hi there, quickly fill out this form should connectivity fails</p>
        
                      <input 
                        type="text" 
                        placeholder='Full Name' 
                        name='username'
                        required
                        onChange={(e) => handleChange(e)}/>
        
                      <input 
                        type="email" 
                        placeholder='Email' 
                        name='email'
                        required
                        onChange={(e) => handleChange(e)}/>
                    
                      <textarea 
                        placeholder='Message...' 
                        name='message'
                        required
                        cols="20" rows="4"
                        onChange={(e) => handleChange(e)}/>
        
                      <button type='submit'>Enter Chat</button>
                  </form>
              </FormContainer>
              <ToastContainer />
            </>
          ) : (
            <>
              <Chat />
            </>
          )
        }
    </>
  )
}

export default Register;