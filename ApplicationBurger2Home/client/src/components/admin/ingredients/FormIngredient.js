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
import Ingredients from "./Ingredients";

const FormIngredient = ({IS, setIS}) => {

    const initialState = { id: null, allergens:[]};
    const initialStateLg = { id: null, name: "", ingredientId: null };

    const [ingredientSelected, setIngredientSelected] = useState(initialState);
    const [ingredientFr, setIngredientFr] = useState(initialStateLg);
    const [ingredientEn, setIngredientEn] = useState(initialStateLg);
    const [allergens, setAllergens] = useState(initialStateLg);

    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language)

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

                    setIngredientEn({id: responses[0].data[0].id,name: responses[0].data[0].name,ingredientId:responses[0].data[0].ingredientId});
                    setIngredientFr({id: responses[0].data[1].id,name: responses[0].data[1].name,ingredientId:responses[0].data[1].ingredientId});
                    setIngredientSelected({id :responses[1].data.id,allergens:responses[1].data.allergens});
                    })
                )
                .catch(() => {
                    setHasError(true);
                })
        }

    }, [IS.ingredientId])

    const cancel = () =>{
        setIS({id:null})
        setIngredientFr(initialStateLg)
        setIngredientEn(initialStateLg)
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
                    value={ingredientEn.name}
                    // onChange={e => changeName("en", e)}
                    inputProps={{ maxLength: 100 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${ingredientEn.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />

                <TextField label="Nom"
                    required
                    // error={errorNameFr.onError}
                    // helperText={errorInput(errorNameFr)}
                    className="inputName"
                    variant="outlined"
                    value={ingredientFr.name}
                    // onChange={e => changeName("fr", e)}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${ingredientFr.name.length}/${100}`}
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
                                return <FormControlLabel key={allergen.id} label={allergen.name} labelPlacement="top"
                                    control={<Checkbox key={allergen.id} 
                                        checked={isCheckedAllergen(allergen.allergenId)} 
                                        // onChange={e => handleChangeCheck(e, familly.productFamilyId)} 
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
                <Button variant="contained" type="" >
                    {ingredientSelected.id === null ? "Ajouter" : "Modifier"}
                </Button>
                <Button variant="contained" onClick={cancel}>Annuler</Button>
            </div>

        </Box>
    )
}

export default FormIngredient