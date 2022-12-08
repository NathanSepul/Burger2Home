import React from "react";
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import StepperOrder from "./StepperOrder.js"
import "./Basket.css";

const Basket = () => {
   

    const { t } = useTranslation();
    const basket = useSelector(state => state.basket);

    return (
        <main className='basketMain'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div className="titleBasket"><h1>{t("panier.titre")}</h1></div>

            <section >
                <StepperOrder  basket={basket}/>
            </section>
        </main>
    );
}

export default Basket