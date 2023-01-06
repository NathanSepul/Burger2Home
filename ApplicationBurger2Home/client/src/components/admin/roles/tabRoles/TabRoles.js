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

import RowRoles from "./RowRoles.js";
import "./TabRoles.css";

const TabRoles = ({ users, setUserSelected }) => {
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
        < >
            <TableContainer component={Paper} className="usersTab" >
                <Table aria-label="collapsible table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" >Email</TableCell>
                            <TableCell component="th" scope="row" align="left" >userName</TableCell>
                            <TableCell component="th" scope="row" align="left" >role</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => {
                                return (
                                    <RowRoles key={user.id} user={user} setUserSelected={setUserSelected} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 14]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="utilisateurs par page"
            />
        </>

    );
}

export default TabRoles;