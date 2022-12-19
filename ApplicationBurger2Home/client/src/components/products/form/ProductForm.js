import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import "./ProductForm.css"
const ProductForm = ({ productSelected }) => {

    const [productEn, setPorductEn] = useState({ id: "", name: "", description: "", currentPrice: "", currentDiscount: "", imageUrl: "", ingredients: [], allergens: [] });
    const [productFr, setProductFr] = useState({ id: "", name: "", description: "", currentPrice: "", currentDiscount: "", imageUrl: "", ingredients: [], allergens: [] });
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);
    
    useEffect(() => {
        if (productSelected.id !== "") {
            const requestOne = axios.get(`/products/summaries/${productSelected.id}?language=EN`);
            const requestTwo = axios.get(`/products/summaries/${productSelected.id}?language=FR`);

            axios.all([requestOne, requestTwo])
                .then(
                    axios.spread((...responses) => {
                        setPorductEn(responses[0].data)
                        setProductFr(responses[1].data)
                    })
                )
                .catch(e => {
                    console.error(e);
                });
        }

    }, [productSelected.id])

    const changePrice = event => {
        if(!/^\d+(\.\d{1,2})?$/.test(event.target.value)) {
            setIsDisabled(true)
            setErrorPrice(true);
        }
        else{
            setIsDisabled(false)
            setErrorPrice(false);
        }
        
    }
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

        
            <OutlinedInput
                className="price"
                error={errorPrice}
                value={productSelected.price}
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