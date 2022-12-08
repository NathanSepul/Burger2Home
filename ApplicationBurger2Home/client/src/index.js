import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './i18n/i18n';

const theme = createTheme({
    palette: {
      none: {
        main: '#FFFFFF00',
        dark: '#FFFFFF00',
        contrastText: '#FFFFFF00',
        contrastThreshold: 0,
      },
    },
  });
  
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
<React.StrictMode>
    <Provider store={store}>
        <GoogleOAuthProvider clientId="199826957034-6cvt4kjaulho32g6e9vgrkt8tvcs0p7v.apps.googleusercontent.com">
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
</React.StrictMode>
);