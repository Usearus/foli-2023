import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AirtableProvider } from './context/AirtableContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { AlertProvider } from './context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain='dev-yhy2r863cr3afldj.us.auth0.com'
    clientId='AU1Uq8D0NgE2clFjuO4WlFTU1jycCEiw'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation='localstorage'
  >
    <BrowserRouter>
      <AirtableProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AirtableProvider>
    </BrowserRouter>
  </Auth0Provider>
);
