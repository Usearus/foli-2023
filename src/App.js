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
import NavBar from './Components/NavBar';
import AlertPopup from './Components/AlertPopup';
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
                                <NavBar />
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
    height: 100vh;
    width: 100vw;
    position: relative;
    height: -webkit-fill-available;
`;
