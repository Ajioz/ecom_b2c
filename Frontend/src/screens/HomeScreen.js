import React, {useState, useEffect } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Carousel from "./Carousel";
import {Container, Box, Boxmini, MySlide } from './slide.jsx'
import { MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";

// New component based on FAB
import { FcBusinessman } from "react-icons/fc";
import FaB from '../components/homeComponents/FaB';
import ChatModal from '../components/homeComponents/ChatModal'





const HomeScreen = ({ match }) => {

  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;

  const [showModal, setShowModal] = useState(false);

  const modal = useSelector(state => state.modalShow);
  const { modalShow } = modal;

  
  useEffect(() => {
    let isMounted = true;
    (async()=> {
      if(isMounted) {
        setShowModal(false)
      }
    })()
    return () => isMounted = false;
  }, [modalShow])


  const actions = [
    { label:"LiveChat", icon: <FcBusinessman onClick={() =>  setShowModal(!showModal)} /> },
    { label:"WhatsApp", icon: <a href="whatsapp://send?text=Hi hubSandy, I'd love to order some product, I thought of reaching out first!&phone=+2349070953512" target="_blank" rel="noreferrer"><MDBIcon fab icon="whatsapp"/></a>}
  ];

  return (
    <div>
      <Header />
      <Container className="slide-container">
        <Box className="resp">
          <Boxmini>Men Collection</Boxmini>
          <Boxmini>Women Collection</Boxmini>
          <Boxmini>Children's World </Boxmini>
          <Boxmini>Native Outfitters</Boxmini>
          <Boxmini>Ladies Bags</Boxmini>
          <Boxmini>Ankara & Agbada</Boxmini>
          <Boxmini>Wrist Watches</Boxmini>
          <Boxmini>Senators - Men</Boxmini>
          <Boxmini>Latest Shoes</Boxmini>
          <Boxmini>Gadgets</Boxmini>
        </Box>
        <MySlide className="slide">
          <Carousel />
        </MySlide>
      </Container>
      <ShopSection keyword={keyword} pagenumber={pagenumber}/>
      <CalltoActionSection />
      <ContactInfo />
      <FaB actions={actions} />
      <ChatModal showModal={showModal} setShowModal={setShowModal}/>
      <Footer />
    </div>
  );
};

export default HomeScreen;
