import React from "react";
import Nav from "./Nav.js"
import logo from  "../../picture/logoBurger.jpg";
import {Link } from "react-router-dom";

import "./Header.css";


const Header = () => {

    return(
        <header>
            <Link to="" id="gridLogo" > <img src={logo} alt="burger2home" id="logoheader"/>  </Link>
            
            <div id="Header">
                <Nav /> 
            </div>
        </header>
    );
};

export default Header