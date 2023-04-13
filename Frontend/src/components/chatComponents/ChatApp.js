import React, { useState, useEffect } from "react";
import Chat from "../../pages/Chat";
import { useSelector} from 'react-redux'
import Login from "../../pages/Login";
import Register from "../../pages/Register";



const ChatApp = () => {
  
  const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

  const [status, setStatus] = useState(data?.online);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  

  useEffect(() => {
    let isMounted = true;
    (async() => {
      if(isMounted){
        setStatus(data?.online);
      }
    })();
    return () => { isMounted = false; }
  },[data, status]);

  return (
    <>
      {  userInfo?.isAdmin ? ( <> {  status ? ( <Chat /> ) : ( <Login/>)  } </>  ):( <Register/> ) }
    </>
  );
}

export default ChatApp;