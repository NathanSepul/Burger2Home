import React,{useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useDispatch } from 'react-redux';
import { updateQuantity,removeFromBasket } from '../../../redux/basketSlice.js';

import "./RowBasket.css";

const RowBasket = ({ basketLine, indexBl }) => {

  const [newValue, setNewValue] = useState({index:indexBl, quantity:basketLine.quantity })
  
  let min = 1;
  let max = 50;
  const dispatch = useDispatch();

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
    dispatch(removeFromBasket(indexBl))
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

      <TableRow sx={{ backgroundColor: "#" }}>

        <TableCell>
          <div className="itemProduct">
            <img className="imgBasket" src={basketLine.url} alt={basketLine.url} />
            <div>
              <div> {basketLine.name}</div>
              {basketLine.currentDiscount !== 0 &&(
                <div>hors promo</div>
              )}
              
            </div>
          </div>
        </TableCell>

        <TableCell align="left">
          <div>
            <OutlinedInput
              className="addButtonBasket"
              sx={{ p: "1px", m:"0", width:"150px"}}
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

        <TableCell align="center"> {Math.round(basketLine.actualPrice*100)/100}€</TableCell>
        
      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </React.Fragment>
  );


}

export default RowBasket