import React,{useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../redux/basketSlice.js';

import "./RowBasket.css";

const RowBasket = ({ basketLine }) => {

  const [newValue, setNewValue] = useState({index:basketLine.idBl, quantity:basketLine.quantity })
  
  let min = 1;
  let max = 50;
  const dispatch = useDispatch();
  const total = basketLine.quantity * basketLine.price;

  const handleSetQunatity = event => {
    if ( parseInt(event.target.value) <= max &&  parseInt(event.target.value) >= min) {
        setNewValue({...newValue, quantity:  parseInt(event.target.value)})
    }
}

  const onlyNumber = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const remove = () => {
    // dispatch(updateQuantity())
  }

  const add = () => {
    if(parseInt(newValue.quantity) + 1 <= max ){
      setNewValue({...newValue, quantity: parseInt(newValue.quantity) + 1})
    }
  }

  useEffect(() => {
    dispatch(updateQuantity(newValue))

}, [newValue,dispatch])


  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { backgroundColor: "#DEDEDE", } }}>

        <TableCell component="th" scope="row">
          <div className="itemProduct">
            <img className="imgBasket" src={basketLine.url} alt={basketLine.url} />
            <span> {basketLine.name}</span>
          </div>
        </TableCell>

        <TableCell component="th" scope="row">
          <div>
            <OutlinedInput
              className="addButtonBasket"
              sx={{ p: "1px" }}
              value={basketLine.quantity}
              onKeyPress={onlyNumber}
              onChange={handleSetQunatity}
              startAdornment={
                <InputAdornment position="start" >
                  <IconButton onClick={remove} sx={{ width: "40px" }} >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                </InputAdornment>
              }

              endAdornment={
                <IconButton onClick={add} sx={{ width: "40px" }}>
                  <AddCircleRoundedIcon sx={{ color: "black" }} />
                </IconButton>
              }
            />
          </div>


        </TableCell>

        <TableCell component="th" scope="row"> {total} </TableCell>

      </TableRow>

    </React.Fragment>
  );


}

export default RowBasket