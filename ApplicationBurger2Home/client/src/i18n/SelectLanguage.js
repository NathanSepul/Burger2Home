import React from "react"
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../redux/languageSlice.js';
import { useSelector } from 'react-redux';

const SelectLanguage = () => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    const languageRedux = useSelector(state => state.language);

    if (i18n.language !== languageRedux.value) {
        i18n.changeLanguage(languageRedux.value);
    }


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
            <select name="language" className="langue-select" defaultValue={languageRedux.value} onChange={changeLanguageHandler}>
                <option value="FR">Fr</option>
                <option value="EN">En</option>
            </select>
    )
}
 
export default SelectLanguage;