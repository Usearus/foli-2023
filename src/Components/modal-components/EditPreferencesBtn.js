import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons';

const EditPreferencesBtn = () => {
	const { userProfile, fetchUserProfile } = useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Form Variables
	const [validated, setValidated] = useState(false);

	const [locationInput, setLocationInput] = useState('');
	const [tempLocations, setTempLocations] = useState([]);

	const positionRef = useRef();
	const locationRef = useRef();
	const salary_currentRef = useRef();
	const salary_targetRef = useRef();
	const remoteRef = useRef();

	const initialValues = {
		position: userProfile?.position ?? '',
		salary_current: userProfile?.salary_current ?? '',
		salary_target: userProfile?.salary_target ?? '',
		location_preference: userProfile?.location_preference ?? [],
		location_remote: userProfile?.location_remote ?? false,
	};

	useEffect(() => {
		if (userProfile) {
			setTempLocations(userProfile.location_preference ?? []);
		}
	}, [userProfile]);

	const handleCancelClick = () => {
		positionRef.current.value = initialValues.position;
		salary_currentRef.current.value = initialValues.salary_current;
		salary_targetRef.current.value = initialValues.salary_target;
		locationRef.current.value = initialValues.location_preference;
		remoteRef.current.value = initialValues.location_remote;
		setTempLocations(userProfile.location_preference ?? []);
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

	console.log('temp locations are', tempLocations);
	console.log('initial locations are', userProfile.location_preference);

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handlePreferencesClick();
		} else {
			setValidated(true);
		}
	};

	const handlePreferencesClick = async () => {
		const { error } = await supabase
			.from('profiles')
			.update({
				position: positionRef.current.value,
				salary_current: salary_currentRef.current.value * 1,
				salary_target: salary_targetRef.current.value * 1,
				location_preference: tempLocations,
				location_remote: remoteRef.current.checked,
			})
			.eq('id', userProfile.id);
		fetchUserProfile();
		setIsModalOpen(false);
		setAlert('Job preferences updated', 'success');
		if (error) {
			setAlert('Unable to update job preferences', 'error');
			console.log('error is', error);
			return;
		}
	};

	return (
		<>
			<button
				className='btn btn-ghost btn-sm'
				onClick={() => setIsModalOpen(true)}>
				<Pencil1Icon />
			</button>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCancelClick}
				title='Edit job preferences'>
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
							defaultValue={initialValues.position}
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
								defaultValue={initialValues.salary_current}
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
								defaultValue={initialValues.salary_target}
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
							<div className='flex mt-1 mb-2 gap-1 flex-wrap'>
								{tempLocations &&
									tempLocations.length > 0 &&
									tempLocations.map((location) => (
										<div
											key={location}
											className='badge badge-neutral gap-2 mt-2'>
											{location}
											<Cross2Icon
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
								defaultChecked={initialValues.location_remote}
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

export default EditPreferencesBtn;
