import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import RowBasket from "./RowBasket.js";
import "./TabBasket.css"

const TabBasket = ({basket}) => {
    return (
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
    );
}

export default TabBasket;