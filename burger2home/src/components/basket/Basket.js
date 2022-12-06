import React from "react";
import { useTranslation } from 'react-i18next';


const Basket = () => {
    const { t } = useTranslation();

    return (
        <main className='Compte'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div id="title"><h1>{t("panier.titre")}</h1></div>

            <section id="tablBasket">

            </section>
        </main>
    );
}

export default Basket