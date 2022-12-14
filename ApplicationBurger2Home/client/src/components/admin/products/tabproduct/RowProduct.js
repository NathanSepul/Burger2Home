import React, { useState, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import "./RowProduct.css";
import axios from 'axios';
import { Buffer } from "buffer";
import { useTranslation } from 'react-i18next';

const RowProduct = ({ product, setProductSelected }) => {

  const [localImg, setLocalImg] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`/products/${product.id}/image`, { responseType: 'arraybuffer' })
      .then(res => {
        const imageBuffer = Buffer.from(res.data, 'binary');
        const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
        setLocalImg(imageString)
      })
      .catch(e => {
        console.error(e);
      })   
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[product.imageName])
  
  return (
    <>

      <TableRow sx={{ backgroundColor: "#" }}  hover >

        <TableCell align='left' onClick={() => { setProductSelected(product) }} className="buttonTab">
          <div className="itemProduct">
            <img className="imgBasket" src={localImg} alt={product.imageName} />
          </div>
        </TableCell>

        <TableCell align='left'>
          <span> {product.name}</span>
        </TableCell>

        {/* <TableCell align='left'>
          <span> {product.description}</span>
        </TableCell> */}

        <TableCell align='left'>
          <span> {product.currentPrice}</span>
        </TableCell>

        <TableCell align='left'>
          <span> {product.onMenu ? t('gestionProduit.form.disponible') : t('gestionProduit.form.indisponible')} </span>
        </TableCell>



      </TableRow>

      {/* <TableRow className="interligne">
      </TableRow> */}
    </>
  );


}

export default RowProduct