import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import ProductList from "../productInformation/ProductList.js";
import Loading from "../../loading/Loading.js";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Filtre from "./Filtre.js"
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TrisProduct from "./TrisProduct.js";


const Burger = () => {
    const tris = [{ id: 1, name: "Alphabétique" }, { id: 2, name: "Prix croissant" }, { id: 3, name: "Prix décroissant" }]

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [drinks, setDrinks] = useState([]);
    const languageRedux = useSelector(state => state.language);

    const [productFiltred, setProductFiltred] = useState({ tab: [] });
    const [allergens, setAllergens] = useState({ values: [] })
    const [available, setAvailable] = useState({ values: [{ id: 0, name: "Disponible", checked: false }] })
    const [inPromotion, setInPromotion] = useState({ values: [{ id: 0, name: "En Promotion", checked: false }] })
    const [filtre, setFiltre] = useState(1)

    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}&mustBeOnMenu=true&availableProductsOnly=false&type=2`)
            .then((res) => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setDrinks(temp);
                setProductFiltred({ ...productFiltred, tab: temp })
                return axios.get(`/allergens/translations?language=${languageRedux.value}`)
            })
            .then((res) => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                let allergensT = { values: [] }

                allergensT.values = temp.map(e => {
                    let i = allergens.values.findIndex(a => a.id === e.allergenId)
                    let checked;
                    (i !== -1) ? checked = allergens.values[i].checked : checked = false

                    return { id: e.allergenId, name: e.name, checked: checked }
                })

                setAllergens(allergensT)
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux.value])

    // filtre à proprement dit
    useEffect(() => {
        let productFiltredTemp = drinks

        allergens.values.forEach(e => {
            if (e.checked) {
                productFiltredTemp = productFiltredTemp.filter(dr => !dr.allergens.some(a => a === e.name))
                // setProductFiltred({ ...productFiltred, tab: productFiltredTemp })
            }
        })

        if (available.values[0].checked) {
            productFiltredTemp = productFiltredTemp.filter(dr => dr.available)
            // setProductFiltred({ ...productFiltred, tab: productFiltredTemp })
        }

        if (inPromotion.values[0].checked) {
            productFiltredTemp = productFiltredTemp.filter(dr => dr.currentDiscount !== null)
            // setProductFiltred({ ...productFiltred, tab: productFiltredTemp })
        }

        setProductFiltred({ ...productFiltred, tab: productFiltredTemp })

    }, [allergens, available, inPromotion, languageRedux.value])

    //tris
    useEffect(() => {

        let temp = productFiltred

        let toCompare = parseInt(filtre, 10)

        if (toCompare === 1) {
            temp = temp.tab.sort((a, b) => (a.name > b.name ? 1 : -1)); // alpha
        }
        else if (toCompare === 2) {
            temp = temp.tab.sort((a, b) => (a.actualPrice > b.actualPrice ? 1 : -1)); // croissant
        }
        else {
            temp = temp.tab.sort((a, b) => (a.actualPrice < b.actualPrice ? 1 : -1)); //décroissantt
        }
        setProductFiltred({ ...productFiltred, tab: temp })

    }, [filtre])

    if (hasError) {
        openSnack.msg = "Les données n'ont pas pu être chargée";
        openSnack.severity = "error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loading />;
    }

    else {
        return (
            <div className="globalCarte">
                <TrisProduct tris={tris} setFiltre={setFiltre} />

                <div className="carteContent">
                    <div className="filtre">
                        <h4>Boissons</h4>
                        <FormControl component="fieldset" variant="outlined" className="filtreBurger">
                            <FormLabel className="titleFiltre" component="legend">Ne contenant pas :</FormLabel>
                            <Filtre ValueList={allergens} SetValueList={setAllergens} />

                            <FormLabel className="titleFiltre" component="legend">Disponibilité</FormLabel>
                            <Filtre ValueList={available} SetValueList={setAvailable} />

                            <FormLabel className="titleFiltre" component="legend">Promotion</FormLabel>
                            <Filtre ValueList={inPromotion} SetValueList={setInPromotion} />
                        </FormControl>
                    </div>

                    <section className='produits'>
                        {productFiltred.length !== 0 ? <ProductList products={productFiltred.tab} />
                            : <p className="NoResult"> Aucun produit ne correspond à la selection</p>
                        }
                    </section>
                </div>
            </div>
        );
    }
}

export default Burger