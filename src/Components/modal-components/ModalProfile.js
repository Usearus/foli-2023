// import { useState, useContext, useRef } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { DatabaseContext } from '../../context/DatabaseContext';
// import useAlert from '../../Custom Hooks/useAlert';
// import { Form, Button, InputGroup, Stack, Modal } from 'react-bootstrap';
// import styled from 'styled-components';
// import { supabase } from '../../API/supabase';
// import FoliBadge from '../atom-components/FoliBadge';

// const ModalProfile = () => {
// 	const { logout } = useAuth0();
// 	const { user } = useAuth0();
// 	const { userProfile, fetchUserProfile } = useContext(DatabaseContext);
// 	const [showProfile, setShowProfile] = useState(false);
// 	const handleHideProfile = () => setShowProfile(false);
// 	const handleShowProfile = () => setShowProfile(true);
// 	const { setAlert } = useAlert();

// 	const [editing, setEditing] = useState(false);
// 	const [locationInput, setLocationInput] = useState('');
// 	const [tempLocations, setTempLocations] = useState([]);

// 	const positionRef = useRef();
// 	const locationRef = useRef();
// 	const salary_minRef = useRef();
// 	const salary_maxRef = useRef();
// 	const remoteRef = useRef();

// 	const initialValues = {
// 		position: userProfile?.position ?? '',
// 		salary_min: userProfile?.salary_min ?? '',
// 		salary_max: userProfile?.salary_max ?? '',
// 		location_remote: userProfile?.location_remote ?? false,
// 		location_preference: userProfile?.location_preference
// 			? [...userProfile.location_preference]
// 			: [],
// 	};

// 	if (!userProfile) {
// 		return <></>;
// 	}

// 	// console.log('userProfile', userProfile);
// 	// console.log('location_preferences', userProfile.location_preference);
// 	// console.log('initialValues', initialValues);
// 	// console.log('tempLocations', tempLocations);

// 	const handleEditClick = () => {
// 		setEditing(true);
// 	};

// 	const handleOnHide = () => {
// 		setEditing(false);
// 		handleHideProfile();
// 	};

// 	const handleAddLocation = () => {
// 		const newLocation = locationInput.trim();
// 		if (newLocation !== '' && !tempLocations.includes(newLocation)) {
// 			setTempLocations([...tempLocations, newLocation]);
// 			setLocationInput('');
// 		}
// 	};

// 	const handleRemoveLocation = (location) => {
// 		const updatedLocations = tempLocations.filter((loc) => loc !== location);
// 		setTempLocations(updatedLocations);
// 		console.log('tempLocations removed & updated to', tempLocations);
// 	};

// 	const handleProfileClick = () => {
// 		handleShowProfile();
// 		if (initialValues.location_preference) {
// 			setTempLocations([...initialValues.location_preference]);
// 		}
// 	};

// 	const handleCancelClick = () => {
// 		positionRef.current.value = initialValues.position;
// 		salary_minRef.current.value = initialValues.salary_min;
// 		salary_maxRef.current.value = initialValues.salary_max;
// 		remoteRef.current.value = initialValues.location_remote;
// 		setTempLocations(initialValues.location_preference);
// 		setLocationInput('');
// 		setEditing(false);
// 	};

// 	const handleSavePrefClick = async () => {
// 		const { error } = await supabase
// 			.from('profiles')
// 			.update({
// 				position: positionRef.current.value,
// 				salary_min: salary_minRef.current.value * 1,
// 				salary_max: salary_maxRef.current.value * 1,
// 				location_preference: tempLocations,
// 				location_remote: remoteRef.current.checked,
// 			})
// 			.eq('id', userProfile.id);
// 		fetchUserProfile();
// 		setAlert('Preferences updated', 'success');
// 		setEditing(false);

// 		if (error) {
// 			setAlert('Unable to update preferences', 'danger');
// 			console.log('error is', error);
// 			return;
// 		}
// 	};

// 	if (userProfile) {
// 		return (
// 			<Wrapper>
// 				{/* Profile Button */}
// 				<Button
// 					variant='light'
// 					style={{
// 						border: 'none',
// 						padding: '0',
// 						borderRadius: '99px',
// 					}}
// 					onClick={handleProfileClick}>
// 					<img
// 						src={user.picture}
// 						alt={user.name}
// 						style={{ width: '40px', borderRadius: '100px' }}
// 					/>
// 				</Button>

// 				{/* Modal */}
// 				<Modal fullscreen='md-down' show={showProfile} onHide={handleOnHide}>
// 					<Modal.Header closeButton>
// 						<Modal.Title>Profile</Modal.Title>
// 					</Modal.Header>
// 					<Modal.Body>
// 						<>
// 							{!editing ? (
// 								<>
// 									{/* Account */}
// 									<section style={{ paddingBottom: '2rem' }}>
// 										<h4 style={{ paddingBottom: '1rem' }}>Account</h4>
// 										<Form>
// 											<Form.Group className='mb-3' controlId='name'>
// 												<Form.Label>Name</Form.Label>
// 												<Form.Control
// 													type='text'
// 													// ref={nameRef}
// 													defaultValue={user.name}
// 													readOnly
// 													plaintext
// 												/>
// 											</Form.Group>
// 											<Form.Group className='mb-3' controlId='email'>
// 												<Form.Label>Email</Form.Label>
// 												<Form.Control
// 													type='text'
// 													// ref={emailRef}
// 													defaultValue={user.email}
// 													readOnly
// 													plaintext
// 												/>
// 											</Form.Group>
// 										</Form>
// 									</section>
// 								</>
// 							) : (
// 								''
// 							)}
// 							{/* Preferences */}
// 							<section>
// 								<h4 style={{ paddingBottom: '1rem' }}>Job search goals</h4>
// 								{!editing ? (
// 									<>
// 										<Form>
// 											<Form.Group className='mb-4' controlId='position'>
// 												<Form.Label>Target position</Form.Label>
// 												<Form.Control
// 													type='text'
// 													placeholder='No position added...'
// 													ref={positionRef}
// 													defaultValue={initialValues.position}
// 													readOnly
// 													plaintext
// 												/>
// 											</Form.Group>

// 											<Form.Group className='mb-4' controlId='salary-range'>
// 												<Form.Label>Target salary range ($)</Form.Label>
// 												<div
// 													style={{
// 														padding: '7px 0',
// 													}}>
// 													${initialValues.salary_min.toLocaleString()} -{' '}
// 													{initialValues.salary_max.toLocaleString()}
// 												</div>
// 											</Form.Group>

// 											<Form.Group className='mb-3' controlId='location'>
// 												<Form.Label>Target locations</Form.Label>
// 												<div
// 													style={{
// 														display: 'flex',
// 														flexWrap: 'wrap',
// 													}}>
// 													{userProfile.location_preference &&
// 														tempLocations.map((location) => (
// 															<FoliBadge content={location} />
// 														))}
// 													{/* {userProfile.location_preference ?? (
//                                                         <p
//                                                             style={{
//                                                                 margin: 0,
//                                                                 fontSize:
//                                                                     'medium',
//                                                             }}
//                                                         >
//                                                             No locations added
//                                                         </p>
//                                                     )} */}
// 												</div>

// 												{/* TODO Figure out how to add remote badge */}
// 												{/*
//                                                     {initialValues.location_remote && (
//                                                         <FoliBadge content='Remote' />
//                                                     )} */}

// 												<Form.Group className='mb-3' controlId='remote'>
// 													<Form.Check
// 														label='Include remote'
// 														ref={remoteRef}
// 														defaultChecked={initialValues.location_remote}
// 														disabled
// 													/>
// 												</Form.Group>
// 											</Form.Group>
// 										</Form>
// 									</>
// 								) : (
// 									<>
// 										<Form>
// 											{/* Position */}
// 											<Form.Group className='mb-4' controlId='position'>
// 												<Form.Label>Target position</Form.Label>
// 												<Form.Control
// 													type='text'
// 													placeholder='No position added...'
// 													ref={positionRef}
// 													defaultValue={initialValues.position}
// 												/>
// 											</Form.Group>
// 											{/* Salary */}
// 											<Stack direction='horizontal' gap={4}>
// 												<Form.Group className='mb-4' controlId='salary-min'>
// 													<Form.Label>Target salary range ($)</Form.Label>
// 													<Form.Control
// 														type='number'
// 														placeholder='Minimum'
// 														ref={salary_minRef}
// 														defaultValue={initialValues.salary_min}
// 														// style={{ maxWidth: '120px' }}
// 													/>
// 												</Form.Group>
// 												<span
// 													style={{
// 														paddingTop: '.5rem',
// 													}}>
// 													-
// 												</span>
// 												<Form.Group className='mb-4' controlId='salary-max'>
// 													<Form.Control
// 														type='number'
// 														placeholder='Maximum'
// 														ref={salary_maxRef}
// 														defaultValue={initialValues.salary_max}
// 														style={{
// 															marginTop: '1.85rem',
// 														}}
// 													/>
// 												</Form.Group>
// 											</Stack>
// 											{/* Locations */}
// 											<Form.Group className='mb-2' controlId='location'>
// 												<Form.Label>Target locations</Form.Label>
// 												<InputGroup className='mb-2'>
// 													<Form.Control
// 														type='text'
// 														placeholder='Add all locations...'
// 														ref={locationRef}
// 														value={locationInput}
// 														onChange={(e) => setLocationInput(e.target.value)}
// 													/>
// 													<Button
// 														variant='secondary'
// 														id='button-addon2'
// 														onClick={handleAddLocation}
// 														disabled={!locationInput}>
// 														Add
// 													</Button>
// 												</InputGroup>
// 												<Form.Group controlId='remote'>
// 													<Form.Check
// 														label='Include remote'
// 														ref={remoteRef}
// 														defaultChecked={initialValues.location_remote}
// 													/>
// 												</Form.Group>
// 												<div
// 													style={{
// 														marginTop: '.5rem',
// 														display: 'flex',
// 													}}>
// 													{userProfile.location_preference &&
// 														tempLocations.map((location) => (
// 															<FoliBadge
// 																content={location}
// 																closeBtn
// 																handleRemoveLocation={handleRemoveLocation}
// 																location={location}
// 															/>
// 														))}

// 													{/* {initialValues.location_remote ? (
//                                                         <FoliBadge content='Remote'/>
//                                                     ) : (
//                                                         ''
//                                                     )} */}
// 												</div>
// 											</Form.Group>
// 										</Form>
// 									</>
// 								)}
// 								{!editing ? (
// 									<Button variant='outline-secondary' onClick={handleEditClick}>
// 										Edit
// 									</Button>
// 								) : (
// 									''
// 								)}
// 							</section>
// 						</>
// 					</Modal.Body>
// 					<Modal.Footer>
// 						<div
// 							style={{
// 								display: 'flex',
// 								justifyContent: 'flex-end',
// 								gap: '1rem',
// 							}}>
// 							{!editing ? (
// 								<Button
// 									variant='outline-secondary'
// 									onClick={() =>
// 										logout({
// 											logoutParams: {
// 												returnTo: window.location.origin,
// 											},
// 										})
// 									}>
// 									Log Out
// 								</Button>
// 							) : (
// 								<>
// 									<Button
// 										variant='outline-secondary'
// 										onClick={handleCancelClick}>
// 										Cancel
// 									</Button>
// 									<Button variant='primary' onClick={handleSavePrefClick}>
// 										Save
// 									</Button>
// 								</>
// 							)}
// 						</div>
// 					</Modal.Footer>
// 				</Modal>
// 			</Wrapper>
// 		);
// 	}
// };
// export default ModalProfile;

// const Wrapper = styled.div`
// 	*/ img {
// 		width: 100px;
// 	}
// `;
