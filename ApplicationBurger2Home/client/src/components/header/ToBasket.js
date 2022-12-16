import React from "react"
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";


const ToBasket = () => {
    const basketQuanttity = useSelector(state => state.basket.quantity)

    return (
        <Link to="/basket" className="monPanier">
            <Badge badgeContent={basketQuanttity} color="primary">
                <ShoppingCartIcon fontSize="large" />
            </Badge>
        </Link>
    );
}

export default ToBasket