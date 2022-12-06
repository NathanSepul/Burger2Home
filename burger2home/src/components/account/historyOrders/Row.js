import React from 'react';

import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import DetailTab from "./DetailTab.js";

const Row = ({ order }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { backgroundColor: "#DEDEDE", } }}>

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


        <TableCell component="th" scope="row">
          {order.date}
        </TableCell>


        <TableCell>{order.total}</TableCell>
      </TableRow>

      {/* tableau secondaire */}
      <DetailTab orderLines={order.orderLines} open={open} />

    </React.Fragment>
  );


}

export default Row