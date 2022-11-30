import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ModalProduct from "./ModalProduct.js"
import "./ProductMiniature.css"

const ProductMiniature = ({product,hadExtra}) => {

    return (
            <Card className="product" sx={{ minWidth:250, width:250, background:"transparent", boxShadow: "none"}}>

                <ModalProduct product={product} hadExtra={hadExtra}/>

                <CardContent className="contentCard">
                    <div>{product.name}</div>
                    <div>{product.price} €</div>
                    <div>
                        <IconButton>
                            <AddShoppingCartRoundedIcon fontSize="large"/>
                        </IconButton>
                     </div>
                </CardContent>
               
            </Card>
    );
}

export default ProductMiniature;

