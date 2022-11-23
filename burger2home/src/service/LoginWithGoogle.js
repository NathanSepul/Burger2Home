import React from 'react';
import { useGoogleLogin, GoogleLogin} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import "./Google.css";
import axios from "axios"
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
        cookiePolicy:'single_host_origin',
    });

    // const loginWithGoogle = useGoogleLogin({
    //     onSuccess: async respose => {
    //         try {
    //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //                 headers: {
    //                     "Authorization": `Bearer ${respose.access_token}`
    //                 }
    //             })

    //             console.log(res.data)
    //         } catch (err) {
    //             console.log(err)

    //         }

    //     }
    // });

    // return (
    //     <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
    //         <FcGoogle size="3em" />
    //     </button>
    // )

    return(
    <GoogleLogin
            onSuccess={response => {
                    SuccesGoogle(response)
                }}
            onError={() => {
                console.log('Login Failed');
                }}
            state_cookie_domain={'SameSite=Strict'}
            
            clientId="199826957034-6cvt4kjaulho32g6e9vgrkt8tvcs0p7v.apps.googleusercontent.com"
            type="icon"
            size='xl'
            // size="large"
            shape="circle"
        />       
    )

    


}

export default LoginWithGoogle;