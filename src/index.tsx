import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/i18n';
import Gacha from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Gacha />
  </React.StrictMode>
);

