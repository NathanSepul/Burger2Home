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
import { login, loginBasket } from '../../redux/userSlice.js';
import { open } from '../../redux/snackBarSlice.js';


import LoginWithFacebook from './service/LoginWithFacebook.js';
import LoginWithGoogle from './service/LoginWithGoogle.js';

import axios from 'axios';
import "./Connection.css";

const Connection = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const user = { provider: "local", email: "", lastName: "", firstName: "", role: "", id:null }
    const basketInformation = { basket:null,size:0}
    const openSnack = { msg: "", severity: "" }
    const dispatch = useDispatch()

    const { t } = useTranslation();

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const validationFormulaire = (event) => {

        if (!validator.isEmail(email)) {
            openSnack.msg = t('connexion.errorEmail');
            openSnack.severity = "warning";
            dispatch(open(openSnack))
        }
        else {
            openSnack.msg = "Tentative de connexion en cours";
            openSnack.severity = "info";
            dispatch(open(openSnack));
const id = 4
            axios.get(`/users/${id}`)
                .then((res) => {
                    console.log(res);
                    user.id= res.data.id;
                    user.email = res.data.email;
                    user.lastName = res.data.lastname;
                    user.firstName = res.data.firstname
                    user.role = res.data.role.name;
                    user.birthday = "01/07/1998";
                    console.log(user);

                    dispatch(login(user));

                    openSnack.msg = "Connexion réussie";
                    openSnack.severity = "success";
                    dispatch(open(openSnack));

                    return axios.get(`/users/${id}/basket`)
                })
                .then((res)=>{
                    basketInformation.basket = res.data;
                    basketInformation.size = res.data.basketLines.length
                    dispatch(loginBasket(basketInformation))
                })
                .catch(() => {
                    openSnack.msg = "La connection a échoué";
                    openSnack.severity = "warning";
                    dispatch(open(openSnack))

                })
        }

        event.preventDefault();
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
                    <br />
                    <TextField required id="email" label={t('connexion.email')} variant="outlined" value={email} onChange={handleChangeEmail} />
                    <br /><br />
                    <PasswordField id="pwd" disable={false} pwd={pwd} setPwd={setPwd} labelInput={t('connexion.pwd')} />
                    <br />
                    <Button id="buttonConnection" variant="contained" type="submit">{t('connexion.continuer')}</Button>
                    <div id="toMdpOublie">
                        <Link to="/">{t('connexion.mdpOublie')}</Link>
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
                    <LoginWithFacebook />
                </div>
            </div>
            <br />
        </main>
    );
}

export default Connection;