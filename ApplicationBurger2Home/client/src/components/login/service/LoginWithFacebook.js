import React from 'react';
import FacebookLogin from 'react-facebook-login';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useDispatch } from 'react-redux';
import { login,logout } from '../../../redux/userSlice.js';
import "./Facebook.css";

const LoginWithFacebook = () => {
  const dispatch = useDispatch()
  const user = {provider:"Facebook",  firstName:"", lastName:"", email:""}
  const responseFacebook=(response) => {
    if (response.accessToken) {
      console.log(response)
      user.email = response.email
      dispatch(login(user));
      
    } else {
      console.log(response)
      dispatch(logout());
    }
  }

    return (
      
      <FacebookLogin
        cssClass="facebook"
        appId="494868705942734"
        autoLoad={false}
        fields="name,email,picture"
        size="small"
        icon={<FacebookRoundedIcon fontSize="large" />}
        textButton=""
        scope="public_profile"
        callback={(e)=>responseFacebook(e)}
      />

    )
}

export default LoginWithFacebook;