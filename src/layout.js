import NavBar from './Components/global-components/NavBar';
import AlertPopup from './Components/global-components/AlertPopup';

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col h-screen bg-base-300 relative'>
			<AlertPopup />
			<NavBar />
			<div className='flex-grow overflow-y-auto'>{children}</div>
		</div>
	);
};

export default Layout;
