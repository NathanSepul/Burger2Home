import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import InfoIcon from '@mui/icons-material/Info';
import PasswordChecklist from "react-password-checklist";

import PasswordField from './PasswordField.js';
import "./ModalPassword.css";

const ModalPassword = ({name,user, setUser}) => {

    const [openModal, setOpenModal] = useState(false);
   
    const [oldPwd] = useState(user.password)
    const [confirmOldPwd,setConfirmOldPwd] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [confirmPwd, setconfirmPwd] = useState("")
    const [isValide, setIsValide] = useState(false)

    const [disable, setDisbale] = useState(true);

    const setPasswordUser = (value) => setUser({...user,password:value})

    const resetAllValue = () => {
        setConfirmOldPwd("");
        setNewPassword("");
        setconfirmPwd("");
        setIsValide(false);
        setDisbale(true);
    }
    
    const handleCloseModal = () => {
        setOpenModal(false);
        isValide ? setPasswordUser(newPassword) : console.log("pas de modification");
        resetAllValue();
    }



    return (
        <div >
            <Button  onClick={() => setOpenModal(true)}>{name}</Button>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modalPwd">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Modifier de passe
                    </Typography>
                        <PasswordField disable={false} pwd={confirmOldPwd} setPwd={setConfirmOldPwd} />
                        <div>
                            <PasswordChecklist
                                rules={["match"]}
                                value={oldPwd}
                                valueAgain={confirmOldPwd}
                                onChange={(isValid) => {
                                    isValid ? setDisbale(false) :  setDisbale(true);
                                }}
                            />
                        </div>

                        <div id="newPassword">
                            <PasswordField disable={disable} pwd={newPassword} setPwd={setNewPassword} />

                            <PasswordField disable={disable} pwd={confirmPwd} setPwd={setconfirmPwd} />
                            </div>
                            <div>
                                <PasswordChecklist
                                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                                    minLength={5}
                                    value={newPassword}
                                    valueAgain={confirmPwd}
                                    onChange={(isValid) => {
                                        setIsValide(isValid)
                                    }}
                                />
                            </div>
                       
                    <Button className="validerModal" onClick={handleCloseModal}> Valider </Button>
                </Box>
            </Modal>
        </div>     
    );

}

export default ModalPassword
