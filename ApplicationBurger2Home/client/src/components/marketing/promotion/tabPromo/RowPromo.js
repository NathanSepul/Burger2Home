import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import moment, { relativeTimeRounding } from 'moment';

const RowPromo = ({ promo, setPromoSelected }) => {

    const [description, setDescription] = useState(null)
    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        if (languageRedux.value === "FR") {
            setDescription(promo.tradFr)
        }
        else {
            setDescription(promo.tradEn)
        }
    }, [languageRedux.value])

    const set = () => {
        setPromoSelected(promo)
    }
    if (description !== null) {
        return (
            <>

                <TableRow hover >

                    <TableCell align='left' onClick={set}>
                        <span> {description.description}</span>

                    </TableCell>

                    <TableCell align='center'>
                        <span> {promo.general.amount}%</span>
                    </TableCell>

                </TableRow>

                {/* <TableRow className="interligne">
        </TableRow> */}
            </>
        );
    }


}

export default RowPromo