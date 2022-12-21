import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

import { useSelector } from 'react-redux';
import "./ProductForm.css"
const ProductForm = ({ productSelected }) => {

    const [productEn, setPorductEn] = useState({ id: "", name: "", description: "", currentPrice: "", currentDiscount: "", imageUrl: "", ingredients: [], allergens: [] });
    const [productFr, setProductFr] = useState({ id: "", name: "", description: "", currentPrice: "", currentDiscount: "", imageUrl: "", ingredients: [], allergens: [] });
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorPrice, setErrorPrice] = useState(false);
    const languageRedux = useSelector(state => state.language)

    const [ingredrientsList, setIngredientsList] = useState();
    const [famillyList, setFamillyList] = useState();

    ;

    useEffect(() => {

        const requestOne = axios.get(`/ingredients/translations?language=${languageRedux.value}`);
        const requestTwo = axios.get(`/products/families/translations?language=${languageRedux.value}`);

        axios.all([requestOne, requestTwo])
            .then(
                axios.spread((...responses) => {
                    setIngredientsList(responses[0])
                    setFamillyList(responses[1])
                    setIsLoading(false)
                })
            )
            .catch(e => {
                console.error(e);
            });

    }, [languageRedux.value])

    useEffect(() => {
        if (productSelected.id !== "") {
            const requestOne = axios.get(`/products/summaries/${productSelected.id}?language=EN`);
            const requestTwo = axios.get(`/products/summaries/${productSelected.id}?language=FR`);

            axios.all([requestOne, requestTwo])
                .then(
                    axios.spread((...responses) => {
                        setPorductEn(responses[0])
                        setProductFr(responses[1])
                    })
                )
                .catch(e => {
                    console.error(e);
                });
        }

    }, [productSelected.id])

    const changePrice = event => {
        if (!/^\d+(\.\d{1,2})?$/.test(event.target.value)) {
            setIsDisabled(true)
            setErrorPrice(true);
        }
        else {
            setIsDisabled(false)
            setErrorPrice(false);
        }
    }

    const isCheckedFamilly = () => {
        // let isFound;

        // if (productSelected.id !== "") {

        //     isFound = productSelected.productFamilies.some(element => {
        //         if (element === famillyId.productFamilyId) {
        //             return true
        //         }
        //         return false
        //     })
        // }
        return  true;
    }

    const handleChange = (event) => {

    };

    return (
        <Box
            // onSubmit={validationFormulaire}
            component='form'
            sx={{
                '& > :not(style)': { m: "auto", width: "100%" },
            }}
        >
            <div className="Name">
                <TextField required className="inputName" label="Name" variant="outlined" value={productEn.name} />
                <TextField required className="inputName" label="Nom" variant="outlined" value={productFr.name} />
            </div>

            <div className="Img">
                {productSelected.imageUrl !== "" && (
                    <img className="imgForm" src={productSelected.imageUrl} alt={productSelected.imageUrl} />
                )}
                <TextField required className="pathImg" label="Chemin" variant="outlined" value={productSelected.imageUrl} />
            </div>

            <div className="FamillyCheckBox">
            {(!isLoading) && (

                <FormGroup>
                    {
                    famillyList.data.map((familly) => {
                            return <FormControlLabel key={familly.id} label={"dfgh"}
                                control={<Checkbox key={familly.id} checked={isCheckedFamilly()} />}/>
                            
                           
                        })
                    }
                        
                </FormGroup>
                    )}

            </div>

            <OutlinedInput
                className="price"
                error={errorPrice}
                value={productSelected.currentPrice}
                // onKeyPress={onlyNumber}
                // onChange={changePrice}
                onBlur={changePrice}
                endAdornment={"€"}
            />

            <br /><br />
            <Button disabled={isDisabled} id="buttonValidation" variant="contained" type="submit">Ajouter</Button>
        </Box>
    )
}

export default ProductForm