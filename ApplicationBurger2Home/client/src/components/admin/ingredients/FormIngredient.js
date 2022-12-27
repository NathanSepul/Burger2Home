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
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';

const FormIngredient = ({IS, setIS, setReloadList}) => {

    const initialState = { id: null, allergens:[]};
    const initialStateEn = { id: null, name: "", allergenId: null, language: { id: 1 } };
    const initialStateFr = { id: null, name: "", allergenId: null, language: { id: 2 } };

    const [ingredientSelected, setIngredientSelected] = useState(initialState);
    const [ingredientFr, setIngredientFr] = useState(initialStateFr);
    const [ingredientEn, setIngredientEn] = useState(initialStateEn);
    const [allergens, setAllergens] = useState([]);

    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language)
    const openSnack = { msg: "", severity: "" }
    const dispatch = useDispatch()

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`/allergens/translations?language=${languageRedux.value}`)
        .then(res =>{
            setAllergens(res)
            setIsLoading(false);
        })
        .catch(() => {
            setHasError(true);
        })

    },[languageRedux.value])

    useEffect(() => {
        if (IS.id !== null) {
            const requestOne = axios.get(`/ingredients/${IS.id}/translations`);
            const requestTwo  = axios.get(`/ingredients/${IS.id}`);
            axios.all([requestOne,requestTwo])
                .then(axios.spread((...responses)  => {

                    setIngredientEn({id: responses[0].data[0].id,name: responses[0].data[0].name,ingredientId:responses[0].data[0].ingredientId, language: { id: 1 } });
                    setIngredientFr({id: responses[0].data[1].id,name: responses[0].data[1].name,ingredientId:responses[0].data[1].ingredientId, language: { id: 2 } });
                    setIngredientSelected({id :responses[1].data.id,allergens:responses[1].data.allergens});
                    })
                )
                .catch(() => {
                    setHasError(true);
                })
        }

    }, [IS.id])

    const cancel = () =>{
        setIS({id:null})
        setIngredientFr(initialStateFr)
        setIngredientEn(initialStateEn)
        setIngredientSelected(initialState)
    }

    const isCheckedAllergen = (id) => {
        let isFound = false;

        if (ingredientSelected.allergens.length !== 0) {
            for (let i = 0; i < ingredientSelected.allergens.length; i++) {
                if (ingredientSelected.allergens[i].id === id) {
                    isFound = true;
                    break;
                }
            }
        }
        return isFound;
    }

    const handleChangeCheck = (event, allergeneId) => {

        let temp = ingredientSelected.allergens;
       
        if (event.target.checked === true) {
            temp.push({id:allergeneId});
        }
        else {
            const index = temp.indexOf(allergeneId);
            temp.splice(index, 1);
        }

        setIngredientSelected({...ingredientSelected,allergens:temp});
      
    }

    const changeName = (lg, e) => {

        const firstLetter = e.target.value.charAt(0).toUpperCase();
        const restOfString = e.target.value.slice(1);
        const capitalizedString = firstLetter + restOfString;

        if (lg === "fr") {
            
            setIngredientFr({ ...ingredientFr, name: capitalizedString })
        }
        else {
            setIngredientEn({ ...ingredientEn, name:capitalizedString })
        }
    }

    const isOKForm = () =>{
        let isOK = true;

        if(ingredientEn.name.replace(/\s+/g, '') === "" || ingredientFr.name.replace(/\s+/g, '') === ""){
            isOK = false
        }

        if(ingredientSelected.allergens.length === 0 ){
            isOK = false
        }

        return isOK;
    }

    const validationForm = async e => {

        console.log(ingredientFr)
        console.log(ingredientEn)
        console.log(ingredientSelected)


        if (!isOKForm()) {
            openSnack.msg = "Le formulaires n'est pas completé correctement";
            openSnack.severity = "error";
            dispatch(open(openSnack))
        }
        else {
            if (ingredientSelected.id === null) {
                axios.post(`/ingredients`, ingredientSelected)
                    .then(res => {
                        let temp = ingredientSelected;
                        temp.id = res.data.id;
                        setIngredientSelected(temp);

                        let tempLg = ingredientEn;
                        tempLg.ingredientId = ingredientSelected.id;
                        setIngredientEn(tempLg);
                        return axios.post(`/ingredients/translations`, ingredientEn);
                    })

                    .then(res => {
                        let tempLg = ingredientFr;
                        tempLg.ingredientId = ingredientSelected.id;
                        setIngredientFr(tempLg);

                        let tradTemp = ingredientEn;
                        tradTemp.id = res.data.id;
                        setIngredientEn(tradTemp)
                        return axios.post(`/ingredients/translations`, ingredientFr);
                    })
                    .then(res =>{
                        let tradTemp = ingredientFr;
                        tradTemp.id = res.data.id;
                        setIngredientFr(tradTemp) 
                        const stocInitial = {id:null, ingredientId:ingredientSelected.id,amount:0}
                        return axios.post(`/stocks`, stocInitial);

                    })
                    .then(res => {
                        setReloadList(true)
                        openSnack.msg = "l'ingrédient est ajouté";
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
                axios.put(`/ingredients`, ingredientSelected)
                .then(res => {
                    return axios.put(`/ingredients/translations`, ingredientEn);
                })

                .then(res => {
                    return axios.put(`/ingredients/translations`, ingredientFr);
                })
                .then(res => {
                    setReloadList(true)
                    openSnack.msg = "l'ingrédient est ajouté";
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
                    value={ingredientEn.name}
                    onChange={e => changeName("en", e)}
                    inputProps={{ maxLength: 60 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${ingredientEn.name.length}/${60}`}
                            </InputAdornment>
                        ),
                    }} />

                <TextField label="Nom"
                    required
                    className="inputName"
                    variant="outlined"
                    value={ingredientFr.name}
                    onChange={e => changeName("fr", e)}
                    inputProps={{ maxLength: 60 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${ingredientFr.name.length}/${60}`}
                            </InputAdornment>
                        ),
                    }} />
            </div>


            <div className="FamillyCheckBox">
                <FormLabel sx={{ color: "black" }} className="titreCheck">Ingredient</FormLabel>

                {(!isLoading) && (
                    <FormControl
                        required
                        // error={errorCheckBox.onError}
                        component="fieldset"
                    >
                        <FormGroup row className="checkBoxGroupFam">
                            {allergens.data.map((allergen) => {
                                return <FormControlLabel key={allergen.id} label={allergen.name} labelPlacement="start"
                                    control={<Checkbox key={allergen.id} 
                                        checked={isCheckedAllergen(allergen.allergenId)} 
                                        onChange={e => handleChangeCheck(e, allergen.allergenId)} 
                                        />} />
                            })}


                        </FormGroup>
                    </FormControl>
                )}
                {/* {errorCheckBox.onError && (
                    <FormHelperText sx={{ color: "rgb(210,48,47)", textAlign: "center" }}>{errorCheckBox.msg}</FormHelperText>
                )} */}
            </div>

            <div className="buttonFormProduct">
                <Button variant="contained" type="" onClick={e =>validationForm(e)}>
                    {ingredientSelected.id === null ? "Ajouter" : "Modifier"}
                </Button>
                <Button variant="contained" onClick={cancel}>Annuler</Button>
            </div>

        </Box>
    )
}

export default FormIngredient