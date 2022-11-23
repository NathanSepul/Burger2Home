import React, {useState,useEffect} from "react"
import ProductMiniature from "./ProductMiniature.js"
import "./ProductList.css"
const ProductList = () => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {

        // setHasError(false);
        setIsLoading(true);

        fetch("./product.json")
            .then(response => response.json())

            .then(data => {
                setIsLoading(false);
                setProducts(data);

            })

            .catch(() => {
                setHasError(true);
            });

    }, []);

    return (
        <div className="list">
            {
                products.map(product => ( <ProductMiniature product={product} key={product.id}/>))
            } 
        </div>
      

    );
}

export default ProductList;