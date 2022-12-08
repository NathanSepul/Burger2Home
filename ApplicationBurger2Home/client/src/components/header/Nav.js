import React, { useEffect, useState } from 'react';
import SelectLanguage from '../../i18n/SelectLanguage.js';
import NavLinks from './NavLinks.js';
import SmallNav from "./SmallNav.js";
import Login from "../login/Login.js";
import ToBasket from "./ToBasket.js";
import "./Nav.css"


const Nav = ({ toggleDrawer }) => {

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

                <ToBasket/>

            </div>
            {(largeur <= 767) && (
                <div className="navCompteSmall">
                    <span className="verticalLine"></span>
                    <SmallNav toggleDrawer={toggleDrawer} />
                </div>
            )}

        </nav>
    );
};

export default Nav