import React, { useState, useEffect, useRef } from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
import { Buffer } from "buffer";
import "./ProductForm.css"


const ProductForm = ({ ps, setPS }) => {
    const initialStatePS = { id: null, imageName: null, ingredients: [], productFamilies: [], onMenu: false };
    const initialStateFr = { id: null, description: "iii", name: "", language: { id: 2 }, productId: "" };
    const initialStateEn = { id: null, description: "ooo", name: "", language: { id: 1 }, productId: "" };
    const initialStatePrice = { amount: "" }
    const initialStateImg = null
    const initialStateError = { onError: false, msg: '' }


    const [productSelected, setProductSelected] = useState(initialStatePS);
    const [productEn, setProductEn] = useState(initialStateEn);
    const [productFr, setProductFr] = useState(initialStateFr);
    const [productPrice, setProductPrice] = useState(initialStatePrice);
    const [productImg, setProductImg] = useState(initialStateImg);
    const fileInput = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorNameFr, setErrorNameFr] = useState({ onError: false, msg: 'Le champ ne peut être vide' });
    const [errorNameEn, setErrorNameEn] = useState({ onError: false, msg: 'Le champ ne peut être vide' });
    const [errorPath, setErrorPath] = useState({ onError: false, msg: 'LIl faut une image' });
    const [errorCheckBox, setErrorCheckBox] = useState({ onError: false, msg: 'Il faut choisir une case' })
    const [errorPrice, setErrorPrice] = useState({ onError: false, msg: 'La valeur ne respect pas les critères' });

    const [ingredrientsList, setIngredientsList] = useState();
    const [famillyList, setFamillyList] = useState();

    const languageRedux = useSelector(state => state.language)

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
        setErrorNameFr({ ...errorNameFr, onError: false });
        setErrorNameEn({ ...errorNameEn, onError: false });
        setErrorPath({ ...errorPath, onError: false });
        setErrorCheckBox({ ...errorCheckBox, onError: false });
        setErrorPrice({ ...errorPrice, onError: false });

        if (ps.id !== null) {
            const requestOne = axios.get(`/products/${ps.id}`);
            const requestThree = axios.get(`/products/${ps.id}/translations`);
            const requestFour = axios.get(`/products/${ps.id}/prices/current`);
            const requestFive = axios.get(`/products/${ps.id}/image`,{responseType:'arraybuffer'});

            
            axios.all([requestOne, requestThree, requestFour, requestFive])
                .then(
                    axios.spread((...responses) => {
                        setProductSelected(responses[0].data);

                        let tempEn = productEn;
                        tempEn.id = responses[1].data[0].id;
                        tempEn.productId = responses[1].data[0].productId;
                        tempEn.name = responses[1].data[1].name;
                        tempEn.description = responses[1].data[0].description;
                        
                        let tempFr = productFr;
                        tempFr.id = responses[1].data[1].id;
                        tempFr.productId = responses[1].data[1].productId;
                        tempFr.name = responses[1].data[1].name;
                        tempFr.description = responses[1].data[1].description;

                        setProductEn(tempEn)
                        setProductFr(tempFr)

                        setProductPrice({ ...productPrice, amount: responses[2].data.amount })

                        const imageBuffer = Buffer.from(responses[3].data, 'binary');
                        const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
                        setProductImg(imageString)
                    })
                )
                .catch(e => {
                    console.error(e);
                });
        }

    }, [ps.id])



    const changePrice = event => {
        if (!/^\d+(\.\d{1,2})?$/.test(event.target.value)) {
            setErrorPrice({ onError: true, msg: "La valeur entrée n'est pas reconnue" });
        }
        else {
            setErrorPrice({ ...errorPrice, onError: false });
        }

        setProductPrice({ ...productPrice, amount: event.target.value })

    }

    const changeName = (lg, e) => {

        if (e.target.value.replace(/\s+/g, '') !== "") {
            lg === "fr" ? setErrorNameFr({ onError: false, msg: "" }) : setErrorNameEn({ onError: false, msg: "" })
        }

        if (lg === "fr") {
            setProductFr({ ...productFr, name: e.target.value })
        }
        else {
            setProductEn({ ...productEn, name: e.target.value })
        }
    }

    const changeImg = e => {
        const file = fileInput.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            console.log(reader.result)
            setProductImg(reader.result )
            
        };

        if (file !== undefined) {
            reader.readAsDataURL(file);
            setErrorPath({ onError: false, msg: "" })
            console.log(productSelected)
        }
        else {
            
            setProductImg(null)
        }
    }

    const isCheckedFamilly = (id) => {
        let isFound = false;

        if (productSelected.productFamilies.length !== 0) {
            for (let i = 0; i < productSelected.productFamilies.length; i++) {
                if (productSelected.productFamilies[i].id === id) {
                    isFound = true;
                    break;
                }
            }
        }
        return isFound;
    }

    const cancel = () => {
        setPS(initialStatePS);
        setProductSelected(initialStatePS);
        setProductEn(initialStateEn);
        setProductFr(initialStateFr);
        setProductPrice(initialStatePrice);
        setProductImg(initialStateImg);
    }


    const handleChangeCheck = (event, famillyId) => {
        // let tempArrays = productSelected.productFamilies;
        // tempArrays[0] = famillyId
        // if (event.target.checked === true) {
        //     tempArrays.push(famillyId);
        // }
        // else {
        //     const index = tempArrays.indexOf(famillyId);
        //     tempArrays.splice(index, 1);
        // }
        setErrorCheckBox({ onError: false, msg: "" })
        setProductSelected({ ...productSelected, productFamilies: [{ id: famillyId }] })

    };

    const handleChangeOnMenu = e => {
        setProductSelected({ ...productSelected, onMenu: e.target.checked })
    }

    const formIsOK = () => {

        let isOK = true;

        if (productEn.name.replace(/\s+/g, '') === "") {
            setErrorNameEn({ ...errorNameEn, onError: true })
            isOK = false
        }

        if (productFr.name.replace(/\s+/g, '') === "") {
            setErrorNameFr({ ...errorNameFr, onError: true })
            isOK = false
        }

        if (productImg === null) {
            setErrorPath({ ...errorPath, onError: true })
            console.log("va te faire")
            isOK = false
        }

        if (errorPrice.onError || productPrice.amount.toString().replace(/\s+/g, '') === "") {
            setErrorPrice({ ...errorPrice, onError: true })
            isOK = false
        }

        if (productSelected.productFamilies.length === 0) {
            setErrorCheckBox({ ...errorCheckBox, onError: true })
            isOK = false
        }

        return isOK;
    }

    const validationForm = async e => {
        if (!formIsOK()) {
            e.preventDefault();
            console.log("ca n'a pas du envoyer en théorie")
        }
        else {

            if (productSelected.id === null) {
                axios.post(`/products`, productSelected)
                    .then(res => {
                        let temp = productSelected;
                        temp.id = res.data.id;
                        setProductSelected(temp);

                        let tempPrice = productPrice;
                        tempPrice.amount = Number(productPrice.amount);
                        return axios.post(`/products/${productSelected.id}/prices/current`, productPrice);
                    })

                    .then(res => {
                        let prodtemp = productEn;
                        prodtemp.productId = productSelected.id;
                        setProductEn(prodtemp)
                        return axios.post(`/products/translations`, productEn);
                    })

                    .then(res => {
                        let prodtemp = productFr;
                        prodtemp.productId = productSelected.id;
                        setProductFr(prodtemp)
                        return axios.post(`/products/translations`, productFr);
                    })

                    .then(res => {
                        const file = fileInput.current.files[0];
                        const formData = new FormData();
                        formData.append('image', file);
                        return axios.post(`/products/${productSelected.id}/image`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    })
                    
                    .catch(error => {
                        alert(error.response.data)
                        console.log(error)
                    });

            }
            else {
                axios.put(`/products`, productSelected)
                .then(res => {
                    let tempPrice = productPrice;
                    tempPrice.amount = Number(productPrice.amount);

                    return axios.post(`/products/${productSelected.id}/prices/current`, productPrice);
                })

                .then(res => {
                    let prodtemp = productEn;
                    prodtemp.productId = productSelected.id;
                    setProductEn(prodtemp)
                    return axios.put(`/products/translations`, productEn);
                })

                .then(res => {
                    let prodtemp = productFr;
                    prodtemp.productId = productSelected.id;
                    setProductFr(prodtemp)
                    return axios.put(`/products/translations`, productFr);
                })

                .then(res => {
                    const file = fileInput.current.files[0];
                    const formData = new FormData();
                    formData.append('image', file);

                    return axios.post(`/products/${productSelected.id}/image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                })
                
                .catch(error => {
                    alert(error.response.data)
                    console.log(error)
                });
            }
        }

        e.preventDefault();
    }


    const errorInput = (error) => {
        let errorReturn;
        error.onError ? errorReturn = error.msg : errorReturn = ""
        return errorReturn;
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
                <TextField label="Name"
                    required
                    error={errorNameEn.onError}
                    helperText={errorInput(errorNameEn)}
                    className="inputName"
                    variant="outlined"
                    value={productEn.name}
                    onChange={e => changeName("fn", e)}
                    inputProps={{ maxLength: 100 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${productEn.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />

                <TextField label="Nom"
                    required
                    error={errorNameFr.onError}
                    helperText={errorInput(errorNameFr)}
                    className="inputName"
                    variant="outlined"
                    value={productFr.name}
                    onChange={e => changeName("fr", e)}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${productFr.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />
            </div>

            <div className="Img">
                
                <img  className="imgForm" src={productImg} alt={productSelected.imageName}/>
                
                <input type="file" ref={fileInput} accept="image/jpeg" onChange={changeImg} />
            </div>

            <div className="FamillyCheckBox">
                {(!isLoading) && (
                    <FormControl
                        required
                        error={errorCheckBox.onError}
                    >
                        <FormGroup>
                            <FormLabel component="legend">Famille du produit</FormLabel>
                            {famillyList.data.map((familly) => {
                                return <FormControlLabel key={familly.id} label={familly.name}
                                    control={<Checkbox key={familly.id} checked={isCheckedFamilly(familly.productFamilyId)} onChange={e => handleChangeCheck(e, familly.productFamilyId)} />} />
                            })}
                            <FormHelperText>{errorCheckBox.msg}</FormHelperText>
                        </FormGroup>
                    </FormControl>
                )}

            </div>

            <div className="bottomForm">
                <FormControlLabel label={productSelected.onMenu ? "Disponble" : "Indisponible"}
                    control={<Switch checked={productSelected.onMenu}
                        onChange={handleChangeOnMenu}
                    />} />

                <OutlinedInput
                    className="price"
                    error={errorPrice.onError}
                    // helperText={errorInput(errorPrice)}
                    value={productPrice.amount}
                    // onKeyPress={onlyNumber}
                    onChange={changePrice}
                    onBlur={changePrice}
                    endAdornment={"€"}
                />

            </div>
            <div className="buttonFormProduct">
                <Button variant="contained" type="" onClick={validationForm}>
                    {productSelected.id === null ? "Ajouter" : "Modifier"}
                </Button>
                <Button variant="contained" onClick={cancel}>Annuler</Button>
            </div>

        </Box>
    )
}

export default ProductForm