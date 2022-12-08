import React from "react"
import { useTranslation } from 'react-i18next';
 
const SelectLanguage = () => {
    const { i18n } = useTranslation();
    const changeLanguageHandler = (e) => {
        
 
        switch (e.target.value) {
            case "en":
                i18n.changeLanguage("en");
                break;
            case "fr":
                i18n.changeLanguage("fr");
                break;
            default:
                i18n.changeLanguage("fr");
                break;
        }
    }
 
    return (
            <select name="language" className="langue-select" onChange={changeLanguageHandler}>
                <option value="fr">Fr</option>
                <option value="en">En</option>
            </select>
    )
}
 
export default SelectLanguage;