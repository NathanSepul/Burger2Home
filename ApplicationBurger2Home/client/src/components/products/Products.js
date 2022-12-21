import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loding from "../loding/Loding.js"
import TabProducts from "./tabproduct/TabProducts.js";
import axios from 'axios';

import SelectFamilly from "./filtre/SelectFamilly.js";
import ProductForm from "./form/ProductForm.js"
import "./Products.css"

const Products = () => {
    const initialState = {id:"",name:"",description:"",currentPrice:"",currentDiscount:"",imageUrl:"", ingredients:[], allergens:[], onMenu:false};
    const [products, setProducts] = useState([]);
    const [productSelected, setProductSelected] = useState(initialState);
    

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [famillyId, setFamillyId] = useState("");
    const { t } = useTranslation();
    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        setProductSelected(initialState)
        axios.get(`/products/summaries?language=${languageRedux.value}&availableProductsOnly=false&productFamily=${famillyId}`)
            .then((data) => {
                setIsLoading(false);
                setProducts(data.data);
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux, famillyId])

   
    

    return (
        <main className='productAdmin'>
            <title>Burger2Home | {t('navigation.produits')}</title>
            <div className="title"><h1>Gestion des produits</h1></div>

            <div className="productFiltre">
                <SelectFamilly setFamillyId={setFamillyId}/>
            </div>

            <div className="productContent">

                <div className="productList">
                    {isLoading ? <Loding /> : <TabProducts products={products} setProductSelected={setProductSelected}/>}
                </div>

                <div className="productForm">
                    <ProductForm productSelected={productSelected} setProductSelected={setProductSelected}/>
                </div>

                {/* <div className="productForm">
                    {isLoading  ? <Loding/> : <TabProducts products={products}/>}
                </div> */}
            </div>



        </main>
    );
}

export default Products