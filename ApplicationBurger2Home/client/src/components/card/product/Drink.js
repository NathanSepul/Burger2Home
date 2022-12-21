import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import ProductList from "../productInformation/ProductList.js";
import Loding from "../../loding/Loding.js";
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./Product.css";


const Burger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [drinks, setDrinks] = useState([]);
    const languageRedux = useSelector(state => state.language);

    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}&mustBeOnMenu=true&availableProductsOnly=false&productFamily=3`)
            .then((response) => {
                setIsLoading(false);
                setDrinks(response.data);
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux])

    if (hasError) {
        openSnack.msg = "Les données n'ont pas pu être chargée";
        openSnack.severity = "error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loding />;
    }

    else {
        return (
            <div className="globalCarte">
                <section className='produits'>
                    <ProductList products={drinks} />
                </section>
            </div>
        );
    }
}

export default Burger