import { useAuth0 } from '@auth0/auth0-react';
// import Loader from '../Components/atom-components/Loader';

const AuthWrapper = ({ children }) => {
	const { isLoading, error } = useAuth0();
	// TURNED LOADER OFF SINCE IT IS ANNOYING AND SHOWS ON EVERY REFRESH
	if (isLoading) {
		return <>{/* <Loader />; */}</>;
	}
	if (error) {
		return (
			<>
				<h1>{error.message}</h1>
			</>
		);
	}
	return <>{children}</>;
};

export default AuthWrapper;
