import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import ProductList from "../productInformation/ProductList.js";
import Loding from "../../loding/Loding.js";
import "./Product.css";


const SideBurger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sides, setSides] = useState([]);

    const openSnack = {msg:"", severity:""};
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetch("./sideBurger.json")
            .then(res => res.json())
            .then((data) => {
                setIsLoading(false);
                setSides(data)
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
                <div className="filtre">
                    <h3> filtre</h3>
                    <ul>
                        <li>type</li>
                    </ul>
                </div>

                <section className='produits'>
                    <ProductList products={sides}/>
                </section>
            </div>
        );
    }
}

export default SideBurger