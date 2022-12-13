import React from "react";
import { useSelector} from 'react-redux';
import {Outlet} from "react-router-dom";
import Connection from "./components/login/Connection.js"
import Account from "./components/account/Account.js"
import Home from "./components/home/Home.js";
// import Inscription from "./components/login/Inscription.js"



export const PrivateRouteCompte = () => {
    const user = useSelector(state => state.user)

    return(
        user.isConnected ? <Outlet /> : <Connection/>
    );
}

export const PrivateRouteConnection = () => {
    const user = useSelector(state => state.user)

    return(
        user.isConnected ? <Home/> : <Outlet /> 
    );
}

export const PrivateRouteInscription = () => {
    const user = useSelector(state => state.user)

    return(
        user.isConnected ? <Home/> : <Outlet /> 
    );
}
 