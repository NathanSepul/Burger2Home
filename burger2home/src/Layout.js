import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
