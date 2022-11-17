import React, { useState } from 'react';
import PasswordField from '../composant/password/PasswordField.js';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice.js';
import TextField from '@mui/material/TextField';
import validator from "validator";
import Divider from '@mui/material/Divider';
import { IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {Link } from "react-router-dom";
import "./Connection.css";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';

const Connection = () => {
    const [email, setEmail] = useState("");
    const [hasErroEmail, setHasErrorEmail] = useState(false)
    const [pwd,setPwd] = useState("");

    const { t } = useTranslation();
    
    const dispatch = useDispatch()

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }
    
    const erroEmail = () => {
        if(hasErroEmail)
            return "Entrez un email valide";
        
        return ""
    }
    const validationFormulaire = (event) => {

        if (!validator.isEmail(email)) {
            event.preventDefault();
            setHasErrorEmail(true)
        }
        else{
            setHasErrorEmail(false)
        }

        dispatch(login())
    }

    const loginWithGoogle  = useGoogleLogin({
        onSuccess: credentialResponse => {console.log(credentialResponse); dispatch(login())},
        onError:() =>  console.log('Login Failed')
      });

      const responseFacebook = (response) => {
        console.log(response);
      }
   
    return (
        <main>
            <h1>Burger2Home</h1>
            <div className="connectionForm">
                <Box
                    onSubmit={validationFormulaire}
                    component="form"
                    
                    sx={{
                        '& > :not(style)': { m:"auto", width: "75%" },
                    }}
                >
                    <h2>{t('connexion.connexion')}</h2>
                    <br/>
                    <TextField error={hasErroEmail} helperText={erroEmail()} required id="email" label={t('connexion.email')} variant="outlined" value={email} onChange={handleChangeEmail}/>
                    <br/><br/>
                    <PasswordField id="pwd"disable={false} pwd={pwd} setPwd={setPwd} labelInput={t('connexion.pwd')}/>
                    <br/><br/>
                    <Button id="buttonConnection" variant="contained" type="submit">{t('connexion.continuer')}</Button>
                    <br/><br/>
                    <Link id="toInscription" to="/">{t('connexion.inscription')}</Link>
                    <br/><br/>
                </Box>
                <Divider />
                    <br/>
                    <p>{t('connexion.autreConnexion')}</p>
                    <div id="connectionNetwork">
                        <IconButton aria-label="connectionGoogle" onClick={()=>{loginWithGoogle()}}>
                            <GoogleIcon id="google" fontSize="large" />
                        </IconButton>

                        {/* <IconButton aria-label="ConnectionFacebook">
                            <FacebookRoundedIcon id="facebook" fontSize="large" />
                        </IconButton> */}
                    <FacebookLogin
                        appId="5956223724408730"
                        autoLoad= {false}
                        textButton=""
                        callback={responseFacebook}
                        icon={<FacebookRoundedIcon/>}
                        tag="button"
                        // language
                        render={renderProps => (
                            <IconButton aria-label="ConnectionFacebook" onClick={renderProps.onClick}/>
                          
                        )}
                    />
                    </div>
                
                
            </div>
          

            <br/>
        </main>
    );
}

export default Connection;