import React, { useState, useEffect } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

import axios from "axios";

const RowDetail = ({ line }) => {

    const language = useSelector(state => state.language)
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (line.promotionId !== null) {
            const req1 = axios.get(`/products/${line.productId}/translations?language=${language.value}`)
            const req2 = axios.get(`/prices/${line.priceId}`)
            const req3 = axios.get(`/promotions/${line.promotionId}`);

            axios.all([req1, req2, req3])
                .then(
                    axios.spread((...res) => {
                        setProductName(res[0].data[0].name)
                        let temp = Math.round(res[1].data.amount * res[2].data.amount) / 100
                        setPrice(temp)
                    })
                )
                .catch(e => console.log(e))
        }
        else {
            axios.get(`/products/${line.productId}/translations?language=${language.value}`)
                .then(res => {
                    setProductName(res.data[0].name)
                    return axios.get(`/prices/${line.priceId}`)
                })
                .then(res => {
                    setPrice(res.data.amount)
                })
                .catch(e => console.log(e))
        }

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [line.id, language.value])


    return (
        <TableRow>
            <TableCell >{productName} </TableCell>
            <TableCell>{line.amount}</TableCell>
            <TableCell>{price}&nbsp;€</TableCell>
        </TableRow>);
}

export default RowDetail;