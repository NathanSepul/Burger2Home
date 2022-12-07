import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import TabBasket from "./tableau/TabBasket.js";
import "./Basket.css";

const Basket = () => {
    const [totalAmount, setTotalAmount] = useState(0);

    const { t } = useTranslation();
    const basket = useSelector(state => state.basket);



    useEffect(() => {
        const temp = basket.basketLines.map((basketLine) =>
            parseInt(basketLine.quantity) * parseFloat(basketLine.price)
        );

        setTotalAmount(temp.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        ));


    }, [basket])

    return (
        <main className='basketMain'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div className="title"><h1>{t("panier.titre")}</h1></div>

            <section className="contentBasket">

                <div className="basket">
                   <TabBasket basket={basket}/>
                </div>


                <div className="summary">
                    <button type="button" >Continuer la commande</button>
                    <div className="basketAmount">
                        <div>
                            <p className="txt1BasketAmount">Total</p>
                            <p className="txt2BasketAmount" >(tvac 21%)</p>
                        </div>

                        <div>
                            {totalAmount}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Basket