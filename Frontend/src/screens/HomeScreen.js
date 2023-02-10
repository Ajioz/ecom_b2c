import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Carousel from "./Carousel";
import {Container, Box, Boxmini, MySlide } from './slide.jsx'



const HomeScreen = ({match}) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <Container className="slide-container">
        <Box className="resp">
          <Boxmini>Men Collection</Boxmini>
          <Boxmini>Women Collection</Boxmini>
          <Boxmini>Corperate wears</Boxmini>
          <Boxmini>Men Senator</Boxmini>
          <Boxmini>Ladies Bags</Boxmini>
          <Boxmini>Ankara & Agbada</Boxmini>
          <Boxmini>Wrist Watches</Boxmini>
          <Boxmini>African Attire</Boxmini>
          <Boxmini>Men Shoes</Boxmini>
          <Boxmini>Gadgets</Boxmini>
        </Box>
        <MySlide className="slide">
            <Carousel />
        </MySlide>
      </Container>
      <ShopSection keyword={keyword} pagenumber={pagenumber}/>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
