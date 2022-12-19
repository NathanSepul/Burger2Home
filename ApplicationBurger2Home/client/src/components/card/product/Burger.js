import React, { useState, useEffect } from "react"

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import ProductList from "../productInformation/ProductList.js";
import Loding from "../../loding/Loding.js"
import axios from 'axios';
import { useSelector } from 'react-redux';

import "./Product.css";

const Burger = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [burgers, setBurgers] = useState([]);
    const languageRedux = useSelector(state => state.language);

    const openSnack = { msg: "", severity: "" };
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}&availableProductsOnly=false&productFamily=1`)
            .then((response) => {
                setIsLoading(false);
                setBurgers(response.data);
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
                <div className="filtre">
                    <h4> filtre</h4>
                    <FormControl component="fieldset" variant="outlined" className="filtreBurger">
                        <FormLabel className="titleFiltre" component="legend">Catégories</FormLabel>
                        <FormGroup className="filtreCheckBox">
                            <FormControlLabel
                                control={<Checkbox name="Classiques" size="small" />}

                                label={"Les Classiques"}
                            />
                            <FormControlLabel
                                control={<Checkbox name="Healthy" size="small" />}
                                label={"Les 'Healthy'"}
                            />
                        </FormGroup>

                        <FormLabel className="titleFiltre" component="legend">Allergènes</FormLabel>
                        <FormGroup className="filtreCheckBox">
                            <FormControlLabel
                                control={<Checkbox name="Gluten" size="small" />}
                                label={"Gluten"}
                            />
                            <FormControlLabel
                                control={<Checkbox name="Lactose" size="small" />}
                                label={"Lactose"}
                            />
                        </FormGroup>
                    </FormControl>
                </div>

                <section className='produits'>
                    <ProductList products={burgers} />
                </section>
            </div>
        );
    }
}

export default Burger