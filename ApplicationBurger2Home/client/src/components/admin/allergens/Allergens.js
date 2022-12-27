import React, {useState, useEffect}from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import TabAllergen from "./tabAllergens/TabAllergen.js";
import FormAllergens from "./FormAllergens.js";
// import "./Ingredients.css"

const Allergens = () =>{

    const initialState = { id: null, allergens: [] };
    const [allergens, setAllergens] = useState([]);
    const [allergenSelected, setAllergenSelected] = useState(initialState);
    
    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/allergens/translations?language=${languageRedux.value}`)
            .then((data) => {
                setIsLoading(false);
                setAllergens(data.data);
                console.log(data.data)
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux.value])

    return (
        <main className='IngredientAdmin'>
            <title>Burger2Home | Allergens</title>
            <div className="title"><h1>Gestion des Allergennes</h1></div>

            <div className="ingredientContent">
                <div className="ingredientList">
                    <TabAllergen allergens={allergens} setAllergenSelected={setAllergenSelected}/>
                </div>
                <div className="ingredientForm">
                    <FormAllergens AS={allergenSelected} setAS={setAllergenSelected}/>
                </div>
            </div>



        </main>
    );
}

export default Allergens