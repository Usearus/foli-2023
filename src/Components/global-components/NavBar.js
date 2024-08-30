import { useContext, useState } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeToggle from '../atom-components/ThemeToggle';

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
					className='navbar justify-between 
			border-b-2 border-base-200 
			'>
					{/* Left content */}
					<div className='flex gap-2'>
						{/* Logo */}
						<a href='/' className='btn btn-ghost btn-sm text-xl '>
							Foli
						</a>
						{/* Test page */}
						{adminProfile ? (
							<a
								className='btn btn-ghost btn-sm hidden lg:flex'
								href='/test'
								id='test'>
								Test
							</a>
						) : null}
					</div>

					{/* Right content */}
					<div className='flex-none gap-4'>
						{/* Profile btn */}
						<ThemeToggle />
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
