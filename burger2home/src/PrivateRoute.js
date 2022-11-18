import React from "react";
import { useSelector} from 'react-redux';
import {Outlet} from "react-router-dom";
import Connection from "./composant/login/Connection.js"
import Compte from "./composant/compte/Compte.js"



export const PrivateRouteCompte = () => {
    const user = useSelector(state => state.userConnected)

    return(
        user.isConnected ? <Outlet /> : <Connection/>
    );
}

export const PrivateRouteConnection = () => {
    const user = useSelector(state => state.userConnected)

    return(
        user.isConnected ? <Compte/> : <Outlet /> 
    );
}
 