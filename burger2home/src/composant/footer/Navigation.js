import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import './Navigation.css';

const Navigation = () => {

    const { t } = useTranslation();

    return (
        <nav className='NavigationFooter'>
            <ul className={"linksFooter"}>
                <li className="linkFooter" id="navFooter1"> <Link to="/" > {t('navigation.accueil')} </Link> </li>
                <li className="linkFooter" id="navFooter2"> <Link to="/concept" > {t('navigation.carte')} </Link> </li>
                <li className="linkFooter" id="navFooter3"> <Link to="/carte" > {t('navigation.concept')} </Link> </li>
                <li className="linkFooter" id="navFooter4"> <Link to="/marketing" > {t('navigation.marketing')} </Link> </li>
                <li className="linkFooter" id="navFooter5"> <Link to="/stocks" > {t('navigation.stock')} </Link> </li>
                <li className="linkFooter" id="navFooter6"> <Link to="/droits" > {t('navigation.droit')} </Link> </li>
                <li className="linkFooter" id="navFooter7"> <Link to="/burgers" > {t('navigation.burger')} </Link> </li>
            </ul>
        </nav>
    );

};

export default Navigation;