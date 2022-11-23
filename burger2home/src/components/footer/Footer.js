import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.js"
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer>
            <div id="txtFooter">
                <p>{t('footer.p')}</p>
            </div>

            <div id="Footer">
                <Navigation />
            </div>

            <Link to="" id="gridLogoFooter" > <img src={"/picture/logoBurger.jpg"} alt="burger2home" id="logofooter" />  </Link>
        </footer>
    );
};

export default Footer;