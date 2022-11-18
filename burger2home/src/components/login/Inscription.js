import React, { useState } from 'react';
import PasswordField from '../password/PasswordField.js';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice.js';
import PasswordChecklist from "react-password-checklist";
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';

import "./Inscription.css";

const Inscription = () => {

    const [Password, setPassword] = useState("")
    const [confirmPwd, setconfirmPwd] = useState("")
    const [isOK, setIsOK] = useState(false)

    const user = useSelector(state => state.userConnected)

    const dispatch = useDispatch()

    const { t } = useTranslation();

    const validationFormulaire = (event) => {
        if (isOK) {
            console.log("le formulair est envoyé");
            dispatch(login());
        }
        else {
            event.preventDefault();
        }
    }

    const toolTipsCheckList = () => {
        return (
            <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital", "match"]}
                sx={{ zIndex: "10000010" }}
                minLength={8}
                value={Password}
                valueAgain={confirmPwd}
                onChange={isValid => setIsOK(isValid)}
                messages={{
                    minLength: t('mdp.checkList.minLength'),
                    specialChar: t('mdp.checkList.specialChar'),
                    number: t('mdp.checkList.number'),
                    capital: t('mdp.checkList.capital'),
                    match: t('mdp.checkList.match'),
                }}
            />);
    }


    return (
        <main id="inscription">
            <h1>Burger2Home</h1>
            <div className="inscriptionForm">
                <form onSubmit={validationFormulaire} >
                    <h2>Inscription</h2>

                    <div id="name">
                        <TextField sx={{ width: "45%" }} id="fieldLastName" required label={t("compte.details.nom")} variant="outlined" />
                        <TextField sx={{ width: "45%" }} id="fieldFirstName" required label={t("compte.details.prenom")} variant="outlined" />
                    </div>
                    <br />
                    <TextField fullWidth id="fieldEmail" required label="email" variant="outlined" />
                    <br /><br />
                    <div id="pwd">
                        <PasswordField id="fieldPwd" disable={false} pwd={Password} setPwd={setPassword} labelInput="pwd" />
                        <PasswordField id="fieldConfirmPwd" disable={false} pwd={confirmPwd} setPwd={setconfirmPwd} labelInput="confirme pwd" />

                        <div className="tooltipInscription">
                            <Tooltip title={toolTipsCheckList()} placement="bottom" arrow>
                                <InfoIcon />
                            </Tooltip>
                        </div>
                    </div>

                    <br />

                    <button variant="contained" type="submit">s'inscrire</button>
                </form>
                
                <br />
                <Divider />

            </div>
            <br />
        </main>
    );
}

export default Inscription