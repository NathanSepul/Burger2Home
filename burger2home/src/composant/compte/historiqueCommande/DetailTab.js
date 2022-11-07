import React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const DetailTab = ({ orderLines,open }) => {
    return(
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit >
                <Box sx={{ mt: 3, mb:5, ml:10 }}>
                    
                    {/* <Typography variant="h6" gutterBottom component="div">
                        Détail
                    </Typography> */}
                   
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Produit</TableCell>
                                <TableCell>Quantitée</TableCell>
                                <TableCell>Prix</TableCell>
                            </TableRow>
                        </TableHead>
                        
                         <TableBody>
                           {orderLines.map((line) => (
                                <TableRow key={line.id}>
                                    <TableCell component="th" scope="row">
                                        {line.product}
                                    </TableCell>
                                    <TableCell>{line.price}</TableCell>
                                    <TableCell>{line.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> 
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
    );

}

export default DetailTab