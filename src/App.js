import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import JobsPage from './Pages/JobsPage';
import SingleJobPage from './Pages/SingleJobPage';
import TestingPage from './Pages/TestingPage';
import AppShell from './AppShell';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path='/testing' element={<TestingPage />} />
          <Route path='/jobs' element={<JobsPage />} />
          <Route path='/singlejob' element={<SingleJobPage />} />
          {/* When I have id parameter I can add it to the single job. when ready here is the video: https://www.udemy.com/course/react-tutorial-and-projects-course/learn/lecture/31426330#overview*/}
          {/* <Route path="/job/:jobId" element={<SingleJob />} /> */}
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
