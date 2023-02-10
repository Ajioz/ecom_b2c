import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import Subscribers from "../components/Subscribers/Subscribers";

const subscribeScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Subscribers />
      </main>
    </>
  );
};

export default subscribeScreen;
