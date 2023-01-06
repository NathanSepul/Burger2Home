import React, { useState, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import "./RowRoles.css";
import axios from 'axios';
import { Buffer } from "buffer";
import { valueToPercent } from '@mui/base';

const RowRoles = ({ user, setUserSelected }) => {

  const set = () =>{
    setUserSelected(user)
  }
  return (
    <>

      <TableRow  hover >

      <TableCell align='left' onClick={() => set() }>
          <span> {user.email}</span>
        </TableCell>
        <TableCell align='left' onClick={() => set() }>
          <span> {user.username}</span>
        </TableCell>
        <TableCell align='left' onClick={() => set() }>
          <span> {user.role.name}</span>
        </TableCell>

      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </>
  );


}

export default RowRoles