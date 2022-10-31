import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../composant/header/Header.js";
import Footer from "../composant/footer/Footer.js";

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
