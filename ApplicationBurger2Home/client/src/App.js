import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.js";
import Layout from "./Layout.js"
import Card from "./components/card/Card.js";
import Concept from "./components/concept/Concept.js";
import Account from "./components/account/Account.js";
import Connection from "./components/login/Connection.js";
import Inscription from "./components/login/Inscription.js";
import Basket from "./components/basket/Basket.js";
import Products from "./components/admin/products/Products.js";
import Ingredients from "./components/admin/ingredients/Ingredients.js";
import Allergens from "./components/admin/allergens/Allergens";

import NoPage from './components/NoPage.js';

import { useDispatch, useSelector } from 'react-redux';
import { loginBasket } from './redux/userSlice.js';
import axios from 'axios';

import {  PrivateRouteCompte, 
          PrivateRouteConnection, 
          PrivateRouteInscription, 
          PrivateRouteAdmin, 
          PrivateRouteMarketing,
          PrivateRouteEmploye } from "./PrivateRoute";


const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch();


useEffect(()=>{
  if (user.isConnected) {
    axios.get(`/users/${user.id}/basket`)
      .then((res) => {
        const basketInformation = { basket:null,size:0}
        basketInformation.basket = res.data;
        basketInformation.basket.basketLines = basketInformation.basket.basketLines.sort((a, b) => (a.id > b.id ? 1 : -1));
        basketInformation.size = res.data.basketLines.length
        dispatch(loginBasket(basketInformation))
      })
      .catch(e => console.log(e))
  }
},[]) 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Card />} />
          <Route path="concept" element={<Concept />} />
          <Route path="basket" element={<Basket />} />

          <Route element={<PrivateRouteCompte />}>
            <Route path="compte" element={<Account />} />
          </Route>

          <Route element={<PrivateRouteConnection />}>
            <Route path="connection" element={<Connection />} />
          </Route>

          <Route element={<PrivateRouteInscription />}>
            <Route path="inscription" element={<Inscription />} />
          </Route>

          <Route element={<PrivateRouteMarketing />}>
            <Route path="marketing" element={<NoPage />} />
          </Route>

          <Route element ={<PrivateRouteEmploye/>}>
            <Route path="admin/stock" element={<NoPage />} />
          </Route>

          <Route element={<PrivateRouteAdmin />}>
            <Route path="admin/stocks" element={<NoPage />} />
            <Route path="admin/role" element={<NoPage />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/ingredients" element={<Ingredients />} />
            <Route path="admin/allergens" element={<Allergens />} />
          </Route>



          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
