import { useContext, useState } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
// import SiteIcon from '../atom-components/SiteIcon';
import { useAuth0 } from '@auth0/auth0-react';
// import Container from 'react-bootstrap/Container';
// import {
// 	Nav,
// 	Navbar,
// 	Button,
// 	Offcanvas,
// 	OffcanvasHeader,
// 	OffcanvasTitle,
// } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import ModalProfile from '../modal-components/ModalProfile';

// import { FiMenu } from 'react-icons/fi';

const NavBar = () => {
	const { userProfile, adminProfile } = useContext(DatabaseContext);
	const { user } = useAuth0();

	// const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// const toggleDropdown = () => {
	// 	setIsDropdownOpen((prev) => !prev);
	// };

	// const closeDropdown = () => {
	// 	setIsDropdownOpen(false);
	// };

	if (userProfile) {
		return (
			<div className='text-base-content'>
				<div
					className='navbar bg-base-200 justify-between 
			border-b-2 border-base-100 
			'>
					{/* Left content */}
					<div>
						<a href='/' className='btn btn-ghost btn-sm text-xl'>
							Foli
						</a>

						{/* Test page */}
						{adminProfile ? (
							<div className='navbar-center hidden lg:flex'>
								<ul className='menu menu-horizontal px-1'>
									<li>
										<a href='/test' id='test'>
											Test
										</a>
									</li>
								</ul>
							</div>
						) : null}
					</div>

					{/* Right content */}
					<div className='flex-none'>
						{/* Profile btn */}
						<div className='dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-circle avatar'>
								{userProfile ? (
									<div className='w-10 rounded-full'>
										<img
											src={user.picture}
											alt={user.name}
											width='40'
											height='40'
										/>
									</div>
								) : null}
							</div>

							<ul className='menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
								<li>
									<a href='/settings' id='settings'>
										Settings
									</a>
								</li>
								<li>
									<a href='/api/auth/logout'>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default NavBar;
