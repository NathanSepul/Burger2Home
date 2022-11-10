import React, { useState } from 'react';
import Nav from "./Nav.js"
import logo from "../../picture/logoBurger.jpg";
import { Link } from "react-router-dom";

import "./Header.css";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (leave) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    if (leave === true) {
      setIsOpen(false);
    }
    else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header>
      <Link to="" id="gridLogo" onClick={toggleDrawer(true)} > <img src={logo} alt="burger2home" id="logoheader" />  </Link>
     
      <div id="Header">
        <Nav toggleDrawer={toggleDrawer} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default Header