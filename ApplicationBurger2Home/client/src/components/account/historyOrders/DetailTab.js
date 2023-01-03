import React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RowDetail from './RowDetail.js';
import { listItemIconClasses } from '@mui/material';

const DetailTab = ({ orderLines, open }) => {
    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <Box sx={{ mt: 3, mb: 5, pl: 10 }}>

                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row">Produit</TableCell>
                                    <TableCell component="th" scope="row">Quantitée</TableCell>
                                    <TableCell component="th" scope="row">Prix</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orderLines.map((line) => (  <RowDetail key={line.id} line={line}/> ))}
                            </TableBody> 
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );

}

export default DetailTab