import React, { useState, useEffect, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import 'dayjs/locale/fr';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import validator from "validator";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';

import Loading from "../../loading/Loading.js"
import ModalChangePassword from '../../password/ModalChangePassword.js';
import LogoutWithGoogle from "../../login/service/LogoutWithGoogle.js"
import axios from 'axios';
import "./Informations.css";

const Informations = () => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const userRedux = useSelector(state => state.user);
    const [updateUser, setUpdateUser] = useState(userRedux);
    const [user, setUser] = useState({})

    // setUpdateUser(useSelector(state => state.user))
    const openSnack = {msg:"", severity:""};
    const dispatch = useDispatch();

    useEffect(()=>{

        setHasError(false);
        setIsLoading(true);

        axios(`/users/${userRedux.id}`)
        .then(res =>{
            setUser(res.data);
            setIsLoading(false);
        })
        .catch(e =>{
            console.log(e)
            setHasError(true);
        })
    },[userRedux.id])

    const validationFormulaire = (event) => {

        if (!validator.isEmail(user.email)) {
            openSnack.msg = t('connexion.errorEmail');
            openSnack.severity="warning";
            dispatch(open(openSnack))
        } 
        else{
            axios.put(`/users`,user)
            .then(res => {
                openSnack.msg = "Le compte a été mis à jours"
                openSnack.severity = "success"
                dispatch(open(openSnack))
            })
            .catch(e =>{
                console.log(e)
                openSnack.msg = "La modification a échouée";
                openSnack.severity="error";
                dispatch(open(openSnack))

            })
        }

        event.preventDefault();
    }

    if (hasError) {
        openSnack.msg="Les données n'ont pas pu être chargée";
        openSnack.severity="error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loading />;
    }


    return (
        <div id="Informations">

            <Box
                id="formInformation"
                onSubmit={validationFormulaire}
                component="form"
                sx={{
                    '& > :not(style)': { margin: "8px", width: "auto", minWidth: "30ch" },
                }}
            >
                <TextField id="champ1" label={t("compte.details.nom")} variant="outlined" defaultValue={user.firstname} InputProps={{ readOnly: true, }} />
                <TextField id="champ2" label={t("compte.details.prenom")} variant="outlined" defaultValue={user.lastname} InputProps={{ readOnly: true, }} />

                <TextField id="champ3" label={t("compte.details.email")} variant="outlined" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

                <br className='tampon' />


                <div id="champ5">
                    <ModalChangePassword user={user} setUpdateUser={setUser} />
                </div>

                <button variant="contained" id="champ10" onClick={e => validationFormulaire(e)}>{t("compte.details.enregistrer")}</button>
            </Box>
            <LogoutWithGoogle/>
        </div>
    );

}

export default Informations