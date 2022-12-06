import React, { useState, useEffect } from "react"
import ProductList from "./product/ProductList.js"
import Loding from "../loding/Loding.js"

const Burger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [drinks, setDrinks] = useState([]);

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