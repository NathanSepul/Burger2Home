import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout"
import Carte from "./pages/Carte.js";
import Concept from "./pages/Concept.js";
import Compte from "./pages/Compte.js";
import Connection from "./pages/Connection.js";
import {PrivateRouteCompte,PrivateRouteConnection} from "./PrivateRoute";

import NoPage from './pages/NoPage.js';

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
