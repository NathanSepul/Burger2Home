import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

import "./Informations.css";
// import compte from "./compte.json";


const Informations = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [items, setItems] = useState();
    const [hasFetchedOne, setHasFetchedOne] = useState(false); //flage pour ne lancer qu'une fois un certain composant


    //méthode appelé dé que le composant est crée (monté)
    //construction particuliere pour ne le faire que au montage du composant


    useEffect(() => {
        if (!hasFetchedOne) {

            setHasFetchedOne(true);
            setHasError(false);
            setIsLoading(true);


            fetch("http://sepul.be/test.json")
                .then(response => response.json())

                .then(data => {
                    setIsLoading(false);
                    console.log(data)
                    setItems(data);
                })

                .catch(() => {
                    setHasError(true);
                });
        }

    },[hasFetchedOne]);

    console.log(items)

    if (hasError) {
        return <Alert id="alert" severity="error" onClose={() => { }}>
                    Les données n'ont pas pu être chargée
                </Alert>;
    }

    if (isLoading) {
        return <p>Chargement en cours ... </p>;
    }


   


    return <div id="Informations">
        <form>
            <label>Enter your name:
                
            </label>
        </form>
    </div>

}

export default Informations