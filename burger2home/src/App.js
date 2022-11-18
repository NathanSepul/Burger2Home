import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./composant/home/Home.js";
import Layout from "./Layout.js"
import Carte from "./composant/carte/Carte.js";
import Concept from "./composant/concept/Concept.js";
import Compte from "./composant/compte/Compte.js";
import Connection from "./composant/login/Connection.js";
import NoPage from './composant/NoPage.js';

import {PrivateRouteCompte,PrivateRouteConnection} from "./PrivateRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carte" element={<Carte />} />
          <Route path="concept" element={<Concept />} />
          
          <Route element={<PrivateRouteCompte/>}>
            <Route path="compte" element={<Compte />} />
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
