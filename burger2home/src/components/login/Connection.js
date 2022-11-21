import React, { useState } from 'react';
import PasswordField from '../password/PasswordField.js';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice.js';
import TextField from '@mui/material/TextField';
import validator from "validator";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import LoginWithFacebook from '../../service/LoginWithFacebook.js';
import LoginWithGoogle from '../../service/LoginWithGoogle.js';

import "./Connection.css";

const Connection = () => {
    const [email, setEmail] = useState("");
    const [hasErroEmail, setHasErrorEmail] = useState(false)
    const [pwd, setPwd] = useState("");

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const erroEmail = () => {
        if (hasErroEmail)
            return t('connexion.errorEmail');

        return ""
    }
    const validationFormulaire = (event) => {

        if (!validator.isEmail(email)) {
            event.preventDefault();
            setHasErrorEmail(true)
        }
        else {
            setHasErrorEmail(false)
        }

        dispatch(login())
    }

  

    return (
        <main>
            <title>Burger2Home | {t('connexion.connexion')}</title>
            <h1>Burger2Home</h1>
            <div className="connectionForm">
                <Box
                    onSubmit={validationFormulaire}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: "auto", width: "75%" },
                    }}
                >
                    <h2>{t('connexion.connexion')}</h2>
                    <br/>
                    <TextField error={hasErroEmail} helperText={erroEmail()} required id="email" label={t('connexion.email')} variant="outlined" value={email} onChange={handleChangeEmail} />
                    <br/><br/>
                    <PasswordField id="pwd" disable={false} pwd={pwd} setPwd={setPwd} labelInput={t('connexion.pwd')} />
                    <br/>
                    <Button id="buttonConnection" variant="contained" type="submit">{t('connexion.continuer')}</Button>
                    
                    <div id="toMdpOublie">
                        <Link  to="/">{t('connexion.mdpOublie')}</Link>
                    </div>

                    <div id="toInscription">
                        <Link to="/inscription">{t('connexion.inscription')}</Link>
                    </div>
                    
                </Box>
                <Divider />
                <br />
                <p>{t('connexion.autreConnexion')}</p>
                <div id="connectionNetwork">
                    <LoginWithGoogle/>
                    <LoginWithFacebook/>
                </div>
            </div>
            <br />
        </main>
    );
}

export default Connection;