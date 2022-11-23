import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import "./ProductMiniature.css"

const ProductMiniature = ({product}) => {

    return (
            <Card className="product" sx={{ minWidth:250, width:250 }}>
                <CardMedia
                    component="img"
                    height="250"
                    src={product.pictureUrl}
                    alt={product.name}
                />

                <CardContent className="contentCard">
                    <div>{product.name}</div>
                    <div>{product.price} €</div>
                    <div>
                        <IconButton aria-label="share">
                            <AddShoppingCartRoundedIcon fontSize="large"/>
                        </IconButton>
                     </div>
                </CardContent>
               
            </Card>
    );
}

export default ProductMiniature;

