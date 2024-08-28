import { useState, useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

const DeleteJobBtn = ({ job }) => {
	const { fetchUserJobs } = useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const handleDeleteJob = async () => {
		const { error } = await supabase.from('jobs').delete().eq('id', job.id);
		if (error) {
			console.error(error);
			setAlert('Unable to delete job', 'error');
			return;
		}
		setAlert('Job deleted', 'success');
		fetchUserJobs();
		setIsModalOpen(false);

		// Only navigate to '/' if the current path is not already '/'
		if (location.pathname !== '/') {
			navigate(`/`);
		}
	};

	return (
		<>
			<p className='text-error text-sm' onClick={() => setIsModalOpen(true)}>
				Delete job
			</p>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title='Delete job'>
				<div className='pb-4'>
					<p>
						Are you sure you want to delete {` `}
						{job ? (
							<span className='font-bold'>
								{job.company} {job.position}
							</span>
						) : (
							<span className='text-error'>Error</span>
						)}
						?
					</p>
				</div>
				<div className='flex justify-end'>
					<button
						className='btn btn-outline btn-error'
						onClick={handleDeleteJob}>
						Confirm
					</button>
				</div>
			</Modal>
		</>
	);
};

export default DeleteJobBtn;
