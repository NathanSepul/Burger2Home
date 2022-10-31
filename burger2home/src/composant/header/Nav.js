import React, {useEffect, useState} from 'react';
import NavLinks from './NavLinks.js';
import {Link } from "react-router-dom";

import SelectLanguage from '../../i18n/SelectLanguage.js';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";

import { useTranslation } from 'react-i18next';
import "./Nav.css"

import SmallNav from "./SmallNav.js";
const Nav = () => {

    const {t} = useTranslation();

    const [toggleMenu,setToggleMenu] = useState("false");
    const [largeur, setLargeur] = useState(window.innerWidth);

    useEffect(()=>{
        const changeWidth = () => {
            setLargeur(window.innerWidth)
            
            // astuce pour qaund on grandit la fenetre on replace a false l'affichage
            if(window.innerWidth > 767){
                setToggleMenu(false);
            }
        }

        window.addEventListener('resize',changeWidth)

        return () => {
            window.removeEventListener('resize',changeWidth)
        }
    },[]) // [] pour se lancer seulement quand le composant sera affiché la première fois

    return(
        <nav className="Nav">

            {/* short circuit opérateur // avec opérateur ternaire */}
            
            {( largeur > 767) && (
                <div id="navLinksTall">
				    <NavLinks />
			    </div>
            )}

            <div id="selectLangue">
                <SelectLanguage />
            </div>

            <div id="navCompte">
                
                <span className="verticalLine"></span>

                <Link to="/compte" className="monCompte"> {t('navigation.compte')} </Link>

                <a href="index.html" className="monPanier"> 
                    <Badge badgeContent={4} color="primary">
                            <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </a>
             
            </div>

            <div className="navCompteSmall">
                <SmallNav />
            </div>
        </nav>
    );
};

export default Nav