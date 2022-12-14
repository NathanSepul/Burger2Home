import React, {useEffect,useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import RowBasket from "./RowProduct";
import "./TabProducts.css"

const TabProducts = ({ products }) => {
   
    return (
        <>
            <TableContainer component={Paper} className="productsTab">
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" ></TableCell>
                            <TableCell component="th" scope="row" align="left" >Nom</TableCell>
                            <TableCell component="th" scope="row" align="left" >description</TableCell>
                            <TableCell component="th" scope="row" align="left" >currentPrice</TableCell>
                            <TableCell component="th" scope="row" align="left" >status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {products.map((product) => (
                                <RowBasket key={product.id} product={product}/>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TabProducts;