import React from 'react';
import { useGoogleLogin,GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import "./Google.css";

export const LoginWithGoogle = () => {
    
    const dispatch = useDispatch()

    const loginWithGoogle = useGoogleLogin({
        onSuccess: credentialResponse => { console.log(credentialResponse); dispatch(login()) },
        onError: () => console.log('Login Failed'),
        flow: 'auth-code',
        prompt:"none"
    });

    return (
        <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
            <FcGoogle size="3em" />
        </button>
    )


}

export default LoginWithGoogle;