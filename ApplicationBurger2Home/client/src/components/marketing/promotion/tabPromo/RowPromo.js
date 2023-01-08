import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';;

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
// eslint-disable-next-line react-hooks/exhaustive-deps
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