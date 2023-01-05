import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useTranslation } from 'react-i18next';

import RowPromo from "./RowPromo.js";
// import "./TabStock.css";

const TabPromo = ({ promos, setPromoSelected }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const { t } = useTranslation();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        < >
            <TableContainer component={Paper} className="promoTab" >
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" >Description</TableCell>
                            <TableCell component="th" scope="row" align="center" >Montant</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {promos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((promo) => {
                                return (
                                    <RowPromo key={promo.general.id} promo={promo} setPromoSelected={setPromoSelected} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14]}
                component="div"
                count={promos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={t('gestionIngredient.tab.label1')}
            />
        </>

    );
}

export default TabPromo;