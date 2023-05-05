import { Routes, Route } from 'react-router-dom';
import {
	LoginPage,
	ErrorPage,
	JobsPage,
	SingleJobPage,
	TestingPage,
	PrivateRoute,
	AuthWrapper,
} from './Pages';
import ResumeBuilderPage from './Pages/ResumeBuilderPage';
import NavBar from './Components/global-components/NavBar';
import AlertPopup from './Components/global-components/AlertPopup';
import styled from 'styled-components';

const App = () => {
	return (
		<Wrapper>
			<AuthWrapper>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route
						path='/'
						element={
							<PrivateRoute>
								<AlertPopup />
								<NavBar />
								<JobsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path='/job/:id'
						element={
							<PrivateRoute>
								<AlertPopup />
								<div className='nav-desktop-only'>
									<NavBar />
								</div>
								<SingleJobPage />
							</PrivateRoute>
						}
					/>
					<Route
						path='/testing'
						element={
							<PrivateRoute>
								<AlertPopup />
								<NavBar />
								<TestingPage />
							</PrivateRoute>
						}
					/>
					<Route
						path='/resume'
						element={
							<PrivateRoute>
								<AlertPopup />
								<NavBar />
								<ResumeBuilderPage />
							</PrivateRoute>
						}
					/>
					<Route
						path='*'
						element={
							<>
								<NavBar />
								<ErrorPage />
							</>
						}
					/>
				</Routes>
			</AuthWrapper>
		</Wrapper>
	);
};

export default App;

const Wrapper = styled.div`
	height: 100%;
	width: 100vw;
	position: relative;

	@media (min-width: 576px) {
		.nav-desktop-only {
			display: block;
		}
	}

	@media (max-width: 576px) {
		.nav-desktop-only {
			display: none;
		}
	}
`;
