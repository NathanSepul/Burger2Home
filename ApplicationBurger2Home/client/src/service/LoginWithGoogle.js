import React from 'react';
import { useGoogleLogin} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { open } from '../redux/snackBarSlice.js';

import { login } from '../redux/userSlice.js';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import "./Google.css";
export const LoginWithGoogle = () => {
    
    const dispatch = useDispatch()
    const user = {provider:"Google",  firstName:"", lastName:"", email:""}
    const openSnack = {msg:"Connexion réussie avec google", severity:"success"}

    const SuccesGoogle = (response) => {
        console.log(response)
        user.email = response.email;
        user.birthday = "01/07/1998";
        dispatch(open(openSnack));
        dispatch(login(user));
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: Resonse => { SuccesGoogle(Resonse)},
        onError: () => console.log('Login Failed'),
        cookiePolicy:'same-origin-allow-popups',
        flow:"auth-code"
    });

    return (
        <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
            <FcGoogle size="3em" />
        </button>
    )
}

export default LoginWithGoogle;