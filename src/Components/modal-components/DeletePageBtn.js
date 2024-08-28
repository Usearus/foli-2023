import { useState, useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';

const DeletePageBtn = ({ page }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { fetchCurrentPages, currentJob } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const handleDeletePage = async () => {
		const { error } = await supabase.from('pages').delete().eq('id', page.id);
		if (error) {
			console.error(error);
			setAlert('Unable to delete page', 'error');
			return;
		}
		setAlert('Page deleted', 'success');
		fetchCurrentPages(currentJob);
		setIsModalOpen(false);
	};

	return (
		<>
			<p className='text-error text-sm' onClick={() => setIsModalOpen(true)}>
				Delete
			</p>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title='Delete page'>
				<div className='pb-4'>
					<p>
						Are you sure you want to delete{' '}
						{page ? (
							<span className='font-bold'>{page.title}</span>
						) : (
							<span className='text-error'>Error</span>
						)}
						?
					</p>
				</div>
				<div className='flex justify-end'>
					<button
						className='btn btn-outline btn-error'
						onClick={handleDeletePage}>
						Confirm
					</button>
				</div>
			</Modal>
		</>
	);
};

export default DeletePageBtn;
