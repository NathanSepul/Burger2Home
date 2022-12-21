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

const ProductForm = ({ productSelected, setProductSelected }) => {
    const initialState = { id: "", name: "", description: "", currentPrice: "", currentDiscount: "", imageUrl: "", ingredients: [], allergens: [], onMenu: false };

    const [productEn, setProductEn] = useState(initialState);
    const [productFr, setProductFr] = useState(initialState);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorPrice, setErrorPrice] = useState(false);
    const languageRedux = useSelector(state => state.language)

    const [ingredrientsList, setIngredientsList] = useState();
    const [famillyList, setFamillyList] = useState();
    const [productOriginal, setPO] = useState(productSelected);

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
                        setProductEn(responses[0].data)
                        setProductFr(responses[1].data)
                    })
                )
                .catch(e => {
                    console.error(e);
                });
        }

    }, [productSelected])

    const changePrice = event => {
        if (!/^\d+(\.\d{1,2})?$/.test(event.target.value)) {
            setIsDisabled(true);
            setErrorPrice(true);
        }
        else {
            setIsDisabled(false)
            setErrorPrice(false);

        }

        setProductSelected({...productSelected,currentPrice:event.target.value})

    }

    const changeName = (lg,e) =>{
        if(lg === "fr"){
            setProductFr({...productFr,name: e.target.value})
        }
        else{
            setProductEn({...productEn,name: e.target.value})
        }
    }

    const changeImg = e =>{
        setProductSelected({...productSelected,imageUrl:e.target.value})
    }

    const isCheckedFamilly = (id) => {
        let isFound = false;

        if (productSelected.id !== "") {
            for (let i = 0; i < productSelected.productFamilies.length; i++) {
                if (productSelected.productFamilies[i] === id) {
                    isFound = true;
                    break;
                }
            }

        }
        return isFound;
    }

    const cancel = () => {
        setProductSelected(initialState);
        setProductEn(initialState);
        setProductFr(initialState);
    }


    const handleChangeCheck = (event,famillyId) => {

        let  tempArrays = productSelected.productFamilies

        if(event.target.checked === true ){
            tempArrays.push(famillyId)
        }
        else{
            const index = tempArrays.indexOf(famillyId);
            tempArrays.splice(index,1);
        }

        setProductSelected({...productSelected,productFamilies:tempArrays})
   
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
                <TextField required className="inputName" label="Name" variant="outlined" value={productEn.name} onChange={e => changeName("En",e)}/>
                <TextField required className="inputName" label="Nom" variant="outlined" value={productFr.name} onChange={e => changeName("fr",e)}/>
            </div> 

            <div className="Img">
                {productSelected.imageUrl !== "" && (
                    <img className="imgForm" src={productSelected.imageUrl} alt={productSelected.imageUrl} />
                )}
                <TextField required className="pathImg" label="Chemin" variant="outlined" value={productSelected.imageUrl} onChange={changeImg}/>
            </div>

            <div className="FamillyCheckBox">
                {(!isLoading) && (

                    <FormGroup>
                        {famillyList.data.map((familly) => {
                            return <FormControlLabel key={familly.id} label={familly.name}
                                control={<Checkbox key={familly.id} checked={isCheckedFamilly(familly.productFamilyId)} onChange={e => handleChangeCheck(e,familly.productFamilyId)} />} />
                        })}

                    </FormGroup>
                )}

            </div>

            <OutlinedInput
                className="price"
                error={errorPrice}
                value={productSelected.currentPrice}
                // onKeyPress={onlyNumber}
                onChange={changePrice}
                onBlur={changePrice}
                endAdornment={"€"}
            />

            <br /><br />
            <div>
                <span> <Button disabled={isDisabled} variant="contained" type="submit">Ajouter</Button></span>
                <span>  <Button variant="contained" onClick={cancel}>Annuler</Button> </span>
            </div>

        </Box>
    )
}

export default ProductForm