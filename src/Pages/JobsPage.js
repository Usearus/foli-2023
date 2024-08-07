import { useState, useContext, useEffect, useRef } from 'react';
import JobsTable from '../Components/job-table-components/JobsTable';
import { DatabaseContext } from '../context/DatabaseContext';
import SiteIcon from '../Components/atom-components/SiteIcon';
import TopBarTable from '../Components/job-table-components/TopBarTable';
import Loader from '../Components/atom-components/Loader';
import styled from 'styled-components';
import useAlert from '../Custom Hooks/useAlert';
import {
	Form,
	Button,
	InputGroup,
	Stack,
	Modal,
	Tabs,
	Tab,
} from 'react-bootstrap';
import { supabase } from '../API/supabase';
import FoliBadge from '../Components/atom-components/FoliBadge';
// import ModalOnboarding from '../Components/ModalOnboarding';

const JobsPage = () => {
	const { userJobs, userJobsArchived, userProfile, fetchUserProfile } =
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

	// Function for Tabs to work correctly
	const [key, setKey] = useState('active');

	if (!userProfile) {
		return <></>;
	}

	if (isOnboarded === false) {
		return (
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
					<h4 style={{ paddingBottom: '.5rem' }}>
						Tell us about your job search!
					</h4>

					<p>Responses can be updated anytime.</p>
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
									<FoliBadge
										content={location}
										closeBtn
										handleRemoveLocation={handleRemoveLocation}
										location={location}
									/>
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
			</>
		);
	}

	if (isOnboarded === true && userJobs && userJobs.length > 0) {
		return (
			<Wrapper>
				<TopBarTable />
				<div id='table-container'>
					<Tabs
						id='controlled-tab-example'
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className='custom-tabs'>
						<Tab eventKey='active' title='Active'>
							<JobsTable jobs={userJobs} />
						</Tab>
						<Tab eventKey='archived' title='Archived'>
							<JobsTable jobs={userJobsArchived} />
						</Tab>
					</Tabs>
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
	justify-content: start;
	align-items: center;
	position: relative;
	width: 100%;
	height: calc(100vh - 63px);
	height: calc(100dvh - 63px);

	.img-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#table-container {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
		max-width: 1200px;
		width: 100%;
		padding-left: 16px;
		padding-right: 16px;
		height: 100%;
		overflow-x: hidden;
	}

	@media (max-width: 576px) {
		/* Animate when a page is selected */
		#table-container {
			padding-left: 0px;
			padding-right: 0px;
		}
	}

	.custom-tabs {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.custom-tabs .nav-item {
		margin: 0;
		padding: 0;
	}

	.custom-tabs .tab-content {
		margin: 0;
		padding: 0;
	}
`;
