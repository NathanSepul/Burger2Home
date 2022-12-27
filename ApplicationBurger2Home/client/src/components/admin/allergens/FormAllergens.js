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
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';

const FormAllergens = ({AS, setAS}) => {

    const initialState = { id: null};
    const initialStateLg = { id: null, name: "" };

    const [allergenSelected, setAllergenSelected] = useState(initialState);
    const [allergenFr, setAllergenFr] = useState(initialStateLg);
    const [allergenEn, setAllergenEn] = useState(initialStateLg);
    const [allergens, setAllergens] = useState(initialStateLg);

    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (AS.id !== null) {
            // console.log(AS)
            
           axios.get(`/allergens/${AS.id}/translations`)
                .then(res => {
                    setAllergenEn({id: res.data[0].id, name: res.data[0].name, allergenId:res.data[0].allergenId});
                    setAllergenFr({id: res.data[1].id, name: res.data[1].name, allergenId:res.data[1].allergenId});
                    setAllergenSelected({id : AS.id});
                })
                
                .catch(() => {
                    setHasError(true);
                })
        }

    }, [AS.id])

    const cancel = () =>{
        setAS({id:null})
        setAllergenFr(initialStateLg)
        setAllergenEn(initialStateLg)
        setAllergenSelected(initialState)
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
                    // error={errorNameEn.onError}
                    // helperText={errorInput(errorNameEn)}
                    className="inputName"
                    variant="outlined"
                    value={allergenEn.name}
                    // onChange={e => changeName("en", e)}
                    inputProps={{ maxLength: 100 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${allergenEn.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />

                <TextField label="Nom"
                    required
                    // error={errorNameFr.onError}
                    // helperText={errorInput(errorNameFr)}
                    className="inputName"
                    variant="outlined"
                    value={allergenFr.name}
                    // onChange={e => changeName("fr", e)}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${allergenFr.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />
            </div>

            <div className="buttonFormProduct">
                <Button variant="contained" type="" >
                    {allergenSelected.id === null ? "Ajouter" : "Modifier"}
                </Button>
                <Button variant="contained" onClick={cancel}>Annuler</Button>
            </div>

        </Box>
    )
}

export default FormAllergens