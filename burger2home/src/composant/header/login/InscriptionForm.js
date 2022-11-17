import React, { useState } from 'react';
import PasswordField from '../../compte/informationsCompte/PasswordField.js';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice.js';
import PasswordChecklist from "react-password-checklist";
import InfoIcon from '@mui/icons-material/Info';

import "./InscriptionForm.css";
const InscriptionForm = () => {

    const [openModal, setOpenModal] = useState(false);
    
    const [newPassword, setNewPassword] = useState("")
    const [confirmPwd, setconfirmPwd] = useState("")
    const [isOK, setIsOK] = useState(false)

    const isConnected = useSelector(state => state.isConnected.value)
    const dispatch = useDispatch()

    const { t } = useTranslation();

    const validationFormulaire = (event) => {
        if(isOK){
            console.log("le formulair est envoyé");
            dispatch(login());
            setOpenModal(false);
        }
        else{
            event.preventDefault();
        }
    }

    const leaveForm = () => {
        dispatch(login());
        setOpenModal(false);
    }

    const toolTipsCheckList = () => {
        return (
            <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital", "match"]}
                sx={{ zIndex: "10000010" }}
                minLength={8}
                value={newPassword}
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
        <div id="login">
            <Button id="inscription" onClick={() => setOpenModal(true)}>s'inscrire'</Button>
            <Modal open={openModal} sx={{ zIndex: "1000001" }} >
                <Box
                    className="inscription"
                    onSubmit={validationFormulaire}
                    component="form"
                    sx={{
                        '& > :not(style)': { margin: "8px", width: "auto", minWidth: "30ch" },
                    }}
                >
                    <TextField required label={t("compte.details.nom")} variant="outlined" />
                    <TextField required label={t("compte.details.prenom")} variant="outlined" />
                    <TextField required label="email" variant="outlined" />

                    <PasswordField disable={false} pwd={newPassword} setPwd={setNewPassword} labelInput="pwd" />
                    <PasswordField disable={false} pwd={confirmPwd} setPwd={setconfirmPwd} labelInput="confirme pwd" />

                    <div id="tooltip">
                        <Tooltip title={toolTipsCheckList()} placement="bottom" arrow>
                            <InfoIcon />
                        </Tooltip>
                    </div>

                    <button variant="contained" type="submit">se connecter</button>
                    
                    <button variant="contained" type="submit" onClick={()=>leaveForm()}>annuler</button>
                </Box>
            </Modal>
        </div>
    );
}

export default InscriptionForm