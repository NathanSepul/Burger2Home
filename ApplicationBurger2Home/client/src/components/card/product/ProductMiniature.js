import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import { addToBasketRedux } from '../../../redux/basketSlice.js';
import { useDispatch } from 'react-redux';

import ModalProduct from "./ModalProduct.js";
import "./ProductMiniature.css"

const ProductMiniature = ({product,hadExtra}) => {

    const dispatch = useDispatch();
    const addToBasket = () =>{

        const localProduct= {
            id:product.id,
            name:product.name, 
            quantity:1,
            price:product.actualPrice,
            url:product.imageUrl
        };
            
        dispatch(addToBasketRedux(localProduct));
    }

    return (
            <Card className="product" sx={{ minWidth:250, width:250, background:"transparent", boxShadow: "none"}}>

                <ModalProduct product={product} hadExtra={hadExtra}/>

                <CardContent className="contentCard">
                    <div>{product.name}</div>
                    <div>{product.actualPrice} €</div>
                    <div>
                        <IconButton onClick={addToBasket}>
                            <AddShoppingCartRoundedIcon fontSize="large" />
                        </IconButton>
                     </div>
                </CardContent>
               
            </Card>
    );
}

export default ProductMiniature;

