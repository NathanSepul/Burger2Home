import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import RowBasket from "./RowBasket.js";

import "./Basket.css"
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
                    <TableContainer component={Paper} >
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row" >Produit</TableCell>
                                    <TableCell align="left" sx={{ pl: "70px" }} component="th" scope="row">Quantité</TableCell>
                                    <TableCell align="center" component="th" scope="row">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {basket.quantity !== 0 && (
                                    basket.basketLines.map((basketLine) => (

                                        <RowBasket key={basket.basketLines.indexOf(basketLine)} basketLine={basketLine} indexBl={basket.basketLines.indexOf(basketLine)} />
                                    ))
                                )}

                                {basket.quantity === 0 && (
                                    <TableRow className="emptyBasket">
                                        <TableCell align="center" colSpan="3" >Votre panier est vide consulter notre carte pour manger beaucoups</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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