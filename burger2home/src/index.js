import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.js';
import {Provider} from "react-redux";
import store from "./redux/store.js"

import './i18n/i18n';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
    <Provider store={store}>
         <App />
     </Provider>
);


// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('app'));
