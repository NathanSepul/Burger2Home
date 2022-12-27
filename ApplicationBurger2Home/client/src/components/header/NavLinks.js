import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import MenuAdmin from './MenuAdmin'; 
import './NavLinks.css'

const NavLinks = ({ closeMenu }) => {
    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    return (
        <ul className="linksHeader">

            <li className="linkHeader" id="navHeader1"> <Link to="/" onClick={closeMenu} > {t('navigation.accueil')} </Link> </li>
            <li className="linkHeader" id="navHeader2"> <Link to="/carte" onClick={closeMenu} > {t('navigation.carte')} </Link> </li>
            <li className="linkHeader" id="navHeader3"> <Link to="/concept" onClick={closeMenu} > {t('navigation.concept')} </Link> </li>
           
            {(user.role === "marketing") && (
                <li className="linkHeader" id="navHeader4"> <Link to="/marketing" onClick={closeMenu} > {t('navigation.marketing')} </Link> </li>
            )}

            {(user.role === "admin") && (<>
                {<  MenuAdmin closeMenu={closeMenu}/>}
            </>)}

          
        </ul>
    );
}

export default NavLinks;