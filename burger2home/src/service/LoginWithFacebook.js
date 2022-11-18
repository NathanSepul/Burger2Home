import React from 'react';
import FacebookLogin from 'react-facebook-login';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import "./Facebook.css";
const LoginWithFacebook = () => {
  
  const responseFacebook=(response) => {
    console.log(response);
  }

    return (
      <FacebookLogin
        cssClass="facebook"
        appId="494868705942734"
        autoLoad={false}
        fields="name,email,picture"
        size="small"
        icon={<FacebookRoundedIcon fontSize="large" id="tt"/>}
        textButton=""
        scope="public_profile"
        callback={(e)=>responseFacebook(e)}
      />

    )
}

export default LoginWithFacebook;