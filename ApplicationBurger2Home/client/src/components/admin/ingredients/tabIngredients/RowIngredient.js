import React, { useState, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import "./RowIngredient.css";
import axios from 'axios';
import { Buffer } from "buffer";
import { valueToPercent } from '@mui/base';

const RowIngredient = ({ ingredient, setIngredientSelected }) => {

  const set = (ing) =>{
    setIngredientSelected({id:ing.ingredientId})
  }
  return (
    <>

      <TableRow  hover >

        <TableCell align='left' onClick={() => set(ingredient) }>
          <span> {ingredient.name}</span>
        </TableCell>

      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </>
  );


}

export default RowIngredient