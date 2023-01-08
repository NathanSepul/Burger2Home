import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import TabStock from "./tabStock/TabStock.js";
import Loading from "../../loading/Loading.js";
import "./Stocks.css";

const Stocks = () => {

    const [ingredientsStock, setIngredientsStock] = useState([]);
    const [reloadList, setReloadList] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language);
    
    // eslint-disable-next-line
    const { t } = useTranslation();

    useEffect(() => {
        // setIsLoading(true);

        const requestOne = axios.get(`/ingredients/translations?language=${languageRedux.value}`);
        const requestTwo = axios.get(`/stocks`);
        axios.all([requestOne, requestTwo])
            .then(
                axios.spread((...res) => {
                    let tempIng = res[0].data.sort((a, b) => (a.ingredientId > b.ingredientId ? 1 : -1));
                    let tempStock = res[1].data.sort((a, b) => (a.ingredientId > b.ingredientId ? 1 : -1));

                    let tempFusion = [];

                    for (let i = 0; i < tempIng.length; i++) {
                        tempFusion.push({ ingredient: tempIng[i], stock: tempStock[i] })
                    }
                    tempFusion = tempFusion.sort((a, b) => (a.ingredient.name > b.ingredient.name ? 1 : -1));


                    setReloadList(false);
                    setIngredientsStock(tempFusion);
                    setIsLoading(false);
                })
            )
            .catch((e) => {
                console.log(e)
                setReloadList(false)

            })
    }, [languageRedux.value, reloadList])

    return (
        <main className='StockAdmin'>
            <title>Burger2Home | Stocks</title>
            <div className="title"><h1>Gestion des Stocks</h1></div>

            <div className="stocksContente">

                {isLoading ?
                    <Loading />
                    :
                    <TabStock ingredientsStock={ingredientsStock} setReloadList={setReloadList} />
                }

            </div>

        </main>
    );
}


export default Stocks