import React from 'react';
import { useGoogleLogin,GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import "./Google.css";

export const LoginWithGoogle = () => {
    
    const dispatch = useDispatch()
    const user = {provider:"Google",  name:"", email:""}

    const SuccesGoogle = (response) => {
        console.log(response)
        user.name = response.name;
        user.email = response.email
        dispatch(login(user))
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: Resonse => { SuccesGoogle(Resonse)},
        onError: () => console.log('Login Failed'),
       
        flow: 'auth-code',
    });

    return (
        <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
            <FcGoogle size="3em" />
        </button>
    )

    


}

export default LoginWithGoogle;