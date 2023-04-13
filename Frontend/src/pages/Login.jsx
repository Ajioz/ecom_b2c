import React, { useState } from 'react';
import ChatApp from '../components/chatComponents/ChatApp';
import Logo from '../assets/logo.png';
import { FormContainer } from'./style';
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes'


const toastParam = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark"
}

const Login = () => {
  
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const toastId = React.useRef(null);
  const [status, setStatus] = useState(false);

  const handleSubmit = async(e) => {
      e.preventDefault();
      if(handleValidation()){
          const res = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) || {};
          const { username, password } = values;
          const { data:  { user, msg, status } } = await axios.post(loginRoute, { username, password});
          if(status === false) { 
             if(!toast.isActive(toastId.current)) toastId.current = toast.error(msg, toastParam); 
          }if(status === true ) {
            localStorage.setItem('chatty-users', JSON.stringify(user));
            if(res) localStorage.setItem('chatty-users', JSON.stringify({...user, online: true}))
            setStatus(true);
          }
      }
  }
  
  const handleChange =(e) => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
      const { username, password } = values;
      if(username === "" || password === ""){
        toast.error("Username and password must not be empty", toastParam); 
        return false;
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
        
                      <div className="brand">
                        <img src={Logo} alt="logo"/>
                      </div>
        
                      <input 
                        type="text" 
                        placeholder='username' 
                        name='username'
                        required
                        onChange={(e) => handleChange(e)}/>
                      
                      <input 
                        type="password" 
                        placeholder='password' 
                        name='password'
                        required
                        onChange={(e) => handleChange(e)}/>
                    
                        <button type='submit'>Login</button>
                  </form>
              </FormContainer>
              <ToastContainer />
            </>
          ) : (
            <>
              <ChatApp />
            </>
          )
        }
    </>
  )
}

export default Login;
