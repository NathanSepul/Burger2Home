import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin,GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import "./Google.css";

const LoginWithGoogle = () => {
    
    const dispatch = useDispatch()

    const loginWithGoogle = useGoogleLogin({
        onSuccess: credentialResponse => { console.log(credentialResponse); dispatch(login()) },
        onError: () => console.log('Login Failed'),
        flow: 'auth-code',
        prompt:"none"
    });

    return (
        <button  type="button" id="google" aria-label="connectionGoogle" onClick={() => {loginWithGoogle()}}>
            <GoogleIcon id="ss" fontSize="large" />
        </button>
    )


// const handleLoginSuccess = (credentialResponse) => {
//     dispatch(login())
//     console.log(credentialResponse);
// }

// const handleLoginError = (credentialResponse) => {
//     dispatch(login())
//     console.log(credentialResponse);
// }
//     return (
        
//         // <button  type="button" id="google" aria-label="connectionGoogle">
//         //      <GoogleIcon fontSize="large" />
//         // </button>
//         <GoogleLogin
//             onSuccess={R => handleLoginSuccess(R)}
//             onError={R => handleLoginError(R)}
//             type="standard"
//             text=' '
//             size="large"
//             shape="circle"
//             logo_alignment="center"
//             ux_mode="popup"
//             className="google"
//             context="signin"
//             cookiePolicy={'single_host_origin'}
//             style={{marginTop:"100px"}}
            
//             // isSignedIn={true}
//             // useOneTap
//         />
//     );
    
}

export default LoginWithGoogle;