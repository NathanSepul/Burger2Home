import React, {useState,useEffect} from "react"
import ProductList from "./product/ProductList.js"

const Burger = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [burgers, setBurgers] = useState([]);

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
                <ProductList products={burgers} />
            </section>
        </div>
    );
}

export default Burger