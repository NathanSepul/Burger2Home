import React, { useState, useEffect } from "react"
import ProductList from "./product/ProductList.js"

const SideBurger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sides, setSides] = useState([]);

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

    return (
        <div className="globalCarte">
            <div className="filtre">
                <h3> filtre</h3>
                <ul>
                    <li>type</li>
                </ul>
            </div>

            <section className='produits'>
                <ProductList products={sides} hadExtra="none" />
            </section>
        </div>
    );
}

export default SideBurger