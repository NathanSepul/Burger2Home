import React,{useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { updateQuantity,removeFromBasket } from '../../../redux/basketSlice.js';

import "./RowProduct.css";

const RowProduct = ({ product, setProductSelected }) => {

  return (
    <React.Fragment>

      <TableRow sx={{ backgroundColor: "#" }} >

        <TableCell align='left' onClick={()=>{setProductSelected(product)}} className="buttonTab">
          <div className="itemProduct">
            <img className="imgBasket" src={product.imageUrl}alt={product.imageUrl} />
          </div>
        </TableCell>

        <TableCell align='left'>
            <span> {product.name}</span>
        </TableCell>

        <TableCell align='left'>
            <span> {product.description}</span>
        </TableCell>

        <TableCell align='left'>
            <span> {product.currentPrice}</span>
        </TableCell>

        <TableCell align='left'>
           <span> {product.onMenu ? "disponible" : "Indisponible"} </span>
        </TableCell>

        
        
      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </React.Fragment>
  );


}

export default RowProduct