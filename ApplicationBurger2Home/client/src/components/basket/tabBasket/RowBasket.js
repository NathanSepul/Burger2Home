import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Buffer } from "buffer";

import { useDispatch, useSelector  } from 'react-redux';

import {removeFromBasket } from '../../../redux/basketSlice.js';
import { removeBasketLine, updateQt} from '../../../redux/userSlice.js';

import axios from 'axios';
import "./RowBasket.css";

const RowBasket = ({ value, setList, list, setBill, bill }) => {

  let basket = useSelector(state => state.user.basket);
  let isConnected = useSelector(state => state.user.isConnected)
  const indexBl = basket.basketLines.findIndex(obj => obj.id === value.basketLine.id);

  const dispatch = useDispatch();

  let min = 1;
  let max = 50;
  const [newValue, setNewValue] = useState({ index: indexBl, newQuantity: value.basketLine.amount })
  const [localImg, setLocalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`/products/${value.product.id}/image`, { responseType: 'arraybuffer' })
      .then(res => {
        const imageBuffer = Buffer.from(res.data, 'binary');
        const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
        setLocalImg(imageString)
        setIsLoading(false)
      })
      .catch(e => console.log(e));

  }, [value.product.id])


  useEffect(() => {

    if (!isLoading) {
      console.log(newValue)

      const updatedItems = list.map(item => {
        if (item.basketLine.id === value.basketLine.id) {

          return { ...item, basketLine: { ...value.basketLine, amount: newValue.newQuantity } };
        }
        return item;
      });

      let newBill = 0
      updatedItems.forEach(e => {
        newBill = newBill + (e.basketLine.amount * Math.round(e.product.actualPrice * 100) / 100)
      })


      setBill(newBill);
      setList(updatedItems)
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue.newQuantity])

  const handleSetQunatity = event => {
    if (parseInt(event.target.value) <= max && parseInt(event.target.value) >= min) {
      setNewValue({ ...newValue, newQuantity: parseInt(event.target.value) })
    }
  }

  const add = () => {
    if (parseInt(newValue.newQuantity) + 1 <= max) {
      setNewValue({ ...newValue, newQuantity: parseInt(newValue.newQuantity) + 1 })
    }
  }

  const onlyNumber = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const remove = () => {

    let newBill = bill
    newBill = newBill - (value.basketLine.amount * Math.round(value.product.actualPrice * 100) / 100)
    setBill(newBill)
    let i = list.findIndex(obj => obj.basketLine.id === value.basketLine.id);
    let tempL = list
    tempL.splice(i, 1)
    setList(tempL)

    isConnected ? dispatch(removeBasketLine(indexBl)) : dispatch(removeFromBasket(indexBl))
  }


  


  if (isLoading) {
    return <></>
  }

  return (
    <React.Fragment>

      <TableRow sx={{ backgroundColor: "#" }}>

        <TableCell>
          <div className="itemProduct">
            <img className="imgBasket" src={localImg} alt={value.product.name} />
            <div>
              <div> {value.product.name}</div>
              {value.product.currentDiscount !== null && (
                <div className='infBas'>
                  <div>Prix hors promo</div>
                  <div>{value.product.currentPrice}</div>
                </div>
              )}

            </div>
          </div>
        </TableCell>

        <TableCell align="left">
          <div>
            <OutlinedInput
              className="addButtonBasket"
              sx={{ p: "1px", m: "0", width: "150px" }}
              value={value.basketLine.amount}
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

        <TableCell align="center"> {Math.round(value.product.actualPrice * 100) / 100}€</TableCell>

      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </React.Fragment>
  );


}

export default RowBasket