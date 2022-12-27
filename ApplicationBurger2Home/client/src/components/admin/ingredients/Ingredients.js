import React, {useState, useEffect}from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import TabIngredients from "./tabIngredients/TabIngredients";
import FormIngredient from "./FormIngredient";
import "./Ingredients.css"
const Ingredients = () =>{

    const initialState = { id: null, allergens: [] };
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsSelected, setIngredientsSelected] = useState(initialState);
    
    // eslint-disable-next-line
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/ingredients/translations?language=${languageRedux.value}`)
            .then((data) => {
                setIsLoading(false);
                setIngredients(data.data);
                console.log(data.data)
            })
            .catch(() => {
                setHasError(true);
            })
    }, [languageRedux.value])

    return (
        <main className='IngredientAdmin'>
            <title>Burger2Home | Ingredient</title>
            <div className="title"><h1>Gestion des Ingrédients</h1></div>

            <div className="ingredientContent">
                <div className="ingredientList">
                    <TabIngredients ingredients={ingredients} setIngredientSelected={setIngredientsSelected}/>
                </div>
                <div className="ingredientForm">
                    <FormIngredient IS={ingredientsSelected} setIS={setIngredientsSelected}/>
                </div>
            </div>



        </main>
    );
}

export default Ingredients