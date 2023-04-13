import React, { useState, useEffect } from "react";
import { WelContainer } from '../../pages/style'
import Robot from "../../assets/robot.gif";

const Welcome = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async() => {
      const { username } = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if(isMounted) setUserName(username);
    })();
    return () => isMounted = false;
  }, []);

  return (
    <WelContainer>
      <img src={Robot} alt="Robot" />
      <h3>Welcome, <span>{userName}!</span></h3>
      <h3>Please select an agent to chat with</h3>
    </WelContainer>
  );
}


export default Welcome;