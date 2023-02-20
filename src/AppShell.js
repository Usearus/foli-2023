import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';

function AppShell() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default AppShell;
