import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from "@mui/material";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import "./Google.css";

const LoginWithGoogle = () => {

    const dispatch = useDispatch()

    const loginWithGoogle = useGoogleLogin({
        onSuccess: credentialResponse => { console.log(credentialResponse); dispatch(login()) },
        onError: () => console.log('Login Failed')
    });

    return (
        <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
            <GoogleIcon id="ss" fontSize="large" />
        </button>
    )
    
}

export default LoginWithGoogle;