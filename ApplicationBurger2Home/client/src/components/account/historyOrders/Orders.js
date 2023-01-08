import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
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
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState();
    const userRedux = useSelector(state => state.user)
    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {

        setHasError(false);
        setIsLoading(true);

        axios(`/users/${userRedux.id}/orders`)
            .then(res => {
                let temp = res.data.filter(a => a.status !== "waiting_for_payment")
                temp = temp.sort((a, b) => (a.id < b.id ? 1 : -1));
                temp.forEach(order => {
                    order.orderLines = order.orderLines.sort((a,b)=>(a.amount < b.amount ? 1 : -1))
                });

                setOrders(temp);
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
            });
// eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {orders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => {
                                return (
                                    <Row key={order.id} order={order} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="commande par page"
            />
        </div>
    );

}

export default Orders