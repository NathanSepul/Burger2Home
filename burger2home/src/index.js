import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.js';
import { Provider } from "react-redux";
import store from "./redux/store.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

import './i18n/i18n';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
    <GoogleOAuthProvider clientId="199826957034-93k0d17pfgm9hpqpomvkul3jg4kmgesc.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
);