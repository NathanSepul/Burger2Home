import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n/i18n';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    

<React.StrictMode>
    <GoogleOAuthProvider clientId="199826957034-6cvt4kjaulho32g6e9vgrkt8tvcs0p7v.apps.googleusercontent.com">
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
</React.StrictMode>
);