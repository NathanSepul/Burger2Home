import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import RowIngredient from "./RowIngredient";
import "./TabProducts.css";
import { Container } from "@mui/system";

const TabIngredients = ({ ingredients, setIngredientSelected }) => {
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
            <TableContainer component={Paper} className="ingredientTab" >
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" >Nom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {ingredients
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ingredient) => {
                                return (
                                    <RowIngredient key={ingredient.id} ingredient={ingredient} setIngredientSelected={setIngredientSelected} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14]}
                component="div"
                count={ingredients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="ingredients per page"
            />
        </>

    );
}

export default TabIngredients;