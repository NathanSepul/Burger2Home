import React, { useState, useEffect } from "react"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import ProductList from "../productInformation/ProductList.js";
import Loading from "../../loading/Loading.js"
import axios from 'axios';
import { useSelector } from 'react-redux';
import Filtre from "./Filtre.js"
import "./Product.css";

const Burger = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [burgers, setBurgers] = useState([]);
    const [burgersFiltred, setBurgersFiltred] = useState([]);

    const [allergens, setAllergens] = useState({ values: [] })
    const [available, setAvailable] = useState({ values: [{ id: 0, name: "Disponible", checked: false }] })
    const [inPromotion, setInPromotion] = useState({ values: [{ id: 0, name: "En Promotion", checked: false }] })


    const languageRedux = useSelector(state => state.language);
    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/products/summaries?language=${languageRedux.value}&mustBeOnMenu=true&availableProductsOnly=false&type=1`)
            .then((res) => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setBurgers(temp);
                setBurgersFiltred(temp)

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

    useEffect(() => {
        let burgersFiltredTemp = burgers

        allergens.values.forEach(e => {
            if (e.checked) {
                burgersFiltredTemp = burgersFiltredTemp.filter(bu => !bu.allergens.some(a => a === e.name))
                setBurgersFiltred(burgersFiltredTemp)
            }
        })

        if (available.values[0].checked) {
            burgersFiltredTemp = burgersFiltredTemp.filter(bu => bu.available)
            setBurgersFiltred(burgersFiltredTemp)
        }

        if (inPromotion.values[0].checked) {
            burgersFiltredTemp = burgersFiltredTemp.filter(bu => bu.currentDiscount !== null)
            setBurgersFiltred(burgersFiltredTemp)
        }

        setBurgersFiltred(burgersFiltredTemp)

    }, [allergens, available, inPromotion, languageRedux.value])

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
                <div className="filtre">
                    <h4>Burgers</h4>
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
                    {burgersFiltred.length !== 0 ? <ProductList products={burgersFiltred} />
                        : <p className="NoResult"> Aucun produit ne correspond à la selection</p>
                    }

                </section>
            </div>
        );
    }
}

export default Burger