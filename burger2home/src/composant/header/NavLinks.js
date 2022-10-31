import React from 'react';
import './NavLinks.css'
import {Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const NavLinks = ({closeMenu}) => {
    const {t} = useTranslation();

    return(
        <ul className={"linksHeader"}>
            <li className="linkHeader" id="navHeader1"> <Link to="/" onClick={closeMenu} > {t('navigation.accueil')} </Link> </li>
            <li className="linkHeader" id="navHeader2"> <Link to="/carte" onClick={closeMenu} > {t('navigation.carte')} </Link> </li>
            <li className="linkHeader" id="navHeader3"> <Link to="/concept" onClick={closeMenu} > {t('navigation.concept')} </Link> </li>
            <li className="linkHeader" id="navHeader4"> <Link to="/marketing" onClick={closeMenu} > {t('navigation.marketing')} </Link> </li>
            <li className="linkHeader" id="navHeader5"> <Link to="/stocks" onClick={closeMenu} > {t('navigation.stock')} </Link> </li>
            <li className="linkHeader" id="navHeader6"> <Link to="/droits" onClick={closeMenu} > {t('navigation.droit')} </Link> </li>
            <li className="linkHeader "id="navHeader7"> <Link to="/burgers" onClick={closeMenu} > {t('navigation.burger')} </Link> </li>
        </ul>
    );
}

export default NavLinks;