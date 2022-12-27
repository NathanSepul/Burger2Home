import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import RowAllergen from "./RowAllergen";
import "./TabAllergen.css";
import { Container } from "@mui/system";

const TabAllergen = ({ allergens, setAllergenSelected }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        < >
            <TableContainer component={Paper} className="allergenTab" >
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" >Nom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {allergens
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((allergen) => {
                                return (
                                    <RowAllergen key={allergen.id} allergen={allergen} setAllergenSelected={setAllergenSelected} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14]}
                component="div"
                count={allergens.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="allergens per page"
            />
        </>

    );
}

export default TabAllergen;