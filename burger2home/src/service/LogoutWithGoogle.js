import React from "react"
import {googleLogout} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice.js';

const LogoutWithGoogle = ()=>{
  const dispatch = useDispatch()

  const logoutGoogle =()=>{
    googleLogout();
    dispatch(logout());
  }
  return (
    <button onClick={() => {logoutGoogle()}}> yooo</button>
  )
}

export default  LogoutWithGoogle
