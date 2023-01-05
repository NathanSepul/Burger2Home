import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loading from "../../loading/Loading.js"
import TabProducts from "./tabproduct/TabProducts.js";
import axios from 'axios';

import SelectFamilly from "./filtre/SelectFamilly.js";
import ProductForm from "./form/ProductForm.js"
import "./Products.css"

const Products = () => {
    const initialState = { id: null, currentPrice: "", imageName: null, ingredients: [], productFamilies: [], type:null,onMenu: false };
    const [products, setProducts] = useState([]);
    const [productSelected, setProductSelected] = useState(initialState);
    const [reloadList, setReloadList] = useState(false);

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    const [typeId, setTypeId] = useState("");
    const { t } = useTranslation();
    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        // setIsLoading(true);
        axios.get(`/products/summaries?language=${languageRedux.value}&availableProductsOnly=false&type=${typeId}`)
            .then((res) => {
                setIsLoading(false);
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setProducts(temp);
                setReloadList(false)
            })
            .catch((e) => {
                console.log(e)
                setReloadList(false)

            })
    }, [languageRedux.value, reloadList, typeId])

  


    return (
        <main className='productAdmin'>
            <title>Burger2Home | {t('navigation.produits')}</title>
            <div className="title"><h1>{t('gestionProduit.titre')}</h1></div>

            <div className="productFiltre">
                <SelectFamilly setTypeId={setTypeId} />
            </div>

            <div className="productContent">

                <div className="productList">
                    {isLoading ? <Loading /> : <TabProducts products={products} setProductSelected={setProductSelected} />}
                </div>

                <div className="productForm">
                    <ProductForm ps={productSelected} setPS={setProductSelected} setReloadList={setReloadList} realoadList={reloadList}/>
                </div>

            </div>



        </main>
    );
}

export default Products