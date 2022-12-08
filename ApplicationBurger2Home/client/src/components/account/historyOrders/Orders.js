import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import Loding from "../../loding/Loding.js"
import Row from "./Row.js";
import "./Orders.css";

const Orders = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const openSnack = {msg:"", severity:""};
    const dispatch = useDispatch();

    useEffect(() => {

        setHasError(false);
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

    if (hasError) {
        openSnack.msg="Les données n'ont pas pu être chargée";
        openSnack.severity="error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loding />;
    }

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

export default Orders