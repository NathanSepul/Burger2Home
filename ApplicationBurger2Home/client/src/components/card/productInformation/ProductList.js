import React from "react"
import ProductMiniature from "./ProductMiniature.js";

import "./ProductList.css"

const ProductList = ({ products }) => {


    return (
        <div className="list">
            {products.map((product) => (
                    <ProductMiniature key={product.name} product={product}  />
            ))}
        </div>
    );
}

export default ProductList;
