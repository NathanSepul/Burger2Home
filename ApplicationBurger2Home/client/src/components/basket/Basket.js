import React from "react";
import { useTranslation } from 'react-i18next';

import { useSelector,useDispatch } from 'react-redux';
import StepperOrder from "./StepperOrder.js"
import "./Basket.css";

const Basket = () => {
   
    
    const user = useSelector(state => state.user)
  
    const { t } = useTranslation();

    let basket = useSelector(state => state.basket);

    if(user.isConnected){
        basket = user.basket
    }

    return (
        <main className='basketMain'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div className="titleBasket"><h1>{t("panier.titre")}</h1></div>

            <section >
                <StepperOrder basket={basket}/>
            </section>
        </main>
    );
}

export default Basket