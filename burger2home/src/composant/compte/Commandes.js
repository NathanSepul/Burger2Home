import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from "./historiqueCommande/Row.js";
import "./Commandes.css";

const Commandes = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        // setHasError(false);
        setIsLoading(true);

        fetch("./orders.json")
            .then(response => response.json())

            .then(data => {
                setIsLoading(false);
                setOrders(data);
                
            })

            .catch(() => {
                setHasError(true);
            });

    }, []);

    return (
        <div id="historique"> 
            <TableContainer component={Paper} >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Date</TableCell>
                            <TableCell>Total&nbsp;(€)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                        <Row key={order.id} order={order} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Commandes