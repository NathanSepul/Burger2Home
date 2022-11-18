import React from "react";
import { useSelector} from 'react-redux';
import {Outlet} from "react-router-dom";
import Connection from "./components/login/Connection.js"
import Account from "./components/compte/Account.js"



export const PrivateRouteCompte = () => {
    const user = useSelector(state => state.userConnected)

    return(
        user.isConnected ? <Outlet /> : <Connection/>
    );
}

export const PrivateRouteConnection = () => {
    const user = useSelector(state => state.userConnected)

    return(
        user.isConnected ? <Account/> : <Outlet /> 
    );
}
 