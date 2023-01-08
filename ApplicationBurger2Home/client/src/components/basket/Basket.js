import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useSelector} from 'react-redux';
import StepperOrder from "./StepperOrder.js"

import "./Basket.css";

const Basket = () => {
    let basketR = useSelector(state => state.basket);
    const user = useSelector(state => state.user)
    const { t } = useTranslation();
    const [basket, setBasket] = useState(basketR)
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        if (user.isConnected) {
            axios.get(`/baskets/${user.basket.id}`)
                .then(res => {
                    setBasket(res.data)
                    setIsloading(false)
                })
                .catch(e => console.log(e))
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='basketMain'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div className="titleBasket"><h1>{t("panier.titre")}</h1></div>

            {!isLoading && (

                <section >
                    <StepperOrder basket={basket} />
                </section>
            )}
        </main>
    );
}

export default Basket