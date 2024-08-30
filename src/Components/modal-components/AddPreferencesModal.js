import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';
import { Cross1Icon } from '@radix-ui/react-icons';

const AddPreferencesModal = ({ isModalOpen, setIsModalOpen }) => {
	const { userProfile, fetchUserProfile } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const [isOnboarded, setIsOnboarded] = useState(undefined);

	// RUNS INITIAL ONBOARDING FOR USERS
	useEffect(() => {
		if (userProfile && userProfile.onboarded === false) {
			setIsModalOpen(true);
			setIsOnboarded(false);
		}
		if (userProfile && userProfile.onboarded === true) {
			setIsModalOpen(false);
			setIsOnboarded(true);
		}
	}, [userProfile, setIsModalOpen]);

	// Form Variables
	const [validated, setValidated] = useState(false);

	const [locationInput, setLocationInput] = useState('');
	const [tempLocations, setTempLocations] = useState([]);

	const positionRef = useRef();
	const locationRef = useRef();
	// const salary_minRef = useRef();
	// const salary_maxRef = useRef();
	const salary_currentRef = useRef();
	const salary_targetRef = useRef();
	const remoteRef = useRef();

	const handleCancelClick = () => {
		setIsModalOpen(false);
	};

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

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handleOnboardingClick();
		} else {
			setValidated(true);
		}
	};

	const handleOnboardingClick = async () => {
		const { error } = await supabase
			.from('profiles')
			.update({
				position: positionRef.current.value,
				salary_current: salary_currentRef.current.value * 1,
				salary_target: salary_targetRef.current.value * 1,
				location_preference: tempLocations,
				location_remote: remoteRef.current.checked,
				onboarded: true,
			})
			.eq('id', userProfile.id);
		fetchUserProfile();
		setIsModalOpen(false);
		setAlert('Job preferences updated', 'success');
		setIsOnboarded(true);
		if (error) {
			setAlert('Unable to update job preferences', 'error');
			console.log('error is', error);
			return;
		}
	};

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCancelClick}
				closeButton={false}
				title='Job preferences'>
				<p className='pb-6'>This can be updated anytime in settings.</p>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
					{/* Position */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>Position title</span>
						</div>
						<input
							type='text'
							className='input input-bordered w-full bg-base-300'
							ref={positionRef}
						/>
					</label>

					{/* Salary */}
					<div className='flex gap-4'>
						{/* Current salary */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Current salary ($)</span>
							</div>
							<input
								type='number'
								className='input input-bordered w-full bg-base-300'
								placeholder='0'
								ref={salary_currentRef}
							/>
						</label>
						{/* Target salary */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Target salary ($)</span>
							</div>
							<input
								type='number'
								className='input input-bordered w-full bg-base-300'
								placeholder='0'
								ref={salary_targetRef}
							/>
						</label>
					</div>

					{/* Location */}
					<div className='flex flex-col gap-2'>
						{/* All locations */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Location</span>
							</div>
							<div className='flex gap-2'>
								<input
									type='text'
									className='input input-bordered w-full bg-base-300'
									placeholder='ex: New York City, NY'
									ref={locationRef}
									value={locationInput}
									onChange={(e) => setLocationInput(e.target.value)}
								/>
								<button
									className='btn btn-primary'
									onClick={handleAddLocation}
									disabled={!locationInput}>
									Add location
								</button>
							</div>
							<div className='flex mt-1 mb-2 flex-wrap'>
								{tempLocations.map((location) => (
									<div
										key={location}
										className='badge badge-primary badge-lg gap-3 mt-2 px-3 py-3'>
										{location}
										<Cross1Icon
											onClick={() => handleRemoveLocation(location)}
											className='cursor-pointer'
										/>
									</div>
								))}
							</div>
						</label>

						{/* Remote */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Remote / hybrid</span>
							</div>
							<input
								type='checkbox'
								className='checkbox bg-base-300'
								ref={remoteRef}
								defaultChecked={false}
							/>
						</label>
					</div>

					{/* Form actions */}
					<div className='flex justify-end pt-6'>
						<button type='submit' className='btn btn-primary'>
							Confirm
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default AddPreferencesModal;
