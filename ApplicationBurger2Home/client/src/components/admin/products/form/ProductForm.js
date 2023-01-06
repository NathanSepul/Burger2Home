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
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from "buffer";
import { useTranslation } from 'react-i18next';
import { open } from '../../../../redux/snackBarSlice.js';

import IngredientsTransfert from "./IngredientsTransfert.js";
import "./ProductForm.css"


const ProductForm = ({ ps, setPS, setReloadList }) => {
    const initialStatePS = { id: null, imageName: null, ingredients: [], productFamilies: [], onMenu: false, typeId:null};
    const initialStateFr = { id: null, description: "", name: "", language: { id: 2 }, productId: "" };
    const initialStateEn = { id: null, description: "", name: "", language: { id: 1 }, productId: "" };
    const initialStatePrice = { amount: "" }
    const initialStateImg = { img: null, toLoad: false }

    const [productSelected, setProductSelected] = useState(initialStatePS);
    const [productEn, setProductEn] = useState(initialStateEn);
    const [productFr, setProductFr] = useState(initialStateFr);
    const [productPrice, setProductPrice] = useState(initialStatePrice);
    const [productImg, setProductImg] = useState(initialStateImg);
    const [typeList, setTypeList] = useState();
    const [ingredientList, setIngredientList] = useState([]);
    const [allTypeTranslation, setAllTypeTranslation] = useState({ en: [], fr: [] })

    const fileInput = useRef(null);

    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language)
    const dispatch = useDispatch();
    const openSnack = { msg: "", severity: "" }

    const { t } = useTranslation();

    useEffect(()=>{
        axios.get(`/types/translations`)
        .then(res =>{
            let tempEnType = [];
            let tempFrType = [];

            res.data.forEach(e => {
                e.language.abbreviation === "EN" ? tempEnType.push(e) : tempFrType.push(e)
            });

            tempEnType = tempEnType.sort((a, b) => a.name > b.name ? 1 : -1)
            tempFrType = tempFrType.sort((a, b) => a.name > b.name ? 1 : -1)

            setAllTypeTranslation({ en: tempEnType, fr: tempFrType });

            languageRedux.value === "EN" ? setTypeList(tempEnType) : setTypeList(tempFrType)

            setIsLoading(false)
        })
        .catch(e => console.log(e))

    },[])


    useEffect(() => {
        cancel()
        if (ps.id !== null) {
            const request0 = axios.get(`/products/${ps.id}`);
            const request1 = axios.get(`/products/${ps.id}/translations`);
            const request2 = axios.get(`/products/${ps.id}/prices/current`);
            const request3 = axios.get(`/products/${ps.id}/image`, { responseType: 'arraybuffer' });
            
            axios.all([request0, request1, request2, request3])
                .then(
                    axios.spread((...res) => {
                        setProductSelected(res[0].data);
                        let tempEnProd = productEn;
                        tempEnProd.id = res[1].data[0].id;
                        tempEnProd.productId = res[1].data[0].productId;
                        tempEnProd.name = res[1].data[0].name;
                        tempEnProd.description = res[1].data[0].description;
                        setProductEn(tempEnProd)

                        let tempFrProd = productFr;
                        tempFrProd.id = res[1].data[1].id;
                        tempFrProd.productId = res[1].data[1].productId;
                        tempFrProd.name = res[1].data[1].name;
                        tempFrProd.description = res[1].data[1].description;
                        setProductFr(tempFrProd)

                        setProductPrice({ ...productPrice, amount: res[2].data.amount })

                        const imageBuffer = Buffer.from(res[3].data, 'binary');
                        const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');

                        setProductImg({ img: imageString, toLoad: false })
                            
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

        fileInput.current.value = null;
    }


    const firstToCapitalLetter = (lg, field, e) => {

        const firstLetter = e.target.value.charAt(0).toUpperCase();
        const restOfString = e.target.value.slice(1);
        const capitalizedString = firstLetter + restOfString;

        if (lg === "fr" && field === "name") {
            setProductFr({ ...productFr, name: capitalizedString })
        }
        else if (lg === "en" && field === "name") {
            setProductEn({ ...productEn, name: capitalizedString })
        }
        else if (lg === "fr" && field === "desc") {
            setProductFr({ ...productFr, description: capitalizedString })
        }
        else {
            setProductEn({ ...productEn, description: capitalizedString })
        }
    }


    const changeImg = e => {
        const file = fileInput.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProductImg({ img: reader.result, toLoad: true })
        };

        if (file !== undefined) {
            reader.readAsDataURL(file);
        }
        else {
            setProductImg(initialStateImg)
        }
    }

    const isCheckedType = (id) => {
        let isFound = false;

        productSelected.typeId === id ? isFound = true : isFound = false;

        return isFound ;
    }

    const handleChangeCheck = (typeId) => {
        setProductSelected({ ...productSelected, typeId: typeId })
    }

    const handleChangeOnMenu = e => {
        setProductSelected({ ...productSelected, onMenu: e.target.checked })
    }

    const formIsOK = () => {

        let isOK = true;
        let msgImg = "";
        let msgFam = ""

        if (productImg.img === null && productImg.toLoad === false) {
            msgImg = "Veuillez selectionnr une image"
            isOK = false
        }

        const temp = productSelected;
        temp.ingredients = ingredientList
        setProductSelected(temp)

        openSnack.msg = <>
            <p>{msgImg}</p>
            <p>{msgFam}</p>
        </>
        return isOK;
    }

    const validationForm = async e => {
        if (!formIsOK()) {
            openSnack.severity = "warning";
            dispatch(open(openSnack))
            e.preventDefault();
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

                    .then(res => {
                        openSnack.msg = "Le produit a été ajouté"
                        openSnack.severity = "info";
                        dispatch(open(openSnack))
                        setReloadList(true)
                    })

                    .catch(error => {
                        openSnack.msg = "Le produit n'a pas pus être ajouté"
                        openSnack.severity = "warning";
                        dispatch(open(openSnack))
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
                        if (productImg.toLoad) {
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

                    .then(res => {
                        openSnack.msg = "Le produit a été modifié"
                        openSnack.severity = "info";
                        dispatch(open(openSnack))
                        setReloadList(true)
                    })

                    .catch(error => {
                        openSnack.msg = "Le produit n'a pas pus être modifié"
                        openSnack.severity = "warning";
                        dispatch(open(openSnack))
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
            onSubmit={validationForm}
            sx={{
                '& > :not(style)': { m: "auto", width: "100%" },
            }}
        >
            <div className="Name">
                <TextField label="Name"
                    required
                    className="inputName"
                    variant="outlined"
                    value={productEn.name}
                    onChange={e => firstToCapitalLetter("en", "name", e)}
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
                    className="inputName"
                    variant="outlined"
                    value={productFr.name}
                    onChange={e => firstToCapitalLetter("fr", "name", e)}
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
                    onChange={e => firstToCapitalLetter("en", "desc", e)}
                    multiline
                    maxRows={4}
                />

                <TextField label="Description Fr"
                    required
                    className="inputDescriptionFr"
                    variant="outlined"
                    value={productFr.description}
                    onChange={e => firstToCapitalLetter("fr", "desc", e)}
                    multiline
                    maxRows={4}
                />
            </div>

            <div className="Img">
                {productImg.img === null && productImg.toLoad === false ?
                    <img className="imgForm" />

                    :
                    <img className="imgForm" src={productImg.img} alt={productSelected.imageName} />
                }
                <input type="file" ref={fileInput} accept="image/jpeg" onChange={changeImg} />
            </div>

            <div className="PriceAndSwitch">
                <FormControlLabel
                    label={productSelected.onMenu ? t('gestionProduit.form.disponible') : t('gestionProduit.form.indisponible')}
                    control={<Switch checked={productSelected.onMenu} onChange={handleChangeOnMenu} />}
                />

                <TextField label="Prix"
                    required
                    placeholder='ex: 2.1'
                    className="price"
                    value={productPrice.amount || ''}
                    onChange={e => setProductPrice({ ...productPrice, amount: e.target.value })}
                    inputProps={{ inputMode: 'decimal', pattern: '^\\d+(\\.\\d{1,2})?$' }}

                    InputProps={{
                        endAdornment: (<InputAdornment position="end" > € </InputAdornment>),
                    }} />
            </div>

            <div className="FamillyCheckBox">
                <FormLabel sx={{ color: "black" }} className="titreCheck">Type</FormLabel>

                {(!isLoading) && (
                    <FormControl
                        required
                        component="fieldset"
                    >
                        <FormGroup row className="checkBoxGroupFam">
                            {typeList.map((type) => {
                                return <FormControlLabel key={type.id} label={type.name} labelPlacement="top"
                                    control={<Checkbox key={type.typeId} checked={isCheckedType(type.typeId)} onChange={() => handleChangeCheck(type.typeId)} />} 
                                    />
                            })}


                        </FormGroup>
                    </FormControl>
                )}

            </div>

            <div className="ingredientTransfertList">
                <label className="ingredientTitle">{t('gestionProduit.form.ingredient')}</label>
                <IngredientsTransfert ps={productSelected} setIngredientList={setIngredientList} />
            </div>

            <div className="bottomForm">
                <Button variant="contained" type="submit">
                    {productSelected.id === null ? t('admin.ajouter') : t('admin.modifier')}
                </Button>
                <Button variant="contained" onClick={cancel}> {t('admin.nettoyer')} </Button>
            </div>

        </Box>
    )
}

export default ProductForm