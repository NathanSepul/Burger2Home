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
import { useTranslation } from 'react-i18next';

import IngredientsTransfert from "./IngredientsTransfert.js";
import "./ProductForm.css"


const ProductForm = ({ ps, setPS, setReloadList}) => {
    const initialStatePS = { id: null, imageName: null, ingredients: [], productFamilies: [], onMenu: false };
    const initialStateFr = { id: null, description: "", name: "", language: { id: 2 }, productId: "" };
    const initialStateEn = { id: null, description: "", name: "", language: { id: 1 }, productId: "" };
    const initialStatePrice = { amount: "" }
    const initialStateImg = {img:null, toLoad:false}

    const [productSelected, setProductSelected] = useState(initialStatePS);
    const [productEn, setProductEn] = useState(initialStateEn);
    const [productFr, setProductFr] = useState(initialStateFr);
    const [productPrice, setProductPrice] = useState(initialStatePrice);
    const [productImg, setProductImg] = useState(initialStateImg);
    const [famillyList, setFamillyList] = useState();
    const [ingredientList, setIngredientList] = useState([]);

    const fileInput = useRef(null);


    const [isLoading, setIsLoading] = useState(true);

    const [errorNameFr, setErrorNameFr] = useState({ onError: false, msg: 'Le champ ne peut être vide' });
    const [errorNameEn, setErrorNameEn] = useState({ onError: false, msg: 'Le champ ne peut être vide' });
    const [errorPath, setErrorPath] = useState({ onError: false, msg: 'Il faut une image' });
    const [errorCheckBox, setErrorCheckBox] = useState({ onError: false, msg: 'Il faut choisir une case' })
    const [errorPrice, setErrorPrice] = useState({ onError: false, msg: 'La valeur ne respecte pas les critères' });
    const [errroIngredients, setErrorIngredients] = useState({ onError: false, msg: 'Il faut au moins un ingrédient' });

    const languageRedux = useSelector(state => state.language)
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`/products/families/translations?language=${languageRedux.value}`)
            .then( res =>{
                    setFamillyList(res)
                    setIsLoading(false)
            })
            .catch(e => {
                console.error(e);
            });

    }, [languageRedux])
   
    

    useEffect(() => {
       cancel()
      
        if (ps.id !== null) {
            
            const requestOne = axios.get(`/products/${ps.id}`);
            const requestThree = axios.get(`/products/${ps.id}/translations`);
            const requestFour = axios.get(`/products/${ps.id}/prices/current`);
            const requestFive = axios.get(`/products/${ps.id}/image`, { responseType: 'arraybuffer' });


            axios.all([requestOne, requestThree, requestFour, requestFive])
                .then(
                    axios.spread((...responses) => {
                        setProductSelected(responses[0].data);

                        let tempEn = productEn;
                        tempEn.id = responses[1].data[0].id;
                        tempEn.productId = responses[1].data[0].productId;
                        tempEn.name = responses[1].data[0].name;
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
                       
                        setProductImg({img:imageString, toLoad:false})

                    })
                )
                .catch(e => {
                    console.error(e);
                });
        }
// eslint-disable-next-line
    }, [ps.id])


    const cancel = () => {
        setPS(initialStatePS);
        setProductSelected(initialStatePS);
        setProductEn(initialStateEn);
        setProductFr(initialStateFr);
        setProductPrice(initialStatePrice);
        setProductImg(initialStateImg);
        setIngredientList([])

        setErrorNameFr({ ...errorNameFr, onError: false });
        setErrorNameEn({ ...errorNameEn, onError: false });
        setErrorPath({ ...errorPath, onError: false });
        setErrorCheckBox({ ...errorCheckBox, onError: false });
        setErrorPrice({ ...errorPrice, onError: false });
        fileInput.current.value = null;
    }

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

    const changeDescription = (lg, e) => {
        if (lg === "fr") {
            setProductFr({ ...productFr, description: e.target.value })
        }
        else {
            setProductEn({ ...productEn, description: e.target.value })
        }
    }


    const changeImg = e => {
        const file = fileInput.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProductImg({img :reader.result, toLoad:true})

        };

        if (file !== undefined) {
            reader.readAsDataURL(file);
            setErrorPath({ onError: false, msg: "" })
        }
        else {
            setProductImg(initialStateImg)
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
    
    const handleChangeCheck = (event, famillyId) => {
        setErrorCheckBox({ onError: false, msg: "" })
        setProductSelected({ ...productSelected, productFamilies: [{ id: famillyId }] })

    }

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

        if (productImg.img === null && productImg.toLoad === false) {
            setErrorPath({ ...errorPath, onError: true })
            isOK = false
        }

        if (errorPrice.onError || productPrice.amount.toString().replace(/\s+/g, '') === "") {
            setErrorPrice({ ...errorPrice, onError: true })
            isOK = false
        }

        if (ingredientList.length === 0) {
            setErrorIngredients({ ...errroIngredients, onError: true })
            isOK = false
        }
        else{
            
            const temp = productSelected;
            temp.ingredients = ingredientList
            setProductSelected(temp)
            setErrorIngredients({ ...errroIngredients, onError: false })
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
        }
        else {

            console.log(productSelected)
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
                        let tempTrad = productEn
                        tempTrad.id = res.data.id;
                        setProductEn(tempTrad)

                        let prodtemp = productFr;
                        prodtemp.productId = productSelected.id;
                        setProductFr(prodtemp)
                        return axios.post(`/products/translations`, productFr);
                    })

                    .then(res => {
                        let tempTrad = productFr
                        tempTrad.id = res.data.id;
                        setProductFr(tempTrad)

                        const file = fileInput.current.files[0];
                        const formData = new FormData();

                        formData.append('image', file);
                        return axios.post(`/products/${productSelected.id}/image`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    })

                    .then(res =>{
                        setReloadList(true)
                    })

                    .catch(error => {
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
                        if(productImg.toLoad){
                            const file = fileInput.current.files[0];
                            const formData = new FormData();
                            formData.append('image', file);
                            return axios.post(`/products/${productSelected.id}/image`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                        }
                    })

                    .then(res =>{
                        setReloadList(true)
                    })

                    .catch(error => {
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
                    onChange={e => changeName("en", e)}
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
                    inputProps={{ maxLength: 100 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${productFr.name.length}/${100}`}
                            </InputAdornment>
                        ),
                    }} />
            </div>

            <div className="Description">
                <TextField label="Description En"
                    required
                    className="inputDescriptionEn"
                    variant="outlined"
                    value={productEn.description}
                    onChange={e => changeDescription("en", e)}
                    multiline
                    maxRows={4}
                />

                <TextField label="Description Fr"
                    required
                    className="inputDescriptionFr"
                    variant="outlined"
                    value={productFr.description}
                    onChange={e => changeDescription("fr", e)}
                    multiline
                    maxRows={4}
                />
            </div>
            <div className="Img">
                <img className="imgForm" src={productImg.img} alt={productSelected.imageName} />
                <input type="file" ref={fileInput} accept="image/jpeg" onChange={changeImg}/>
            </div>



            <div className="bottomForm">
                <FormControlLabel label={productSelected.onMenu ? t('gestionProduit.form.disponible') : t('gestionProduit.form.indisponible')}
                    control={<Switch checked={productSelected.onMenu}
                        onChange={handleChangeOnMenu}
                    />} />
                <div className="inputPrice">
                    <OutlinedInput
                        className="price"
                        error={errorPrice.onError}
                        value={productPrice.amount}
                        onChange={changePrice}
                        onBlur={changePrice}
                        endAdornment={"€"}
                    />

                    {errorPrice.onError && (
                        <div>
                            <FormHelperText sx={{ color: "rgb(210,48,47)" }}>{errorPrice.msg}</FormHelperText>
                        </div>
                    )}
                </div>


            </div>

            <div className="FamillyCheckBox">
                    <FormLabel sx={{color:"black"}} className="titreCheck">{t('gestionProduit.form.famille')}</FormLabel>

                {(!isLoading) && (
                    <FormControl
                        required
                        error={errorCheckBox.onError}
                        component="fieldset"
                    >
                        <FormGroup row className="checkBoxGroupFam">
                            {famillyList.data.map((familly) => {
                                return <FormControlLabel key={familly.id} label={familly.name} labelPlacement="top"
                                    control={<Checkbox key={familly.id} checked={isCheckedFamilly(familly.productFamilyId)} onChange={e => handleChangeCheck(e, familly.productFamilyId)} />} />
                            })}


                        </FormGroup>
                    </FormControl>
                )}
                {errorCheckBox.onError && (
                    <FormHelperText sx={{ color: "rgb(210,48,47)", textAlign:"center" }}>{errorCheckBox.msg}</FormHelperText>
                )}
            </div>

            <div className="ingredientTransfertList">
                <label className="ingredientTitle">{t('gestionProduit.form.ingredient')}</label>
                <IngredientsTransfert ps={productSelected} setIngredientList={setIngredientList}/>
            </div>

            <div className="buttonFormProduct">
                <Button variant="contained" type="" onClick={validationForm}>
                    {productSelected.id === null ? t('admin.ajouter') : t('admin.modifier') }
                </Button>
                <Button variant="contained" onClick={cancel}> {t('admin.nettoyer')} </Button>
            </div>

        </Box>
    )
}

export default ProductForm