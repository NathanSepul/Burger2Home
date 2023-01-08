import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import { useTranslation } from 'react-i18next';

const FormRoles = ({ uS, setUS, roles, setReloadList }) => {

    const [userSelected, setUserSelecteted] = useState({ id: null, username: "", email: "", role: [] });
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    const openSnack = { msg: "", severity: "" }
    const { t } = useTranslation();

    const dispatch = useDispatch()



    useEffect(() => {
        setUserSelecteted(uS)
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uS.id])



    const cancel = () => {
        setUS({ id: null })
        setUserSelecteted({ id: null, username: "", email: "", role: [] })
    }


    const isCheckedRole = (id) => {
        let isFound = false;

        if (userSelected.id === null)
            return false

        userSelected.role.id === id ? isFound = true : isFound = false;

        return isFound;
    }

    const handleChangeCheck = (role) => {
        setUserSelecteted({ ...userSelected, role: role })
    }



    const validationForm = async e => {
        console.log(userSelected)
        axios.put(`/users`, userSelected)
        .then(res => {
           openSnack.msg = "Le rôles a été modifié"
           openSnack.severity = "info"
            setReloadList(true)
           dispatch(open(openSnack))
        })
        .catch(e => {
            console.log(e)
            openSnack.msg = "Une erreur c'est produite"
            openSnack.severity ="error"
           dispatch(open(openSnack))

        })
        e.preventDefault()
    }

    return (
        <Box
            component='form'
            onSubmit={validationForm}
            sx={{
                '& > :not(style)': { m: "auto", width: "100%" },
            }}
        >
            <div className="infoUser">
                <TextField className="txtRoles"
                    label="Email"
                    variant="outlined"
                    value={userSelected.email || ""}
                    InputProps={{ readOnly: true, }}
                    onChange={e => e.preventDefault}
                />
                <TextField className="txtRoles"
                    label="Nom d'utilisateur"
                    variant="outlined"
                    value={userSelected.username || ""}
                    InputProps={{ readOnly: true, }}
                    onChange={e => e.preventDefault}
                />
            </div>


            <div className="rolesCheckBox">
                <FormLabel sx={{ color: "black" }} className="titreCheck">Roles</FormLabel>

                {(roles.length !== 0) && (
                    <FormControl component="fieldset" >
                        <FormGroup row className="checkBoxRoles">
                            {roles.map((role) => {
                                return <FormControlLabel key={role.id} label={role.name} labelPlacement="start"
                                    control={<Checkbox key={role.id} checked={isCheckedRole(role.id)} onChange={() => handleChangeCheck(role)}
                                    />}
                                />
                            })}
                        </FormGroup>
                    </FormControl>
                )}
            </div>

            <div className="bottomForm">
                {userSelected.id !== null && (
                    <>
                        <Button variant="contained" type="submit">
                            Attribuer
                        </Button>

                        <Button variant="contained" onClick={cancel}> {t('admin.nettoyer')} </Button>
                    </>
                )}

            </div>

        </Box>
    )
}

export default FormRoles