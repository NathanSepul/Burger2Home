import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import Loading from "../../loading/Loading.js"
import Row from "./Row.js";
import axios from 'axios';

import "./Orders.css";

const Orders = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState();
    const userRedux = useSelector(state => state.user)
    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {

        setHasError(false);
        setIsLoading(true);

        axios(`/users/${userRedux.id}/orders`)
            .then(res => {
                let temp = res.data.sort((a, b) => (a.id < b.id ? 1 : -1));
                temp.forEach(order => {
                    order.orderLines = order.orderLines.sort((a,b)=>(a.amount < b.amount ? 1 : -1))
                });

                setOrders(temp);
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
            });

    }, []);

    if (hasError) {
        openSnack.msg = "Les données n'ont pas pu être chargée";
        openSnack.severity = "error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="historique">
            <TableContainer component={Paper} >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Etat</TableCell>
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