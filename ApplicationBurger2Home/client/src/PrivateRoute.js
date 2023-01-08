import React from "react";
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Connection from "./components/login/Connection.js"
import Home from "./components/home/Home.js";
// import Inscription from "./components/login/Inscription.js"

import { useDispatch } from 'react-redux';
import { open } from './redux/snackBarSlice.js';




export const PrivateRouteCompte = () => {
    const user = useSelector(state => state.user)
    
    return (
        user.isConnected ? <Outlet /> : <Connection />
    );
}

export const PrivateRouteConnection = () => {
    const user = useSelector(state => state.user)

    return (
        user.isConnected ? <Home /> : <Outlet />
    );
}

export const PrivateRouteInscription = () => {
    const user = useSelector(state => state.user)

    return (
        user.isConnected ? <Home /> : <Outlet />
    );
}

export const PrivateRouteMarketing = () => {
    const user = useSelector(state => state.user)
    const openSnack = { msg: "La page que vous essayé de joindre n'existe pas", severity: "warning" }
    const dispatch = useDispatch()

    if(user.role === "marketing"){
        return <Outlet />
    }
    else{
        dispatch(open(openSnack))
        return <Home/>
    }
}

export const PrivateRouteAdmin = () => {
    const user = useSelector(state => state.user)
    const openSnack = { msg: "La page que vous essayé de joindre n'existe pas", severity: "warning" }
    const dispatch = useDispatch()

    if(user.role === "admin"){
        return <Outlet />
    }
    else{
        dispatch(open(openSnack))
        return <Home/>
    }
}

export const PrivateRouteEmploye = () => {
    const user = useSelector(state => state.user)
    const openSnack = { msg: "La page que vous essayé de joindre n'existe pas", severity: "warning" }
    const dispatch = useDispatch()

    if(user.role === "employee"){
        return <Outlet />
    }
    else{
        dispatch(open(openSnack))
        return <Home/>
    }
}