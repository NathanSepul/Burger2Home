import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

import './i18n/i18n';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App/>);
