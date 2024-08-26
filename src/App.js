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
							<Layout>
								<SingleJobPage />
							</Layout>
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
