// import { useRef, useContext } from 'react';
// import { DatabaseContext } from '../../context/DatabaseContext';
// import useAlert from '../../Custom Hooks/useAlert';
// import styled from 'styled-components';
// import { Button, Modal, Form, Stack } from 'react-bootstrap';
// import { supabase } from '../../API/supabase';

// const ModalEditJob = ({ show, close, job }) => {
// 	const { fetchUserJobs } = useContext(DatabaseContext);

// 	const { setAlert } = useAlert();

// 	const companyRef = useRef();
// 	const positionRef = useRef();
// 	const salary_minRef = useRef();
// 	const salary_maxRef = useRef();
// 	const locationRef = useRef();
// 	const remoteRef = useRef();
// 	const linkRef = useRef();

// 	const initialValues = {
// 		company: job?.company ?? '',
// 		position: job?.position ?? '',
// 		salary_min: job?.salary_min ?? '',
// 		salary_max: job?.salary_max ?? '',
// 		location: job?.location ?? '',
// 		remote: job?.remote ?? false,
// 		link: job?.link ?? '',
// 	};

// 	const handleEditJobClick = async () => {
// 		let salary_min = salary_minRef.current.value.trim();
// 		let salary_max = salary_maxRef.current.value.trim();

// 		if (salary_min === '') {
// 			salary_min = null;
// 		} else {
// 			salary_min = parseInt(salary_min);
// 		}

// 		if (salary_max === '') {
// 			salary_max = null;
// 		} else {
// 			salary_max = parseInt(salary_max);
// 		}

// 		const { error } = await supabase
// 			.from('jobs')
// 			.update({
// 				company: companyRef.current.value,
// 				position: positionRef.current.value,
// 				salary_min: salary_min,
// 				salary_max: salary_max,
// 				location: locationRef.current.value,
// 				remote: remoteRef.current.checked,
// 				link: linkRef.current.value,
// 				edited: new Date().toLocaleDateString('en-US'),
// 			})
// 			.eq('id', job.id);
// 		setAlert('Job updated', 'success');
// 		fetchUserJobs();
// 		close();
// 		if (error) {
// 			setAlert('Unable to update job', 'danger');
// 			console.log('error is', error);
// 			return;
// 		}
// 	};

// 	const handleCancelClick = () => {
// 		positionRef.current.value = initialValues.position;
// 		salary_minRef.current.value = initialValues.salary_min;
// 		salary_maxRef.current.value = initialValues.salary_max;
// 		remoteRef.current.value = initialValues.remote;
// 		locationRef.current.value = initialValues.location;
// 		linkRef.current.value = initialValues.link;
// 		close();
// 	};

// 	return (
// 		<Wrapper>
// 			<Modal fullscreen='md-down' show={show} onHide={close}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Edit job</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<Form>
// 						<Form.Group className='mb-3' controlId='company'>
// 							<Form.Label>Company</Form.Label>
// 							<Form.Control
// 								type='text'
// 								placeholder='Google, Apple, etc.'
// 								ref={companyRef}
// 								defaultValue={initialValues.company}
// 							/>
// 						</Form.Group>
// 						<Form.Group className='mb-3' controlId='position'>
// 							<Form.Label>Position</Form.Label>
// 							<Form.Control
// 								type='text'
// 								ref={positionRef}
// 								defaultValue={initialValues.position}
// 							/>
// 						</Form.Group>
// 						<Stack direction='horizontal' gap={4}>
// 							<Form.Group className='mb-3' controlId='salary-min'>
// 								<Form.Label>Salary Min ($)</Form.Label>
// 								<Form.Control
// 									type='number'
// 									placeholder='40,000'
// 									ref={salary_minRef}
// 									defaultValue={initialValues.salary_min}
// 								/>
// 							</Form.Group>
// 							<span style={{ paddingTop: '1rem' }}>-</span>
// 							<Form.Group className='mb-3' controlId='salary-max'>
// 								<Form.Label>Salary Max ($)</Form.Label>
// 								<Form.Control
// 									type='number'
// 									placeholder='60,000'
// 									ref={salary_maxRef}
// 									defaultValue={initialValues.salary_max}
// 								/>
// 							</Form.Group>
// 						</Stack>
// 						<Form.Group className='mb-1' controlId='location'>
// 							<Form.Label>Location</Form.Label>
// 							<Form.Control
// 								type='text'
// 								placeholder='Start typing a city...'
// 								ref={locationRef}
// 								defaultValue={initialValues.location}
// 							/>
// 						</Form.Group>
// 						<Form.Group className='mb-1' controlId='remote'>
// 							<Form.Check
// 								label='Job is remote'
// 								ref={remoteRef}
// 								defaultChecked={initialValues.remote}
// 							/>
// 						</Form.Group>
// 						<Form.Group className='mb-3' controlId='link'>
// 							<Form.Label>Listing URL</Form.Label>
// 							<Form.Control
// 								type='text'
// 								placeholder='Add website location of job listing'
// 								ref={linkRef}
// 								defaultValue={initialValues.link}
// 							/>
// 						</Form.Group>
// 					</Form>
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant='outline-secondary' onClick={handleCancelClick}>
// 						Cancel
// 					</Button>
// 					<Button variant='primary' onClick={handleEditJobClick}>
// 						Confirm
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</Wrapper>
// 	);
// };

// export default ModalEditJob;

// const Wrapper = styled.div`
// 	.editor {
// 		height: 250px;
// 		max-height: 500px;
// 		overflow-y: auto;
// 	}
// `;
