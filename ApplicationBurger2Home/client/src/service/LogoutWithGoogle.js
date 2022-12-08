import React from "react"
import {googleLogout} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice.js';
import "./Google.css"
const LogoutWithGoogle = ()=>{
  const dispatch = useDispatch()

  const logoutGoogle =()=>{
    googleLogout();
    dispatch(logout());
  }
  return (
    <div className="divButton">
      <button variant="contained" className="disconnectButton" type="" onClick={() => {logoutGoogle()}}>Déconnexion</button>
    </div>
  )
}

export default  LogoutWithGoogle
