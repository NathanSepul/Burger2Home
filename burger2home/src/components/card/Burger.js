import React, { useState, useEffect } from "react"
import ProductList from "./product/ProductList.js";
import Loding from "../loding/Loding.js"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


import "./Burger.css";
const Burger = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [burgers, setBurgers] = useState([]);

    // const [filtre, setFiltre] = useState({
    //     classique: false,
    //     healthy: false,
    //     gluten: false,
    //     lactose: false
    // })

    useEffect(() => {
        setIsLoading(true);

        fetch("./burgers.json")
            .then(res => res.json())
            .then((data) => {
                setIsLoading(false);
                setBurgers(data)
            })
            .catch(() => {
                setHasError(true);
            })
    }, []);

    // const handleChange = (event, tt) => {
    //     setFiltre(previousState => {
    //         return { ...previousState, classique: event.target.checked }
    //     });

    // };

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