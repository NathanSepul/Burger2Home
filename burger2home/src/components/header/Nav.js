import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SelectLanguage from '../../i18n/SelectLanguage.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import NavLinks from './NavLinks.js';
import SmallNav from "./SmallNav.js";
import Login from "../login/Login.js";
import "./Nav.css"


const Nav = ({ toggleDrawer}) => {
   
    const [largeur, setLargeur] = useState(window.innerWidth);

    useEffect(() => {
        const changeWidth = () => {
            setLargeur(window.innerWidth)
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, []) // [] pour se lancer seulement quand le composant sera affiché la première fois

    return (
        <nav className="Nav">

            {/* short circuit opérateur // avec opérateur ternaire */}

            {(largeur > 767) && (
                <div id="navLinksTall">
                    <NavLinks />
                </div>
            )}

            <div id="selectLangue">
                <SelectLanguage />
            </div>

            <div id="navCompte">

                <span className="verticalLine"></span>

                <Login toggleDrawer={toggleDrawer} isSmall={false} />

                <Link to="/compte" className="monPanier"> 
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </Link>
                
            </div>

            <div className="navCompteSmall">
                <SmallNav toggleDrawer={toggleDrawer} />
            </div>
        </nav>
    );
};

export default Nav