import React from "react"
import ProductMiniature from "./ProductMiniature.js"
import { Badge } from "@mui/material";

import "./ProductList.css"

const ProductList = ({ products }) => {

    const badgeStyle = {
        "& .MuiBadge-badge": {
          width: 40,
          height: 40,
          borderRadius: '50%',
          fontSize:"0.9rem",
        }
      }
      

    return (
        <div className="list">
            {products.map((product) => (
                <>
                    {product.currentDiscount === 0 ?
                        <ProductMiniature product={product} key={product.id} />
                        :
                        <Badge badgeContent={"-"+product.currentDiscount + "%"} color="primary" sx={badgeStyle} className="badgePromo">
                            <ProductMiniature product={product} key={product.id} />
                        </Badge>

                    }
                </>
                // <ProductMiniature product={product} key={product.id}/>

            ))}

        </div>
    );
}

export default ProductList;