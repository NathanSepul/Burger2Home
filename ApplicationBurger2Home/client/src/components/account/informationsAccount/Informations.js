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

import Loding from "../../loding/Loding.js"
import ModalChangePassword from '../../password/ModalChangePassword.js';
import LogoutWithGoogle from "../../../service/LogoutWithGoogle.js"
import "./Informations.css";

const Informations = () => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const userRedux = useSelector(state => state.user);
    const [updateUser, setUser] = useState(userRedux);
   
    // setUser(useSelector(state => state.user))
    const openSnack = {msg:"", severity:""};
    const dispatch = useDispatch();

    const validationFormulaire = (event) => {

        if (!validator.isEmail(updateUser.email)) {
            event.preventDefault();
            openSnack.msg="Please, enter valid Email!";
            openSnack.severity="warning";
            dispatch(open(openSnack))
        } 
    }

    //méthode appelé dé que le composant est crée (monté)
    useEffect(() => {

        setHasError(false);
        setIsLoading(true);

        fetch("./compte.json")
            .then(response => response.json())

            .then(data => {
                console.log();
                setIsLoading(false);
                // setUser(data);
            })

            .catch(() => {
                setHasError(true);
                // setIsLoading(false);
            });

    }, []);


    const updateBithDay = useCallback(value => {
        if (value !== null) {
            const d = new Date(value); // voir si on stock les dates en en-EN ou fr-FR
            console.log(d.toLocaleDateString("fr-FR"));
            setUser({ ...updateUser, birthday: d })
        }
    }, [updateUser])


    if (hasError) {
        openSnack.msg="Les données n'ont pas pu être chargée";
        openSnack.severity="error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loding />;
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
                <TextField id="champ1" label={t("compte.details.nom")} variant="outlined" defaultValue={updateUser.name} InputProps={{ readOnly: true, }} />
                <TextField id="champ2" label={t("compte.details.prenom")} variant="outlined" defaultValue={updateUser.name} InputProps={{ readOnly: true, }} />

                <LocalizationProvider id="champ3" dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
                    <DatePicker
                        disableFuture
                        label={t("compte.details.anniversaire")}
                        value={updateUser.birthday}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={updateBithDay}
                    />
                </LocalizationProvider>

                <br className='tampon' />

                <TextField id="champ4" required label="email" variant="outlined" value={updateUser.email} onChange={(e) => { setUser({ ...updateUser, email: e.target.value }) }} />
                <br className='tampon' />

                <div id="champ5">
                    <ModalChangePassword user={updateUser} setUser={setUser} />
                </div>

                <button variant="contained" id="champ10" type="submit">{t("compte.details.enregistrer")}</button>
            </Box>
            <LogoutWithGoogle/>
        </div>
    );

}

export default Informations