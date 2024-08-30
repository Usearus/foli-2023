import { useState, useContext, useRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';

const EditJobBtn = ({ job }) => {
	const { fetchUserJobs, fetchUserJobsArchived, fetchCurrentJob, currentJob } =
		useContext(DatabaseContext);
	const { setAlert } = useAlert();

	// Form Variables
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [validated, setValidated] = useState(false);

	const companyRef = useRef();
	const positionRef = useRef();
	const salary_minRef = useRef();
	const salary_maxRef = useRef();
	const locationRef = useRef();
	const remoteRef = useRef();
	const linkRef = useRef();

	const initialValues = {
		company: job?.company ?? '',
		position: job?.position ?? '',
		salary_min: job?.salary_min ?? '',
		salary_max: job?.salary_max ?? '',
		location: job?.location ?? '',
		remote: job?.remote ?? false,
		link: job?.link ?? '',
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handleEditJobClick();
		} else {
			setValidated(true);
		}
	};

	const handleEditJobClick = async () => {
		let salary_min = salary_minRef.current.value.trim();
		let salary_max = salary_maxRef.current.value.trim();

		if (salary_min === '') {
			salary_min = null;
		} else {
			salary_min = parseInt(salary_min);
		}

		if (salary_max === '') {
			salary_max = null;
		} else {
			salary_max = parseInt(salary_max);
		}

		const { error } = await supabase
			.from('jobs')
			.update({
				company: companyRef.current.value,
				position: positionRef.current.value,
				salary_min: salary_min,
				salary_max: salary_max,
				location: locationRef.current.value,
				location_remote: remoteRef.current.checked,
				link: linkRef.current.value,
				edited: new Date().toLocaleDateString('en-US'),
			})
			.eq('id', job.id);
		fetchUserJobs();
		fetchUserJobsArchived();
		fetchCurrentJob(currentJob);
		setAlert('Job updated', 'success');
		setIsModalOpen(false);

		if (error) {
			setAlert('Unable to add job', 'error');
			return;
		}
	};

	const handleCancelClick = () => {
		positionRef.current.value = initialValues.position;
		salary_minRef.current.value = initialValues.salary_min;
		salary_maxRef.current.value = initialValues.salary_max;
		remoteRef.current.value = initialValues.remote;
		locationRef.current.value = initialValues.location;
		linkRef.current.value = initialValues.link;
		setIsModalOpen(false);
	};

	return (
		<>
			<p className='text-sm' onClick={() => setIsModalOpen(true)}>
				Edit job
			</p>

			<Modal isOpen={isModalOpen} onClose={handleCancelClick} title='Edit job'>
				<form className='flex flex-col gap-2' onSubmit={handleSubmit}>
					{/* Company */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>
								Company <span className='text-primary'>*</span>
							</span>
						</div>
						<input
							type='text'
							required
							className='input input-bordered w-full bg-base-300'
							ref={companyRef}
							defaultValue={initialValues.company}
						/>
					</label>
					{/* Position */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>
								Position <span className='text-primary'>*</span>
							</span>
						</div>
						<input
							type='text'
							required
							className='input input-bordered w-full bg-base-300'
							ref={positionRef}
							defaultValue={initialValues.position}
						/>
					</label>
					{/* Salary range fields */}
					<div className='flex gap-6'>
						{/* Salary min */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Salary minimum ($)</span>
							</div>
							<input
								type='number'
								className='input input-bordered w-full bg-base-300'
								placeholder='0'
								ref={salary_minRef}
								defaultValue={initialValues.salary_min}
							/>
						</label>
						{/* Salary max */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Salary maximum ($)</span>
							</div>
							<input
								type='number'
								className='input input-bordered w-full bg-base-300'
								placeholder='0'
								ref={salary_maxRef}
								defaultValue={initialValues.salary_max}
							/>
						</label>
					</div>
					{/* Location */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>Location</span>
						</div>
						<input
							type='text'
							className='input input-bordered w-full bg-base-300'
							ref={locationRef}
							defaultValue={initialValues.location}
						/>
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
							defaultChecked={initialValues.remote}
						/>
					</label>
					{/* Listing URL */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>Listing URL</span>
						</div>
						<input
							type='text'
							className='input input-bordered w-full bg-base-300'
							ref={linkRef}
							defaultValue={initialValues.link}
						/>
					</label>
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

export default EditJobBtn;
