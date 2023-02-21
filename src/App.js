import { Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  ErrorPage,
  JobsPage,
  SingleJobPage,
  TestingPage,
  PrivateRoute,
  AuthWrapper,
  ProfilePage,
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
          path='/singlejob'
          element={
            <PrivateRoute>
              <NavBar />
              <SingleJobPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <NavBar />
              <ProfilePage />
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
