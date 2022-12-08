import React, { useState } from 'react';
import PasswordField from '../password/PasswordField.js';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import TextField from '@mui/material/TextField';
import validator from "validator";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice.js';
import {open} from '../../redux/snackBarSlice.js';


import LoginWithFacebook from '../../service/LoginWithFacebook.js';
import LoginWithGoogle from '../../service/LoginWithGoogle.js';
import "./Connection.css";

const Connection = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const user = {provider:"local",  name:"", email:"", birthday:""}
    const openSnack = {msg:"", severity:""}
    const dispatch = useDispatch()

    const { t } = useTranslation();

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const validationFormulaire = (event) => {

        if (!validator.isEmail(email)) {
            event.preventDefault();
            openSnack.msg=t('connexion.errorEmail');
            openSnack.severity="warning";
            dispatch(open(openSnack))
        }
        else{
            //ici on fait le lien avec le back quand il y en aura un
            user.name = "nathan sépul";
            user.email = email;
            user.birthday = "01/07/1998";
            dispatch(login(user));
            openSnack.msg="Connexion réussie avec google";
            openSnack.severity="success";
            dispatch(open(openSnack));
        }
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
                    <TextField required id="email" label={t('connexion.email')} variant="outlined" value={email} onChange={handleChangeEmail} />
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
                    <LoginWithGoogle />
                    <LoginWithFacebook/>
                </div>
            </div>
            <br />
        </main>
    );
}

export default Connection;