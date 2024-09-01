import { Routes, Route } from 'react-router-dom';
import AuthWrapper from './Pages/AuthWrapper';
import ErrorPage from './Pages/ErrorPage';
import JobsPage from './Pages/JobsPage';
import LoginPage from './Pages/LoginPage';
import PrivateRoute from './Pages/PrivateRoute';
import SingleJobPage from './Pages/SingleJobPage';
import TestingPage from './Pages/TestingPage';
import SettingsPage from './Pages/SettingsPage';
import Layout from './layout';
import NavBar from './Components/global-components/NavBar';
import AlertPopup from './Components/global-components/AlertPopup';

const App = () => {
	return (
		<AuthWrapper>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='/'
					element={
						<PrivateRoute>
							<Layout>
								<JobsPage />
							</Layout>
						</PrivateRoute>
					}
				/>
				<Route
					path='/job/:id'
					element={
						<PrivateRoute>
							<div className='flex flex-col h-screen bg-base-300 relative'>
								<AlertPopup />
								<div className='hidden md:block'>
									<NavBar />
								</div>
								<div className='flex-grow overflow-y-auto'>
									<SingleJobPage />
								</div>
							</div>
						</PrivateRoute>
					}
				/>
				<Route
					path='/test'
					element={
						<PrivateRoute>
							<Layout>
								<TestingPage />
							</Layout>
						</PrivateRoute>
					}
				/>
				<Route
					path='/settings'
					element={
						<PrivateRoute>
							<Layout>
								<SettingsPage />
							</Layout>
						</PrivateRoute>
					}
				/>
				<Route
					path='*'
					element={
						<>
							<Layout>
								<ErrorPage />
							</Layout>
						</>
					}
				/>
			</Routes>
		</AuthWrapper>
	);
};

export default App;
