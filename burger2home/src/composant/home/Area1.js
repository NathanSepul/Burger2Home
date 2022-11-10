import React from 'react';
import './Area1.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';



const Area1 = () => {
    const { t } = useTranslation();

    return (
        <section className="conceptAccueil">

            <h2>{t('accueil.area1.titre')}</h2>
            <article>
                <div className="conceptTxt">
                    <p>{t('accueil.area1.p1')}</p>
                    <br />
                    <p>{t('accueil.area1.p2')}</p>
                </div>

                <Link to="/concept" className="linkToConcept"> 
                    <button type="button" className="toConcept">
                        {t('accueil.area1.button')}
                    </button>
                </Link>

            </article>
        </section>
    );
};

export default Area1