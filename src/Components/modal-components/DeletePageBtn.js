import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';

const DeletePageBtn = ({ page }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { fetchCurrentPages, currentJob } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleDeletePage = async () => {
		const { error } = await supabase.from('pages').delete().eq('id', page.id);
		if (error) {
			console.error(error);
			setAlert('Unable to delete page', 'danger');
			return;
		}
		setAlert('Page deleted', 'success');
		fetchCurrentPages(currentJob);
	};

	return (
		<>
			<p className='text-error text-sm' onClick={handleOpenModal}>
				Delete
			</p>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title='Delete page'>
				<div className='pb-4'>
					<p>Are you sure you want to delete this page?</p>
					<p>
						Page title:{` `}
						{page ? (
							<span className='font-bold'>{page.title}</span>
						) : (
							<span>Error</span>
						)}
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
