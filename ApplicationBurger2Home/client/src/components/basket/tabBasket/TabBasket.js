import React, {useEffect,useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import RowBasket from "./RowBasket.js";
import "./TabBasket.css"

const TabBasket = ({ basket, isConnected }) => {
    const [bill, setBill] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);
    const { t } = useTranslation();


    useEffect(() => {
        const temp = basket.basketLines.map((basketLine) =>
            basketLine.quantity * Math.round(basketLine.actualPrice*100)/100
        );

        //somme de tout les elements un genre de boucle
        setTotalAmount(temp.reduce(
            (accumulator, currentValue) => Math.round(( accumulator + currentValue)*100)/100, 0
        ));


    }, [basket])

    return (
        <div className="contentBasket">
            <TableContainer component={Paper} className="basketTab">
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" >Produit</TableCell>
                            <TableCell align="left" sx={{ pl: "70px" }} component="th" scope="row">Quantité</TableCell>
                            <TableCell align="center" component="th" scope="row">Prix</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.basketLines.length !== 0 ? (
                            basket.basketLines.map((basketLine) => (
                                <RowBasket key={basket.basketLines.indexOf(basketLine)} basketLine={basketLine} indexBl={basket.basketLines.indexOf(basketLine)} isConnected={isConnected} setBill={setBill} bill={bill}/>
                            ))
                        ) : (
                            <TableRow className="emptyBasket">
                                <TableCell align="center" colSpan="3" >
                                    Votre panier est vide consulter notre&nbsp;
                                    <Link to="/carte">carte</Link>
                                    &nbsp;pour manger beaucoups
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>

            <div className="summary">
                <div className="basketAmount">
                    <div>
                        <p className="txt1BasketAmount">Total</p>
                        <p className="txt2BasketAmount" >(tvac 21%)</p>
                    </div>

                    <div>
                        {bill}&nbsp;€
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabBasket;