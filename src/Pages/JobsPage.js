import { useState, useContext, useEffect, useRef } from 'react';
import JobsTable from '../Components/job-table-components/JobsTable';
import { DatabaseContext } from '../context/DatabaseContext';
import TopBarTable from '../Components/job-table-components/TopBarTable';
import Loader from '../Components/atom-components/Loader';
// import useAlert from '../Custom Hooks/useAlert';
// import ModalOnboarding from '../Components/ModalOnboarding';

const JobsPage = () => {
	const { userJobs, userJobsArchived, userProfile, fetchUserProfile } =
		useContext(DatabaseContext);
	// const { setAlert } = useAlert();
	const [showModal, setShowModal] = useState(false);
	const [isOnboarded, setIsOnboarded] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);

	// RUNS INITIAL ONBOARDING FOR USERS
	useEffect(() => {
		if (userProfile && userProfile.onboarded === false) {
			setShowModal(true);
			setIsOnboarded(false);
		}
		if (userProfile && userProfile.onboarded === true) {
			setShowModal(false);
			setIsOnboarded(true);
		}
	}, [userProfile]);

	// Simulate loading
	useEffect(() => {
		// Assuming you have data loading or API calls here
		// Set the loading state to false once everything is loaded
		if (userJobs && userJobsArchived) {
			setIsLoading(false);
		}
	}, [userJobs, userJobsArchived]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-full w-full'>
				<Loader />
			</div>
		);
	}

	if (!userProfile) {
		return <></>;
	}

	if (isOnboarded === false) {
		return (
			// <Modal
			// 	show={showModal}
			// 	backdrop='static'
			// 	keyboard={false}
			// 	animation={true}
			// 	centered
			// 	fullscreen='md-down'
			// 	style={{ background: '#b3b3fd' }}>
			// 	<Modal.Header>
			// 		<Modal.Title>
			// 			<SiteIcon />
			// 		</Modal.Title>
			// 	</Modal.Header>
			// 	<Modal.Body>
			// 		<h4 style={{ paddingBottom: '.5rem' }}>
			// 			Tell us about your job search!
			// 		</h4>

			// 		<p>Responses can be updated anytime.</p>
			// 		<Form>
			// 			<Form.Group className='mb-4' controlId='position'>
			// 				<Form.Label>Target position</Form.Label>
			// 				<Form.Control
			// 					type='text'
			// 					placeholder='Add a position'
			// 					ref={positionRef}
			// 					defaultValue=''
			// 				/>
			// 			</Form.Group>
			// 			<Stack direction='horizontal' gap={4}>
			// 				<Form.Group className='mb-4' controlId='salary-min'>
			// 					<Form.Label>Target salary range ($)</Form.Label>
			// 					<Form.Control
			// 						type='number'
			// 						placeholder='Minimum'
			// 						ref={salary_minRef}
			// 						defaultValue=''
			// 						// style={{ maxWidth: '120px' }}
			// 					/>
			// 				</Form.Group>
			// 				<span style={{ paddingTop: '.5rem' }}>-</span>
			// 				<Form.Group className='mb-4' controlId='salary-max'>
			// 					<Form.Control
			// 						type='number'
			// 						placeholder='Maximum'
			// 						ref={salary_maxRef}
			// 						defaultValue=''
			// 						style={{ marginTop: '1.75rem' }}
			// 					/>
			// 				</Form.Group>
			// 			</Stack>
			// 			<Form.Group className='mb-2' controlId='location'>
			// 				<Form.Label>Target locations</Form.Label>
			// 				<InputGroup className='mb-2'>
			// 					<Form.Control
			// 						type='text'
			// 						placeholder='Add all locations...'
			// 						ref={locationRef}
			// 						value={locationInput}
			// 						onChange={(e) => setLocationInput(e.target.value)}
			// 					/>
			// 					<Button
			// 						variant='secondary'
			// 						id='button-addon2'
			// 						onClick={handleAddLocation}
			// 						disabled={!locationInput}>
			// 						Add
			// 					</Button>
			// 				</InputGroup>
			// 				<Form.Group controlId='remote'>
			// 					<Form.Check
			// 						label='Include remote'
			// 						ref={remoteRef}
			// 						defaultChecked={false}
			// 					/>
			// 				</Form.Group>
			// 				<div
			// 					style={{
			// 						marginTop: '.5rem',
			// 						display: 'flex',
			// 					}}>
			// 					{tempLocations.map((location) => (
			// 						<FoliBadge
			// 							content={location}
			// 							closeBtn
			// 							handleRemoveLocation={handleRemoveLocation}
			// 							location={location}
			// 						/>
			// 					))}
			// 				</div>
			// 			</Form.Group>
			// 		</Form>
			// 	</Modal.Body>
			// 	<Modal.Footer>
			// 		<Button variant='primary' onClick={handleAddPref}>
			// 			Continue
			// 		</Button>
			// 	</Modal.Footer>
			// </Modal>
			<p>Onboarding is false</p>
		);
	}

	if (isOnboarded === true && userJobs && userJobs.length === 0) {
		return (
			<div className='flex flex-col h-full'>
				<TopBarTable />
				<div className='flex justify-center items-center h-full p-6'>
					<h5 className='text-lg'>
						No jobs are being tracked. Add your first job to get started.
					</h5>
				</div>
			</div>
		);
	}

	if (isOnboarded === true && userJobs && userJobs.length > 0) {
		return (
			<>
				<TopBarTable />
				{/* Tabs component */}
				<div className='p-0 lg:px-12'>
					<div role='tablist' className='tabs tabs-bordered'>
						<input
							type='radio'
							name='my_tabs_1'
							role='tab'
							className='tab'
							aria-label='Active'
							defaultChecked
						/>
						<div role='tabpanel' className='tab-content pt-4'>
							<JobsTable jobs={userJobs} />
						</div>
						<input
							type='radio'
							name='my_tabs_1'
							role='tab'
							className='tab'
							aria-label='Archived'
						/>
						<div role='tabpanel' className='tab-content pt-4'>
							<JobsTable jobs={userJobsArchived} />
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default JobsPage;

// const [locationInput, setLocationInput] = useState('');
// const [tempLocations, setTempLocations] = useState([]);

// const positionRef = useRef();
// const locationRef = useRef();
// const salary_minRef = useRef();
// const salary_maxRef = useRef();
// const remoteRef = useRef();

// const handleAddLocation = () => {
// 	const newLocation = locationInput.trim();
// 	if (newLocation !== '' && !tempLocations.includes(newLocation)) {
// 		setTempLocations([...tempLocations, newLocation]);
// 		setLocationInput('');
// 	}
// };

// const handleRemoveLocation = (location) => {
// 	const updatedLocations = tempLocations.filter((loc) => loc !== location);
// 	setTempLocations(updatedLocations);
// 	console.log('tempLocations removed & updated to', tempLocations);
// };

// const handleAddPref = async () => {
// 	const { error } = await supabase
// 		.from('profiles')
// 		.update({
// 			position: positionRef.current.value,
// 			salary_min: salary_minRef.current.value * 1,
// 			salary_max: salary_maxRef.current.value * 1,
// 			location_preference: tempLocations,
// 			location_remote: remoteRef.current.checked,
// 			onboarded: true,
// 		})
// 		.eq('id', userProfile.id);
// 	fetchUserProfile();
// 	setShowModal(false);
// 	setIsOnboarded(true);
// 	if (error) {
// 		setAlert('Unable to update preferences', 'danger');
// 		console.log('error is', error);
// 		return;
// 	}
// };
