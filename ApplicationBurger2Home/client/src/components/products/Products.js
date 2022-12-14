import React, {useEffect,useState} from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loding from "../loding/Loding.js"
import TabProducts from "./tabproduct/TabProducts.js";
import axios from 'axios';

import "./Products.css"

const Products = () => {

    const [products, setProducts] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { t } = useTranslation();
    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}&availableProductsOnly=false`)
            .then((data) => {
                setIsLoading(false);
                setProducts(data.data);
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux])

    return (
        <main className='product'>
            <title>Burger2Home | {t('navigation.produits')}</title>
            <div className="title"><h1>Gestion des produits</h1></div>
            <div className="productContent">
                <div className="productLis">
                    {isLoading  ? <Loding/> : <TabProducts products={products}/>}
                </div>

                <div className="productForm">
                    {isLoading  ? <Loding/> : <TabProducts products={products}/>}
                </div>
            </div>
            


        </main>
    );
}

export default Products