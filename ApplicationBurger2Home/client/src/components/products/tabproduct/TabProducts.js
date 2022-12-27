import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import RowProduct from "./RowProduct";
import "./TabProducts.css"

const TabProducts = ({ products, setProductSelected }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const column = ["Nom", "Description", "Prix", "Status" ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        <>
            <TableContainer component={Paper} className="productsTab">
                <Table aria-label="collapsible table" stickyHeader>
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

                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => {
                                return (
                                    <RowProduct key={product.id} product={product} setProductSelected={setProductSelected} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="products per page"
            />
        </>
    );
}

export default TabProducts;