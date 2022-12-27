import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import {useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';

const FormAllergens = ({ AS, setAS, setReloadList }) => {

    const initialState = { id: null };
    const initialStateEn = { id: null, name: "", allergenId: null, language: { id: 1 } };
    const initialStateFr = { id: null, name: "", allergenId: null, language: { id: 2 } };


    const [allergenSelected, setAllergenSelected] = useState(initialState);
    const [allergenEn, setAllergenEn] = useState(initialStateEn);
    const [allergenFr, setAllergenFr] = useState(initialStateFr);

    const openSnack = { msg: "", severity: "" }
    const dispatch = useDispatch()

    useEffect(() => {
        if (AS.id !== null) {

            axios.get(`/allergens/${AS.id}/translations`)
                .then(res => {
                    setAllergenEn({ id: res.data[0].id, name: res.data[0].name, allergenId: res.data[0].allergenId, language: { id: 1 } });
                    setAllergenFr({ id: res.data[1].id, name: res.data[1].name, allergenId: res.data[1].allergenId, language: { id: 2 } });
                    setAllergenSelected({ id: AS.id });
                })

                .catch((e) => {
                    console(e)
                })
        }

    }, [AS.id])

    const cancel = () => {
        setAS({ id: null })
        setAllergenFr(initialStateFr)
        setAllergenEn(initialStateEn)
        setAllergenSelected(initialState)
    }

    const changeName = (lg, e) => {

        const firstLetter = e.target.value.charAt(0).toUpperCase();
        const restOfString = e.target.value.slice(1);
        const capitalizedString = firstLetter + restOfString;

        if (lg === "fr") {
            
            setAllergenFr({ ...allergenFr, name: capitalizedString })
        }
        else {
            setAllergenEn({ ...allergenEn, name:capitalizedString })
        }
    }

    const validationForm = async e => {

        if (allergenEn.name.replace(/\s+/g, '') === "" || allergenFr.name.replace(/\s+/g, '') === "") {
            openSnack.msg = "Les deux champs doivent être completé";
            openSnack.severity = "error";
            dispatch(open(openSnack))
        }
        else {
            if (allergenSelected.id === null) {
                axios.post(`/allergens`, allergenSelected)
                    .then(res => {
                        let temp = allergenSelected;
                        temp.id = res.data.id;
                        setAllergenSelected(temp);

                        let tempLg = allergenEn;
                        tempLg.allergenId = allergenSelected.id;
                        setAllergenEn(tempLg);
                        return axios.post(`/allergens/translations`, allergenEn);
                    })

                    .then(res => {
                        let tempLg = allergenFr;
                        tempLg.allergenId = allergenSelected.id;
                        setAllergenFr(tempLg);

                        let tradTemp = allergenEn;
                        tradTemp.id = res.data.id;
                        setAllergenEn(tradTemp)

                        return axios.post(`/allergens/translations`, allergenFr);
                    })
                    .then(res => {
                        let tradTemp = allergenFr;
                        tradTemp.id = res.data.id;
                        setAllergenFr(tradTemp)

                        setReloadList(true)
                        openSnack.msg = "l'allergene est ajouté";
                        openSnack.severity = "info";
                        dispatch(open(openSnack))
                    })

                    .catch(error => {
                        openSnack.msg = "L'ajout a échoué";
                        openSnack.severity = "warning";
                        dispatch(open(openSnack))
                        console.log(error)
                    });

            }
            else {
                axios.put(`/allergens/translations`, allergenEn)
                    .then(res => {
                        return axios.put(`/allergens/translations`, allergenFr)
                    })

                    .then(res => {
                        setReloadList(true)
                        openSnack.msg = "l'allergene est modifié";
                        openSnack.severity = "info";
                        dispatch(open(openSnack))
                    })

                    .catch(error => {
                        openSnack.msg = "La modification a échoué";
                        openSnack.severity = "warning";
                        dispatch(open(openSnack))
                        console.log(error)
                    });
            }

        }



        e.preventDefault()
    }

    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: "auto", width: "100%" },
            }}
        >
            <div className="Name">
                <TextField label="Name"
                    required
                    className="inputName"
                    variant="outlined"
                    value={allergenEn.name}
                    onChange={e => changeName("en", e)}
                    inputProps={{ maxLength: 60 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${allergenEn.name.length}/${60}`}
                            </InputAdornment>
                        ),
                    }} />

                <TextField label="Nom"
                    required
                    className="inputName"
                    variant="outlined"
                    value={allergenFr.name}
                    onChange={e => changeName("fr", e)}
                    inputProps={{ maxLength: 60 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${allergenFr.name.length}/${60}`}
                            </InputAdornment>
                        ),
                    }} />
            </div>

            <div className="buttonFormProduct">
                <Button variant="contained" type="" onClick={validationForm}>
                    {allergenSelected.id === null ? "Ajouter" : "Modifier"}
                </Button>
                <Button variant="contained" onClick={cancel}>
                    {allergenSelected.id === null ? "Annuler" : "Nettoyer"}
                </Button>
            </div>

        </Box>
    )
}

export default FormAllergens