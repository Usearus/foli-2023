import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AirtableProvider } from './context/AirtableContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <BrowserRouter>
      <AirtableProvider>
        <App />
      </AirtableProvider>
    </BrowserRouter>
  </UserProvider>
);
