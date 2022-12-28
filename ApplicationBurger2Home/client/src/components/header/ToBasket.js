import React from "react"
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";


const ToBasket = () => {

    let userConnected = useSelector(state => state.user.isConnected);
    let basketQuantityConnected = useSelector(state => state.user.basketSize) ;
    let basketQuantityDisconnected= useSelector(state => state.basket.quantity)

    

    return (
        <Link to="/basket" className="monPanier">
            <Badge badgeContent={userConnected ? basketQuantityConnected : basketQuantityDisconnected} color="primary">
                <ShoppingCartIcon fontSize="large" />
            </Badge>
        </Link>
    );
}

export default ToBasket