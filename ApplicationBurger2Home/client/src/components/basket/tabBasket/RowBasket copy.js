import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Buffer } from "buffer";

import { useDispatch } from 'react-redux';

import { updateQuantity, removeFromBasket } from '../../../redux/basketSlice.js';
import { updateQt, removeBasketLine } from '../../../redux/userSlice.js';

import "./RowBasket.css";
import axios from 'axios';

const RowBasket = ({ basketLine, indexBl, isConnected, listAmount, setListAmount }) => {


  const dispatch = useDispatch();

  let min = 1;
  let max = 50;

  const [newValue, setNewValue] = useState({ index: indexBl, newQuantity: basketLine.amount })
  const [product, setProduct] = useState(null)
  const [localImg, setLocalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    axios.get(`products/summaries/${basketLine.productId}?language=EN`)
      .then(res => {
        setProduct(res.data)

        let tempList = listAmount;
        let index = tempList.tabVa.findIndex((el) => el.idBL === basketLine.id)
        
        if(index === -1){
          tempList.tabVa.push({price: res.data.actualPrice, qt: basketLine.amount, idBL: basketLine.id })
        }
        else{
          tempList.tabVa[index] = {price: res.data.actualPrice, qt: basketLine.amount, idBL: basketLine.id }
        }
        tempList.use = tempList.use + 1
        setListAmount(tempList)

        return axios.get(`/products/${basketLine.productId}/image`, { responseType: 'arraybuffer' })
      })
      .then(res => {
        const imageBuffer = Buffer.from(res.data, 'binary');
        const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
        setLocalImg(imageString)
        setIsLoading(false)
      })
      .catch(e => console.log(e));

  }, [basketLine.productId])

  useEffect(() => {

    if (!isLoading) {
      isConnected ? dispatch(updateQt(newValue)) : dispatch(updateQuantity(newValue))
      
      let tempList = listAmount;
      
      let index = tempList.tabVa.findIndex((el) => el.idBL === basketLine.id)
     
      if(index === -1){
        tempList.tabVa.push({ price: product.actualPrice, qt: newValue.newQuantity, idBL: basketLine.id })
      }
      else{
        tempList.tabVa[index] = {price: product.actualPrice, qt: newValue.newQuantity, idBL: basketLine.id }
      }
      tempList.use = tempList.use + 1
    
      setListAmount(tempList)
    }

  }, [newValue.newQuantity])

  const handleSetQunatity = event => {
    if (parseInt(event.target.value) <= max && parseInt(event.target.value) >= min) {
      setNewValue({ ...newValue, newQuantity: parseInt(event.target.value) })
    }
  }

  const onlyNumber = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const remove = () => {
    isConnected ? dispatch(removeBasketLine(indexBl)) : dispatch(removeFromBasket(indexBl))
  }


  const add = () => {
    if (parseInt(newValue.newQuantity) + 1 <= max) {
      setNewValue({ ...newValue, newQuantity: parseInt(newValue.newQuantity) + 1 })
    }
  }


  if (isLoading) {
    return <></>
  }

  return (
    <React.Fragment>

      <TableRow sx={{ backgroundColor: "#" }}>

        <TableCell>
          <div className="itemProduct">
            <img className="imgBasket" src={localImg} alt={product.name} />
            <div>
              <div> {product.name}</div>
              {product.currentDiscount !== null && (
                <>
                  <div>Prix hors promo</div>
                  <div>{product.currentPrice}</div>
                </>
              )}

            </div>
          </div>
        </TableCell>

        <TableCell align="left">
          <div>
            <OutlinedInput
              className="addButtonBasket"
              sx={{ p: "1px", m: "0", width: "150px" }}
              value={basketLine.amount}
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

        <TableCell align="center"> {Math.round(product.actualPrice * 100) / 100}€</TableCell>

      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </React.Fragment>
  );


}

export default RowBasket