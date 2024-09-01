import ReactDOM from 'react-dom/client';
import './app.css';
// Order of output.css and input.css needs to stay in this order
import './output.css';
import './input.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from './context/DatabaseContext';
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
		cacheLocation='localstorage'>
		<BrowserRouter>
			<DatabaseProvider>
				<AlertProvider>
					<App />
				</AlertProvider>
			</DatabaseProvider>
		</BrowserRouter>
	</Auth0Provider>
);
