import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import 'dayjs/locale/fr';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import validator from "validator";
import ModalChangePassword from '../../password/ModalChangePassword.js';
import LogoutWithGoogle from "../../../service/LogoutWithGoogle.js"
import { useSelector} from 'react-redux';

import "./Informations.css";


const Informations = () => {

    const { t } = useTranslation();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [updateUser, setUser] = useState({});
    const userRedux = useSelector(state => state.user)




    const validationFormulaire = (event) => {

        if (validator.isEmail(updateUser.email)) {
            setMessage("");
        } else {
            event.preventDefault();
            setMessage(<li>Please, enter valid Email!</li>);
        }
    }

    //méthode appelé dé que le composant est crée (monté)
    useEffect(() => {

        setHasError(false);
        setIsLoading(true);

        // fetch("http://sepul.be/test.json",{ 
        //     method: 'get',
        //         headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json',
        //         },
        //         'credentials': 'same-origin'
        // })


        fetch("./compte.json")
            .then(response => response.json())

            .then(data => {
                console.log();
                setIsLoading(false);
                setUser(data);
            })

            .catch(() => {
                setHasError(true);
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
        return <Alert className="alert" severity="error" onClose={() => { }}>
            <p>Les données n'ont pas pu être chargée</p>
        </Alert>;
    }

    if (isLoading) {
        return <p>Chargement en cours ... </p>;
    }



    return (
        <div id="Informations">

            {(message !== "") && (
                <Alert className="alert" severity="error" onClose={() => { setMessage("") }}>
                    {message}
                </Alert>
            )}
            <Box
                id="formInformation"
                onSubmit={validationFormulaire}
                component="form"
                sx={{
                    '& > :not(style)': { margin: "8px", width: "auto", minWidth: "30ch" },
                }}
            >
                <TextField id="champ1" label={t("compte.details.nom")} variant="outlined" defaultValue={userRedux.name} InputProps={{ readOnly: true, }} />
                <TextField id="champ2" label={t("compte.details.prenom")} variant="outlined" defaultValue={userRedux.name} InputProps={{ readOnly: true, }} />

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

                <TextField id="champ4" required label="email" variant="outlined" value={userRedux.email} onChange={(e) => { setUser({ ...updateUser, email: e.target.value }) }} />
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