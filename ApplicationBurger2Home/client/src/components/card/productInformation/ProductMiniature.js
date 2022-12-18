import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { addToBasketRedux } from '../../../redux/basketSlice.js';
import { useDispatch } from 'react-redux';
import { Badge } from "@mui/material";
import ModalProduct from "./ModalProduct.js";
import "./ProductMiniature.css"

const ProductMiniature = ({ product, hadExtra }) => {


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

        const localProduct = {
            id: product.id,
            name: product.name,
            quantity: 1,
            currentPrice: Math.round(product.currentPrice * 100) / 100,
            currentDiscount: product.currentDiscount,
            actualPrice: Math.round(product.actualPrice * 100) / 100,
            url: product.imageUrl
        };

        dispatch(addToBasketRedux(localProduct));
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

                    {product.currentDiscount === 0 ?
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
            {product.currentDiscount !== 0 ?
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

