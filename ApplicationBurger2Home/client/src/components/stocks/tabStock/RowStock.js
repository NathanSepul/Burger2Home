import React, { useState, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

const RowStock = ({ ingredient, setReloadList }) => {

    const [stock, setStock] = useState(ingredient.stock);

    const onlyNumber = (e) => {
        if (!/[0-9]/.test(e.key))
            e.preventDefault();
    }

    const handleChange = (e) => {
        setStock({ ...stock, amount: parseInt(e.target.value) })
    }

    const handleSend = () => {
        if (stock.amount !== ingredient.stock.amount) {
            axios.put(`/stocks`, stock)
                .then(() => {

                    setReloadList(true)
                })
                .catch(e => console.log(e))
        }
    }
    return (
        <>

            <TableRow hover >

                <TableCell align='left'>
                    <span> {ingredient.ingredient.name}</span>
                </TableCell>

                <TableCell align='center'>
                    <>
                        <TextField
                            variant='standard'
                            placeholder='60'
                            className="qtInput"
                            value={stock.amount || 0}
                            onKeyPress={onlyNumber}
                            onChange={handleChange}
                        />

                        <IconButton onClick={handleSend} sx={{ width: "40px" }}>
                            <SaveIcon sx={{ color: "black" }} />
                        </IconButton>
                    </>

                </TableCell>

            </TableRow>

            {/* <TableRow className="interligne">
      </TableRow> */}
        </>
    );


}

export default RowStock