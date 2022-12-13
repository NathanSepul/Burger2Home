import React from "react"
import ProductMiniature from "./ProductMiniature.js"
import "./ProductList.css"

const ProductList = ({products}) => {

    let result;

    return (
        <div className="list">
            {products.map((product) => ( <ProductMiniature product={product} key={product.id}/>))} 
        
        </div>
    );
}

export default ProductList;