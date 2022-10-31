import React, {useEffect, useState} from 'react';
import NavLinks from './NavLinks.js';
import SelectLanguage from '../../i18n/SelectLanguage.js';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';
import "./Nav.css"

const Nav = () => {
    const {t} = useTranslation();

    const [isOpenMenu,setIsOpenMenu] = useState("false");
    const [toggleMenu,setToggleMenu] = useState("false");
    const [largeur, setLargeur] = useState(window.innerWidth);

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
        setIsOpenMenu(!isOpenMenu);
    }

    const closeMenu = () => {
        setToggleMenu(false);
        setIsOpenMenu(false);
    }

    useEffect(()=>{
        const changeWidth = () => {
            setLargeur(window.innerWidth)
            
            // astuce pour qaund on grandit la fenetre on replace a false l'affichage
            if(window.innerWidth > 767){
                setToggleMenu(false);
                setIsOpenMenu(false); 
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
            
            {(toggleMenu || largeur > 767) && (
                <div id="navLinksTall">
				    <NavLinks closeMenu={closeMenu}/>
			    </div>
            )}

            <div id="selectLangue">
                <SelectLanguage />
            </div>

            <div id="navCompte">
                
                <span className="verticalLine"></span>

                <a href="index.html" className="monCompte">{t('navigation.compte')}</a>

                <a href="index.html" className="monPanier"> 
                    <ShoppingCartIcon fontSize="large" />
                </a>
             
            </div>

            <div className="navCompteSmall">
                <IconButton aria-label="menu">
                    <a href="index.html"> 
                        <AccountCircleIcon fontSize="large"/> 
                    </a>
                </IconButton>

                <IconButton aria-label="menu">
                    <a href="index.html"> 
                        <ShoppingCartIcon fontSize="large" />
                    </a>
                </IconButton>
                
                <IconButton  id="menuBurger" aria-label="menu" onClick={handleToggleMenu}>
                   
                    {(!isOpenMenu) && (
                        <MenuIcon fontSize="large"/>
                    )}

                    {(isOpenMenu) && (
                        <CloseIcon fontSize="large" />
                    )}
                </IconButton>
            </div>
           

        </nav>
        
    );
};

export default Nav