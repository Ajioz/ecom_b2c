import React, { useState } from "react";
import axios from 'axios';
import Toast from '../LoadingError/Toast'
import { toast } from "react-toastify";


const CalltoActionSection = () => {
  
  const [email, setEmail] = useState(" ");
  const toastId = React.useRef(null);

  const ToastParams = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover:false,
    autoClose:2000
  }

  const subHandler = async(e) => {
    e.preventDefault();
    try{
      const { data } = await axios.post("/api/subscribers", {email});
      if(data) {
        if(!toast.isActive(toastId.current)) toastId.current = toast.success("Subscription Successful", ToastParams)
      }
    }catch (error) {
      if(!toast.isActive(toastId.current)) toastId.current = toast.error("User already subscribed", ToastParams)
    } 
    setEmail(" ");
  }


  

  return (
    <>
    <Toast />
      <div className="subscribe-section bg-with-black">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="subscribe-head">
                <h2>Do you need more tips?</h2>
                <p>Sign up free and get the latest tips.</p>
                <form className="form-section" onSubmit={subHandler}>
                  <input 
                      placeholder="Your Email..." 
                      name="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                  <input value="Yes. I want!" name="subscribe" type="submit" style={{background:'#0277bd'}}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalltoActionSection;
