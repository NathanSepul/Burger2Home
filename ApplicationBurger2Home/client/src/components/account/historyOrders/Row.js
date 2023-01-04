import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DetailTab from "./DetailTab.js";
import axios from 'axios';
import moment from 'moment';
const Row = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0)

  const dateTime = moment(order.orderDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY à HH:mm');
  // dateTime = dateTime.toLocaleDateString()

  useEffect(() => {
    setTotal(0);
    let temp = 0
    order.orderLines.forEach(ol => {

      if (ol.promotionId !== null) {
        const request1 = axios.get(`/prices/${ol.priceId}`);
        const request2 = axios.get(`/promotions/${ol.promotionId}`);

        axios.all([request1, request2])
          .then(
            axios.spread((...res) => {
              let tempRound = Math.round(res[0].data.amount * res[1].data.amount) / 100
              temp = (tempRound * ol.amount) + temp
              setTotal(temp);
            })
          )
          .catch(e => console.log(e))
      }
      else {
        axios.get(`/prices/${ol.priceId}`)
          .then(res => {
            temp = (res.data.amount * ol.amount) + temp
            setTotal(temp);
          })
          .catch(e => console.log(e))
      }
    })
  }, [])



  const statusCorrespondance = () => {
    if (order.status === "waiting_for_payment") {
      return "En attente de payement"
    }
    else if (order.status === "payment_confirmed") {
      return (
        <>
          <p>Payement confirmé</p>
          <p>Livraison en cours</p>
        </>)
    }
    else {
      return "Livré"
    }
  }

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { backgroundColor: "#DEDEDE" } }}>

        {/* tableau primaire */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {/* Details */}
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>


        <TableCell component="th" scope="row" align='left'>
          {dateTime}
        </TableCell>


        <TableCell>{total}&nbsp;€</TableCell>

        <TableCell>{statusCorrespondance()}</TableCell>
      </TableRow>

      {/* tableau secondaire */}
      <DetailTab orderLines={order.orderLines} open={open} />

    </React.Fragment>
  );


}

export default Row