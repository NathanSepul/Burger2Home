import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import "./RowAllergen.css";

const RowAllergen = ({ allergen, setAllergenSelected }) => {

  const set = (al) =>{
    setAllergenSelected({id:al.allergenId})
  }
  return (
    <>

      <TableRow  hover>

        <TableCell align='left'  onClick={() => set(allergen)  }>
          <span> {allergen.name}</span>
        </TableCell>

      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </>
  );


}

export default RowAllergen