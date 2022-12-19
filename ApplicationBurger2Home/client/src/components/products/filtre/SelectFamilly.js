import React,{ useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SelectFamilly = ({setFamillyId}) => {

    const [listFamilly, setListFamilly] = useState([<option key="0" value="">All</option>]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const languageRedux = useSelector(state => state.language);

    useEffect(()=>{
        
        axios.get(`/products/families/translations`)
            .then((res) => {
                setIsLoading(false)
                setListFamilly(res);
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux])
    
    const changeFammillyHandler = (e) => {
        setFamillyId(e.target.value);
    }

    return (
        <>{!isLoading && (
            
            <select name="language" onChange={changeFammillyHandler}>
                [<option key="0" value="">All</option>]

                {listFamilly.data.map((familly) => {
                    return <option key={familly.id} value={familly.productFamilyId}>{familly.name}</option>
                })}
            </select>
        )}</>
    );
}

export default SelectFamilly