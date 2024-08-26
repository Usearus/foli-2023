import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import { supabase } from '../../API/supabase';

// YOU MUST ALWAYS USE MATCH THE ID
export const ModalDeletePage = ({ page }) => {
	const { fetchCurrentPages, currentJob } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

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

	// YOU MUST ALWAYS USE MATCH THE ID
	return (
		<dialog
			id='delete_page_modal'
			className='modal flex justify-center items-center'>
			<div className='modal-box bg-base-200'>
				<form method='dialog'>
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
						✕
					</button>
				</form>
				<h3 className='font-bold text-lg'>Delete page</h3>
				<p className='py-4'>Are you sure you want to delete this page?</p>
				<div className='modal-action'>
					<button
						className='btn btn-outline btn-error'
						onClick={handleDeletePage}>
						Confirm delete
					</button>
				</div>
			</div>
		</dialog>
	);
};
