import React from 'react';
import "./Concept.css";
import pdt from "../picture/pdt_pelee.jpg";
import montage from "../picture/montage.jpeg";

import { useTranslation } from 'react-i18next';

const Concept = () => {
    const { t } = useTranslation();

    return (
        <main>
            <h3>{t('concept.titre')}</h3>
            <section id="conceptSection">
                <article id="gauche">
                    <br />
                    <p>{t('concept.gauche.p1')}</p>
                    <br />
                    <p>{t('concept.gauche.p2')}</p>
                    <br />
                    <p>{t('concept.gauche.p3')}</p>
                    <br />
                    <img src={pdt} alt="eplucher pdt" />

                    <br /><br /><br />
                </article>

                <article id="droit">
                    <br />
                    <img src={montage} alt="montage de burger" />

                    <br />
                    <br />
                    <p>{t('concept.droit.p1')}</p>
                    <br />
                    <p>{t('concept.droit.p2')}</p>
                    <br />
                    <p>{t('concept.droit.p3')}</p>
                    <br />
                    <p>{t('concept.droit.p4')}</p>

                </article>

            </section>
        </main>
    );
}

export default Concept;
