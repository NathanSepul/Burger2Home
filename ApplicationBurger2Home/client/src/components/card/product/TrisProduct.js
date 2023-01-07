import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TrisProduct = ({productFiltred, setProductFiltred}) => {
    const tris = ["Alphabétique", "Prix croissant", "Prix décroissant"]

    // // const initType = <option key="0" value="">All</option>;
    // const [typeList, setTypeList] = useState();
    // const [isLoading, setIsLoading] = useState(true);
    // const [hasError, setHasError] = useState(false);

    // const [allTypeTranslation, setAllTypeTranslation] = useState({en:[], fr:[]})
    // const languageRedux = useSelector(state => state.language);

    // useEffect(()=>{
    //     axios.get(`/types/translations`)
    //         .then((res) => {
    //             setIsLoading(false)
    //             let tempEn = [];
    //             let tempFr = [];

    //             res.data.forEach(e => {
    //                     e.language.abbreviation==="EN" ? tempEn.push(e) : tempFr.push(e)
    //             });

    //             tempEn = tempEn.sort((a,b) => a.name > b.name ? 1 : -1)
    //             tempFr = tempFr.sort((a,b) => a.name > b.name ? 1 : -1)

    //             setAllTypeTranslation({en:tempEn, fr:tempFr});

    //             languageRedux.value === "EN" ? setTypeList(tempEn) : setTypeList(tempFr)

    //         })
    //         .catch(() => {
    //             setHasError(true);
    //         })
    // }, [])

    // useEffect(()=>{
    //     languageRedux.value === "EN" ? setTypeList(allTypeTranslation.en) : setTypeList(allTypeTranslation.fr)
    // },[languageRedux.value])

    const changeOrder = () => {

    }
    return (
        // <>{!isLoading && (

            <select name="trisProduct" onChange={changeOrder} defaultValue="Alphabétique" className="trisProducts">
                {tris.map((e) => {
                    return <option key={e} value={e}>{e}</option>
                })}
            </select>
        // )}</>
    );
}

export default TrisProduct