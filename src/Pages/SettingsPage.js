import { useState, useEffect, useRef, useContext } from 'react';
import {
	LockClosedIcon,
	ArrowUpIcon,
	ArrowDownIcon,
} from '@radix-ui/react-icons';
import { DatabaseContext } from '../context/DatabaseContext';
import ThemeToggle from '../Components/atom-components/ThemeToggle';
import Loader from '../Components/atom-components/Loader';
import { useAuth0 } from '@auth0/auth0-react';
import EditPreferencesBtn from '../Components/modal-components/EditPreferencesBtn';

const SettingsPage = () => {
	const { user } = useAuth0();
	const { userProfile } = useContext(DatabaseContext);
	const [isLoading, setIsLoading] = useState(true);

	// Refs for each section in settings
	const profileRef = useRef(null);
	const jobPreferencesRef = useRef(null);

	// Loading state
	useEffect(() => {
		if (user && userProfile) {
			setIsLoading(false);
		}
	}, [user, userProfile]);

	// Function to scroll to a specific section
	const scrollToSection = (ref) => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-full'>
				<Loader />
			</div>
		);
	}

	const targetSalaryIncrease =
		userProfile.salary_target !== undefined &&
		userProfile.salary_current !== undefined
			? Math.round(
					((userProfile.salary_target - userProfile.salary_current) /
						userProfile.salary_current) *
						100
			  )
			: undefined;

	const salaryIncreaseClassName =
		targetSalaryIncrease > 0 ? 'text-success' : 'text-error';

	// Conditionally render the icon with the formatted salary increase
	const formattedSalaryIncrease =
		targetSalaryIncrease !== undefined ? (
			<span>
				{targetSalaryIncrease > 0 ? (
					<div className='flex items-center'>
						<ArrowUpIcon className='inline-block mr-1' />
						{targetSalaryIncrease}%
					</div>
				) : (
					<div className='flex items-center'>
						<ArrowDownIcon className='inline-block mr-1' />
						{Math.abs(targetSalaryIncrease)}%
					</div>
				)}
			</span>
		) : (
			''
		);

	// Set tooltip text based on the salary increase direction
	const tooltipText =
		targetSalaryIncrease !== undefined
			? targetSalaryIncrease > 0
				? `${targetSalaryIncrease}% higher than current salary`
				: `${Math.abs(targetSalaryIncrease)}% lower than current salary`
			: '';

	const targetSalaryDisplay = (() => {
		// Current & Target filled
		if (userProfile.salary_target && userProfile.salary_current) {
			return (
				<>
					${userProfile.salary_target.toLocaleString()}{' '}
					<div className='tooltip' data-tip={tooltipText}>
						<span className={`badge badge-outline ${salaryIncreaseClassName}`}>
							{formattedSalaryIncrease}
						</span>
					</div>
				</>
			);
		} else if (
			// Target only
			userProfile.salary_target &&
			!userProfile.salary_current
		) {
			return (
				<div className='flex flex-wrap items-center gap-2'>
					${userProfile.salary_target.toLocaleString()}
				</div>
			);
		} else {
			// Current only
			return '$0';
		}
	})();

	return (
		<div className='h-full text-base-content px-0 py-4 flex'>
			{/* Sidebar */}
			<div className='w-[350px] hidden lg:flex'>
				<ul className='menu'>
					<li>
						<span className='font-bold'>General</span>
						<ul>
							<li>
								<button onClick={() => scrollToSection(profileRef)}>
									Profile
								</button>
							</li>
							<li>
								<button onClick={() => scrollToSection(jobPreferencesRef)}>
									Job preferences
								</button>
							</li>
						</ul>
					</li>
					<li className='disabled'>
						<span className='justify-between'>
							<button>Resume</button> <LockClosedIcon />
						</span>
						<ul>
							<li className='disabled'>
								<span className='justify-between'>
									<button>Contact</button> <LockClosedIcon />
								</span>
							</li>
							<li className='disabled'>
								<span className='justify-between'>
									<button>Summary</button> <LockClosedIcon />
								</span>
							</li>
							<li className='disabled'>
								<span className='justify-between'>
									<button>Work history</button> <LockClosedIcon />
								</span>
							</li>
							<li className='disabled'>
								<span className='justify-between'>
									<button>Education</button> <LockClosedIcon />
								</span>
							</li>
							<li className='disabled'>
								<span className='justify-between'>
									<button>Skills</button> <LockClosedIcon />
								</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			{/* Content cards */}
			<div className='flex justify-center w-full overflow-y-auto'>
				<div className='max-w-[700px]  w-full p-4 flex flex-col gap-4 '>
					{/* Account card */}
					<div ref={profileRef} className='bg-base-200 p-8 flex flex-col gap-6'>
						<div>
							<h2 className='text-xl font-bold'>Profile</h2>
						</div>
						{userProfile ? (
							<div className='flex flex-col gap-4'>
								<label className='form-control w-full'>
									<div className='label  font-bold'>
										<span className='label-text'>Picture</span>
									</div>
									<div className='w-30'>
										<img
											src={user.picture}
											alt={user.name}
											className='rounded-full'
										/>
									</div>
								</label>
								<div className='divider m-0'></div>
								<div className='flex gap-4'>
									<label className='form-control w-full'>
										<div className='label  font-bold'>
											<span className='label-text'>Name</span>
										</div>
										<div className='px-1'>{user.name}</div>
									</label>

									<label className='form-control w-full'>
										<div className='label  font-bold'>
											<span className='label-text'>Email</span>
										</div>
										<div className='px-1'>{user.email}</div>
									</label>
								</div>
								<div className='divider m-0'></div>
								<div className='flex flex-col gap-4'>
									<label className='w-full flex justify-between'>
										<div className='label font-bold'>
											<span className='label-text'>Interface theme</span>
										</div>
										<ThemeToggle />
									</label>
								</div>
							</div>
						) : null}
					</div>

					{/* Job preferences card */}
					{userProfile ? (
						<div
							ref={jobPreferencesRef}
							className='bg-base-200 p-8 flex flex-col gap-6'>
							<div className='flex justify-between items-center'>
								<h2 className='text-xl font-bold'>Job preferences</h2>
								<EditPreferencesBtn />
							</div>
							<div className='flex flex-col gap-4'>
								{/* Position content */}
								<label className='form-control w-full'>
									<div className='label font-bold'>
										<span className='label-text'>Target position</span>
									</div>
									<div className='px-1'>
										{userProfile.position ? `${userProfile.position}` : '-'}
									</div>
								</label>
								<div className='divider m-0'></div>

								{/* Salary content */}
								<div className='flex gap-4'>
									{/* Current Salary */}
									<label className='form-control w-full'>
										<div className='label font-bold'>
											<span className='label-text'>Current Salary</span>
										</div>
										<div className='px-1'>
											{userProfile.salary_current !== undefined
												? `$${userProfile.salary_current.toLocaleString()}`
												: '-'}
										</div>
									</label>
									{/* Target salary */}
									<label className='form-control w-full'>
										<div className='label font-bold'>
											<span className='label-text'>Target salary</span>
										</div>
										<div className='px-1'>{targetSalaryDisplay}</div>
									</label>
								</div>
								<div className='divider m-0'></div>
								{/* Location content */}
								<label className='form-control w-full'>
									<div className='label font-bold'>
										<span className='label-text'>Locations</span>
									</div>
									<div className='flex gap-2 flex-wrap'>
										{/* Location badge */}
										{/* When the data comes back as an array, show the data */}
										{Array.isArray(userProfile.location_preference) &&
											userProfile.location_preference.map((location) => (
												<div
													key={location}
													className='badge badge-neutral mt-2'>
													{location}
												</div>
											))}
										{/* Remote / Hybrid badge*/}
										{userProfile.location_remote ? (
											<div className='badge badge-neutral mt-2'>
												Remote / Hybrid
											</div>
										) : (
											''
										)}
									</div>
								</label>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
