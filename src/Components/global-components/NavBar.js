import { useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeToggle from '../atom-components/ThemeToggle';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
	const { adminProfile } = useContext(DatabaseContext);

	// Auth0 functionality
	const { user } = useAuth0();
	const { isAuthenticated } = useAuth0();
	const { loginWithRedirect } = useAuth0();
	const { logout } = useAuth0();

	// Sets active class on btns
	const location = useLocation();
	const isActive = (href) => (location.pathname === href ? 'btn-active' : '');

	return (
		<div className='text-base-content'>
			<div className='navbar justify-between border-b-2 border-neutral '>
				{/* Left content */}
				<div className='flex gap-2'>
					{/* Logo */}
					<div className='text-xl px-2'>Foli</div>
					{isAuthenticated ? (
						<div>
							<a
								href='/'
								className={`btn btn-ghost btn-sm ${isActive('/')}`}
								id='jobs'>
								Jobs
							</a>
							<a
								href='/notes'
								className={`btn btn-ghost btn-sm ${isActive('/notes')}`}
								id='notes'>
								Notebook
							</a>
						</div>
					) : null}
				</div>

				{/* Right content */}
				<div className='flex justify-center items-center gap-4'>
					{/* Admin btns */}
					{adminProfile ? (
						<div className='hidden lg:flex gap-2'>
							{/* Test page */}
							<a
								href='/test'
								className={`btn btn-ghost btn-sm  ${isActive('/test')}`}
								id='test'>
								Test
							</a>
							<ThemeToggle />
						</div>
					) : null}

					{/* Login/Profile photo */}
					{isAuthenticated ? (
						<div className='dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-circle avatar'>
								<div className='w-10 rounded-full'>
									<img
										src={user.picture}
										alt={user.name}
										width='40'
										height='40'
									/>
								</div>
							</div>
							{/* Dropdown */}
							<ul className='z-50 menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow'>
								<li>
									<a href='/settings' id='settings'>
										Settings
									</a>
								</li>
								<li>
									<button
										onClick={() =>
											logout({
												logoutParams: { returnTo: window.location.origin },
											})
										}>
										Logout
									</button>
								</li>
							</ul>
						</div>
					) : (
						<button
							className='btn btn-sm btn-primary'
							onClick={() => loginWithRedirect()}>
							Log In / Sign Up
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
