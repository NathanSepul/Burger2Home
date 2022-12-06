import React from "react";
import { useTranslation } from 'react-i18next';

import { useSelector} from 'react-redux';

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
    const { t } = useTranslation();
    const basket = useSelector(state => state.basket);

    return (
        <main className='Compte'>
            <title>Burger2Home | {t("panier.titre")}</title>
            <div id="title"><h1>{t("panier.titre")}</h1></div>

            <section className="contentBasket">
                <div className="basket">
                    <TableContainer component={Paper} >
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produit</TableCell>
                                    <TableCell>Quantité</TableCell>
                                    <TableCell>Total&nbsp;(€)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                 
                                {basket.basketLines.map((basketLine) => (
                                    <RowBasket key={basketLine.idBl} basketLine={basketLine} />
                                ))}
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
                            10000000€
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Basket