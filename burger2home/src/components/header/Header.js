import React from 'react';
import Nav from "./Nav.js"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setIsOpen} from '../../redux/smallMenuSlice.js';
import "./Header.css";

const Header = () => {

  const isOpen = useSelector(state => state.isOpen.value)
  const dispatch = useDispatch()

  // const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (leave) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    if (leave === true) {
      dispatch(setIsOpen(false))
    }
    else {
      dispatch(setIsOpen(!isOpen))
    }
  };

  return (
    <header>
      <Link to="" id="gridLogo" onClick={toggleDrawer(true)} > <img src={"/picture/logoBurger.jpg"} alt="burger2home" id="logoheader" />  </Link>
     
      <div id="Header">
        <Nav toggleDrawer={toggleDrawer}/>
      </div>
    </header>
  );
};

export default Header