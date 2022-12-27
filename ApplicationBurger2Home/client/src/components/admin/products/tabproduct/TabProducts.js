import React, { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import RowProduct from "./RowProduct";
import { useTranslation } from 'react-i18next';

import "./TabProducts.css"

const TabProducts = ({ products, setProductSelected }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const { t } = useTranslation();

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
                            <TableCell component="th" scope="row" align="left" >{t('gestionProduit.tab.nom')}</TableCell>
                            <TableCell component="th" scope="row" align="left" >{t('gestionProduit.tab.description')}</TableCell>
                            <TableCell component="th" scope="row" align="left" >{t('gestionProduit.tab.prixActuelle')}</TableCell>
                            <TableCell component="th" scope="row" align="left" >{t('gestionProduit.tab.status')}</TableCell>
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
                labelRowsPerPage={t('gestionProduit.tab.label1')}
            />
        </>
    );
}

export default TabProducts;