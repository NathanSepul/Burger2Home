import React, { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useTranslation } from 'react-i18next';

import RowStock from "./RowStock.js";

const TabStock = ({ ingredientsStock, setReloadList }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
// eslint-disable-next-line
    const { t } = useTranslation();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        <div>
            <TableContainer component={Paper} className="stockTab" >
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="center" >Nom</TableCell>
                            <TableCell component="th" scope="row" align="center" >Quantité</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {ingredientsStock
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ing) => {
                                return (
                                    <RowStock key={ing.ingredient.ingredientId} ingredient={ing} setReloadList={setReloadList} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={ingredientsStock.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="ingredient par page"
            />
       </div>
    );
}

export default TabStock;