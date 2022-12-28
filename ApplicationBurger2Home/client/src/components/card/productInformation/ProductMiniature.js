import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { addToBasketRedux } from '../../../redux/basketSlice.js';
import {addToBasketUser} from '../../../redux/userSlice.js'
import { useDispatch,useSelector } from 'react-redux';
import { Badge } from "@mui/material";
import ModalProduct from "./ModalProduct.js";
import "./ProductMiniature.css"

const ProductMiniature = ({ product, hadExtra }) => {

    let userConnected = useSelector(state => state.user.isConnected);

    const dispatch = useDispatch();

    const badgeStyle = {
        "& .MuiBadge-badge": {
            width: 40,
            height: 40,
            borderRadius: '50%',
            fontSize: "0.9rem",
        }
    }

    const addToBasket = () => {

        const basketLine = {
            productId: product.id,
            quantity: 1,
        };

        userConnected  ? dispatch(addToBasketUser(basketLine)) :  dispatch(addToBasketRedux(basketLine));
    }

    let content = () => {
        return (
            <Card className="product" sx={{ minWidth: 250, width: 250, background: "transparent", boxShadow: "none" }}>
                {!product.available && (
                    <span className="recommendation">Victime de son succes</span>
                )}

                <ModalProduct product={product} hadExtra={hadExtra} />

                <CardContent className="contentCard">
                    <div>{product.name}</div>

                    {product.currentDiscount === null ?
                        <div className="priceMiniature">{Math.round(product.currentPrice * 100) / 100}€</div>
                        :
                        <div className="priceMiniature">
                            <div className="priceMiniaturePromo">{Math.round(product.currentPrice * 100) / 100}€</div>
                            <div className="priceMiniatureDiscount">{Math.round(product.actualPrice * 100) / 100}€</div>
                        </div>
                    }
                    <div>
                        <IconButton onClick={addToBasket} disabled={!product.available}>
                            <AddShoppingCartRoundedIcon fontSize="large" />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        );
    }


    return (
        <>
            {product.currentDiscount !== null ?
                <>
                    <Badge badgeContent={"-" + product.currentDiscount + "%"} color="primary" sx={badgeStyle} className="badgePromo">
                        {content()}
                    </Badge>
                </>

                :
                <>
                    {content()}
                </>
            }
        </>

    );

}

export default ProductMiniature;

