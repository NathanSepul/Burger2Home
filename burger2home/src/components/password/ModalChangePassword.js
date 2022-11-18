import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';


import PasswordField from './PasswordField';

import "./ModalChangePassword.css";

const ModalChangePassword = ({user, setUser }) => {
    const { t } = useTranslation();

    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");


    const [oldPwd] = useState(user.password)
    const [confirmOldPwd, setConfirmOldPwd] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [confirmPwd, setconfirmPwd] = useState("")
    const [isOK, setIsOK] = useState(false)

    const [disable, setDisbale] = useState(true);

    const setPasswordUser = (value) => setUser({ ...user, password: value })

    const resetAllValue = () => {
        setConfirmOldPwd("");
        setNewPassword("");
        setconfirmPwd("");
        setIsOK(false);
        setDisbale(true);
        setMessage("");
    }

    const handleCloseModalValider = () => {

        if (isOK) {
            setOpenModal(false);
            setPasswordUser(newPassword);
            resetAllValue();
        }
        else if (newPassword === oldPwd) {
            setMessage(t('mdp.erreur.identique'));
        }
        else {
            setMessage(t('mdp.erreur.criteres'));
        }


    }

    const handleCloseModalAnnuler = () => {
        setOpenModal(false);
        resetAllValue();
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
        <div>
            <Button onClick={() => setOpenModal(true)}>{t('mdp.button')}</Button>
            <Modal open={openModal} sx={{ zIndex: "1000001" }}>

                <Box className="modalPwd">

                    {(message !== "") && (
                        <Alert className="alert" severity="error" onClose={() => { setMessage("") }}>
                            <p>{message}</p>
                        </Alert>
                    )}

                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {t('mdp.update.titre')}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mb: 1, mt: 2 }}>
                        {t('mdp.update.txt')}
                    </Typography>

                    <div className="contenuModal">
                        <PasswordField disable={false} pwd={confirmOldPwd} setPwd={setConfirmOldPwd} labelInput={t('mdp.update.actuel')} />

                        <div id="list">
                            <PasswordChecklist rules={["match"]}
                                value={oldPwd}
                                valueAgain={confirmOldPwd}
                                onChange={(isValid) => { isValid ? setDisbale(false) : setDisbale(true); }}
                                messages={{ match: t('mdp.checkList.matchOld') }}
                            />
                        </div>

                        <br />

                        <PasswordField disable={disable} pwd={newPassword} setPwd={setNewPassword} labelInput={t('mdp.update.nouveau')} />

                        <br />
                        <PasswordField disable={disable} pwd={confirmPwd} setPwd={setconfirmPwd} labelInput={t('mdp.update.confirmer')} />

                        {/* <br /> */}
                        <div className="tooltip">
                            <Tooltip title={toolTipsCheckList()} placement="bottom" arrow>
                                <InfoIcon />
                            </Tooltip>
                        </div>
                    </div>


                    <div className="buttonsModal">
                        <Button variant="outlined" onClick={handleCloseModalValider}> {t('mdp.update.valider')} </Button>
                        <div>&nbsp; &nbsp;</div>
                        <Button variant="outlined" onClick={handleCloseModalAnnuler}> {t('mdp.update.annuler')} </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalChangePassword
