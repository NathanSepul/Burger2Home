import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.js";
import Layout from "./Layout.js"
import Card from "./components/card/Card.js";
import Concept from "./components/concept/Concept.js";
import Account from "./components/compte/Account.js";
import Connection from "./components/login/Connection.js";
import NoPage from './components/NoPage.js';

import {PrivateRouteCompte,PrivateRouteConnection} from "./PrivateRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Card />} />
          <Route path="concept" element={<Concept />} />
          
          <Route element={<PrivateRouteCompte/>}>
            <Route path="compte" element={<Account />} />
          </Route>

          <Route element={<PrivateRouteConnection/>}>
            <Route path="connection" element={<Connection />} />
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
