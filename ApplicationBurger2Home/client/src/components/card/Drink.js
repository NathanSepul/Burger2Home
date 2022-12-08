import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { open } from '../../redux/snackBarSlice.js';
import ProductList from "./product/ProductList.js";
import Loding from "../loding/Loding.js";

const Burger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [drinks, setDrinks] = useState([]);

    const openSnack = {msg:"", severity:""};
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetch("./drinks.json")
            .then(res => res.json())
            .then((data) => {
                setIsLoading(false);
                setDrinks(data)
            })
            .catch(() => {
                setHasError(true);
            });

    }, []);

    if (hasError) {
        openSnack.msg="Les données n'ont pas pu être chargée";
        openSnack.severity="error";
        dispatch(open(openSnack))
    }

    if (isLoading) {
        return <Loding />;
    }

    else {
        return (
            <div className="globalCarte">
                <section className='produits'>
                    <ProductList products={drinks}/>
                </section>
            </div>
        );
    }
}

export default Burger