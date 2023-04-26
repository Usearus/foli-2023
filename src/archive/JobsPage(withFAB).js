import { useState, useContext, useEffect, useRef } from 'react';
import JobsTable from '../Components/JobsTable';
import { DatabaseContext } from '../context/DatabaseContext';
import SiteIcon from '../Components/SiteIcon';
import TopBarTable from '../Components/TopBarTable';
import Loader from '../Components/Loader';
import styled from 'styled-components';
import ModalAddJob from '../Components/ModalAddJob';
import useAlert from '../Custom Hooks/useAlert';
import { MdOutlineClose } from 'react-icons/md';
import { Badge, Form, Button, InputGroup, Stack, Modal } from 'react-bootstrap';
import { supabase } from '../API/supabase';
// import ModalOnboarding from '../Components/ModalOnboarding';

const JobsPage = () => {
	const { userJobs, userProfile, fetchUserProfile } =
		useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const [showModal, setShowModal] = useState(false);
	const [isOnboarded, setIsOnboarded] = useState(undefined);

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

	const [locationInput, setLocationInput] = useState('');
	const [tempLocations, setTempLocations] = useState([]);

	const positionRef = useRef();
	const locationRef = useRef();
	const salary_minRef = useRef();
	const salary_maxRef = useRef();
	const remoteRef = useRef();

	const handleAddLocation = () => {
		const newLocation = locationInput.trim();
		if (newLocation !== '' && !tempLocations.includes(newLocation)) {
			setTempLocations([...tempLocations, newLocation]);
			setLocationInput('');
		}
	};

	const handleRemoveLocation = (location) => {
		const updatedLocations = tempLocations.filter((loc) => loc !== location);
		setTempLocations(updatedLocations);
		console.log('tempLocations removed & updated to', tempLocations);
	};

	const handleAddPref = async () => {
		const { error } = await supabase
			.from('profiles')
			.update({
				position: positionRef.current.value,
				salary_min: salary_minRef.current.value * 1,
				salary_max: salary_maxRef.current.value * 1,
				location_preference: tempLocations,
				location_remote: remoteRef.current.checked,
				onboarded: true,
			})
			.eq('id', userProfile.id);
		fetchUserProfile();
		setShowModal(false);
		setIsOnboarded(true);
		if (error) {
			setAlert('Something went wrong. Preferences not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	if (!userProfile) {
		return <></>;
	}

	if (isOnboarded === false) {
		return (
			// FAILED ATTEMPT AT MAKING A COMPONENT FOR THIS
			// <ModalOnboarding
			//     show={showModal}
			//     setIsOnboarded={setIsOnboarded}
			//     setShowModal={setShowModal}
			// />
			<Modal
				show={showModal}
				backdrop='static'
				keyboard={false}
				animation={true}
				centered
				fullscreen='md-down'
				style={{ background: '#b3b3fd' }}>
				<Modal.Header>
					<Modal.Title>
						<SiteIcon />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h2 style={{ paddingBottom: '.5rem' }}>
						Tell us about your job search
					</h2>
					<p>
						Responses personalize your experience and can be updated anytime.
					</p>
					<Form>
						<Form.Group className='mb-4' controlId='position'>
							<Form.Label>Target position</Form.Label>
							<Form.Control
								type='text'
								placeholder='Add a position'
								ref={positionRef}
								defaultValue=''
							/>
						</Form.Group>
						<Stack direction='horizontal' gap={4}>
							<Form.Group className='mb-4' controlId='salary-min'>
								<Form.Label>Target salary range ($)</Form.Label>
								<Form.Control
									type='number'
									placeholder='Minimum'
									ref={salary_minRef}
									defaultValue=''
									// style={{ maxWidth: '120px' }}
								/>
							</Form.Group>
							<span style={{ paddingTop: '.5rem' }}>-</span>
							<Form.Group className='mb-4' controlId='salary-max'>
								<Form.Control
									type='number'
									placeholder='Maximum'
									ref={salary_maxRef}
									defaultValue=''
									style={{ marginTop: '1.75rem' }}
								/>
							</Form.Group>
						</Stack>
						<Form.Group className='mb-2' controlId='location'>
							<Form.Label>Target locations</Form.Label>
							<InputGroup className='mb-2'>
								<Form.Control
									type='text'
									placeholder='Add all locations...'
									ref={locationRef}
									value={locationInput}
									onChange={(e) => setLocationInput(e.target.value)}
								/>
								<Button
									variant='secondary'
									id='button-addon2'
									onClick={handleAddLocation}
									disabled={!locationInput}>
									Add
								</Button>
							</InputGroup>
							<Form.Group controlId='remote'>
								<Form.Check
									label='Include remote'
									ref={remoteRef}
									defaultChecked={false}
								/>
							</Form.Group>
							<div
								style={{
									marginTop: '.5rem',
									display: 'flex',
								}}>
								{tempLocations.map((location) => (
									<Badge
										key={location}
										pill
										bg='light'
										style={{
											display: 'flex',
											alignItems: 'center',
											color: 'var(--primary-500)',
											fontWeight: '600',
											cursor: 'default',
											marginRight: '.5rem',
										}}>
										{location}
										<span style={{ paddingLeft: '8px' }}>
											<MdOutlineClose
												onClick={() => handleRemoveLocation(location)}
												style={{
													color: 'var(--grey-500)',
													width: '16px',
													height: '16px',
													cursor: 'pointer',
												}}
											/>
										</span>
									</Badge>
								))}
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleAddPref}>
						Continue
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	if (isOnboarded === true && userJobs && userJobs.length === 0) {
		return (
			<>
				<TopBarTable />
				<Wrapper>
					<h5>No jobs are being tracked. Add your first job to get started.</h5>
				</Wrapper>
				<div className='add-job-fab mobile-only'>
					<ModalAddJob />
				</div>
			</>
		);
	}

	if (isOnboarded === true && userJobs && userJobs.length > 0) {
		return (
			<Wrapper>
				<TopBarTable className='desktop-only' />
				<JobsTable jobs={userJobs} />
				<div className='add-job-fab mobile-only'>
					<ModalAddJob />
				</div>
			</Wrapper>
		);
	}

	return (
		<>
			<Loader />
		</>
	);
};
export default JobsPage;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	height: calc(100vh - 63px);
	height: calc(100dvh - 63px);
	background: var(--grey-100);

	.add-job-fab {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
	}

	/* Mobile */
	@media (max-width: 576px) {
		.btn.btn-primary {
			border-radius: 99px;
			padding: 9px 16px;
		}
	}
`;
