import { useState, useContext, useRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';

const AddJobBtn = () => {
	const { fetchUserJobs, setCreatedJobID } = useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const { user } = useAuth0();

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

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handleAddJobClick();
		} else {
			setValidated(true);
		}
	};

	const handleAddJobClick = async () => {
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

		const { data, error } = await supabase
			.from('jobs')
			.insert({
				account: user.email,
				company: companyRef.current.value,
				position: positionRef.current.value,
				salary_min: salary_min,
				salary_max: salary_max,
				location: locationRef.current.value,
				remote: remoteRef.current.checked,
				link: linkRef.current.value,
				status: 'Interested',
				edited: new Date().toLocaleDateString('en-US'),
			})
			.select();

		if (error) {
			setAlert('Unable to add job', 'error');
			return;
		}

		fetchUserJobs();
		setAlert('Job added', 'success');
		const newJobId = data[0].id;
		// console.log('newJobId', newJobId);
		await supabase.from('pages').insert({
			title: 'Job Description',
			account: user.email,
			jobid: newJobId,
			locked: true,
		});
		setCreatedJobID(newJobId);
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setIsModalOpen(true)}>
				Add job
			</button>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title='Add job'>
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
							className='input input-bordered w-full'
							ref={companyRef}
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
							className='input input-bordered w-full'
							ref={positionRef}
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
								className='input input-bordered w-full'
								placeholder='0'
								ref={salary_minRef}
							/>
						</label>
						{/* Salary max */}
						<label className='form-control w-full'>
							<div className='label'>
								<span className='label-text'>Salary maximum ($)</span>
							</div>
							<input
								type='number'
								className='input input-bordered w-full'
								placeholder='0'
								ref={salary_maxRef}
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
							className='input input-bordered w-full'
							ref={locationRef}
						/>
					</label>
					{/* Remote */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>Remote / hybrid</span>
						</div>
						<input type='checkbox' className='checkbox' ref={remoteRef} />
					</label>
					{/* Listing URL */}
					<label className='form-control w-full'>
						<div className='label'>
							<span className='label-text'>Listing URL</span>
						</div>
						<input
							type='text'
							className='input input-bordered w-full'
							ref={linkRef}
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

export default AddJobBtn;
