import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector} from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import axios from 'axios';

import Filtre from "./Filtre.js"
import TrisProduct from "./TrisProduct.js";
import ProductList from "../productInformation/ProductList.js";
import Loading from "../../loading/Loading.js";

const SideBurger = () => {
    const tris = [{ id: 1, name: "Alphabétique" }, { id: 2, name: "Prix croissant" }, { id: 3, name: "Prix décroissant" }]

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sides, setSides] = useState([]);
    const languageRedux = useSelector(state => state.language);

    const [productFiltred, setProductFiltred] = useState({ tab: [] });
    const [allergens, setAllergens] = useState({ values: [] })
    const [available, setAvailable] = useState({ values: [{ id: 0, name: "Disponible", checked: false }] })
    const [inPromotion, setInPromotion] = useState({ values: [{ id: 0, name: "En Promotion", checked: false }] })
    const [filtre, setFiltre] = useState(1)

    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}&mustBeOnMenu=true&availableProductsOnly=false&type=3`)
            .then((res) => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setSides(temp);
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
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux.value])

    // filtre à proprement dit
    useEffect(() => {
        let productFiltredTemp = sides

        allergens.values.forEach(e => {
            if (e.checked) {
                productFiltredTemp = productFiltredTemp.filter(si => !si.allergens.some(a => a === e.name))
                // setProductFiltred({...productFiltred, tab:productFiltredTemp})
            }
        })

        if (available.values[0].checked) {
            productFiltredTemp = productFiltredTemp.filter(si => si.available)
            // setProductFiltred({...productFiltred, tab:productFiltredTemp})
        }

        if (inPromotion.values[0].checked) {
            productFiltredTemp = productFiltredTemp.filter(si => si.currentDiscount !== null)
            // setProductFiltred({...productFiltred, tab:productFiltredTemp})
        }

        setProductFiltred({ ...productFiltred, tab: productFiltredTemp })

// eslint-disable-next-line react-hooks/exhaustive-deps
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
// eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <h4>Accompagnements</h4>
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

export default SideBurger