import React from 'react';
import ProductList from "./ProductList.js"
import "./Card.css";

function Card() {
    return (
        <main id="carte">
             <title>Burger2Home | La Carte</title>
             <h1>Notre Carte</h1>
             <div id="filtre">
                <h3> filtre</h3>
                <ul>
                    <li>type</li>
                </ul>

             </div>
             <section className='produits'>
                <ProductList />
             </section>
        </main>
      
    );
}

export default Card;
