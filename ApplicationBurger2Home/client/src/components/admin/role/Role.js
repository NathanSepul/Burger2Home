import React, {useState, useEffect}from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import TabRole from "./tabRole/TabRole.js";
// import FormAllergens from "./FormAllergens.js";
import { useTranslation } from 'react-i18next';


const Allergvens = () =>{

    const initialState = { id: null, allergens: [] };
    const [allergens, setAllergens] = useState([]);
    const [allergenSelected, setAllergenSelected] = useState(initialState);
    const [reloadList,setReloadList] = useState(false)
    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/allergens/translations?language=${languageRedux.value}`)
            .then((res) => {
                setIsLoading(false);
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setAllergens(temp);
                setReloadList(false)
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux.value,reloadList])

    return (
        <main className='allergenAdmin'>
            <title>Burger2Home | Role</title>
            <div className="title"><h1>Gestion des rôles</h1></div>

            <div className="roleContent">
                <div className="userList">
                    {/* <TabRole user={user} setAllergenSelected={setAllergenSelected}/> */}
                </div>
                <div className="allergentForm">
                    {/* <FormAllergens AS={allergenSelected} setAS={setAllergenSelected} setReloadList={setReloadList}/> */}
                </div>
            </div>



        </main>
    );
}

export default Role