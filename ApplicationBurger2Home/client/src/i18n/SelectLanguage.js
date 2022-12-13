import React from "react"
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../redux/languageSlice.js';

const SelectLanguage = () => {
    const dispatch = useDispatch();

    const { i18n } = useTranslation();
    const changeLanguageHandler = (e) => {
        
 
        switch (e.target.value) {
            case "EN":
                i18n.changeLanguage("EN");
                dispatch(changeLanguage("EN"))
                break;
            case "FR":
                i18n.changeLanguage("FR");
                dispatch(changeLanguage("FR"))
                break;
            default:
                i18n.changeLanguage("FR");
                dispatch(changeLanguage("FR"))
                break;
        }
    }
 
    return (
            <select name="language" className="langue-select" onChange={changeLanguageHandler}>
                <option value="FR">Fr</option>
                <option value="EN">En</option>
            </select>
    )
}
 
export default SelectLanguage;