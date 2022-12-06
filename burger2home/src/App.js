import React from "react";
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
import NoPage from './components/NoPage.js';

import {PrivateRouteCompte,PrivateRouteConnection, PrivateRouteInscription} from "./PrivateRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Card />} />
          <Route path="concept" element={<Concept />} />
          <Route path="basket" element={<Basket />} />

          <Route element={<PrivateRouteCompte/>}>
            <Route path="compte" element={<Account />} />
          </Route>

          <Route element={<PrivateRouteConnection/>}>
            <Route path="connection" element={<Connection />} />
          </Route>

          <Route element={<PrivateRouteInscription/>}>
            <Route path="inscription" element={<Inscription />} />
          </Route>
                   

          <Route path="marketing" element={<NoPage />} />
          <Route path="stocks" element={<NoPage />} />
          <Route path="droit" element={<NoPage />} />
          <Route path="burgers" element={<NoPage />} />
          
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
