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

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <NavBar />
              <JobsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/job/:id'
          element={
            <PrivateRoute>
              <NavBar />
              <SingleJobPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/testing'
          element={
            <PrivateRoute>
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
  );
}

export default App;
