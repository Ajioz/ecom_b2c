import React, { useState, useEffect, useRef } from 'react'
import { ChatWrapper } from '../pages/style';
import ChatContainer from "../components/chatComponents/ChatContainer";
import axios from 'axios'
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/chatComponents/Contacts';
import Welcome from "../components/chatComponents/Welcome";


const Chat = () => {

  const history = useHistory();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);



  useEffect(() => {
    let isMounted = true;
    (async() => {
      if(isMounted){
        if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){ history.push("/login");}  
        else{setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));}
      }
    })();
    return () => { isMounted = false; }
  },[history])

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id)
      }
    }
    return () => { isMounted = false; }
  }, [currentUser])
  
  useEffect(() => {
    let isMounted = true;
    (async() => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          if (isMounted){
            setContacts(data);
          }
        }
      }
    })();
    return () => { isMounted = false; }
  },[history, currentUser])
  
  useEffect(() => {
    let isMounted = true;
    const refresh =  setInterval(async () => {
      if(isMounted){
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      }
    }, 3000);
    return () =>{ 
      isMounted = false;
      clearInterval(refresh);
    }
  }, [currentUser?._id])

  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <ChatWrapper>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange}  />
        {currentChat===undefined?(<Welcome/>):(<ChatContainer  currentChat={currentChat} socket={socket}/>)}
      </div>
    </ChatWrapper>
  )
}

export default Chat;