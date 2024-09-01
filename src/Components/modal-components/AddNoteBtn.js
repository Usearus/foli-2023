import { useState, useContext, useRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import Modal from './Modal';
import { supabase } from '../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';

const AddNoteBtn = () => {
	const { fetchUserNotePages, userNotePages } = useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const { user } = useAuth0();

	// Form Variables
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [validated, setValidated] = useState(false);

	const titleRef = useRef();
	const titleMaxChar = 32;

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handleAddNoteClick();
		} else {
			setValidated(true);
		}
	};

	const handleAddNoteClick = async () => {
		const { data, error } = await supabase
			.from('pages')
			.insert({
				account: user.email,
				title: titleRef.current.value,
				position: userNotePages.length,
				isNote: true,
			})
			.select();
		setAlert('Note added', 'success');
		if (error) {
			setAlert('Unable to add note', 'error');
			console.log(error);
			return;
		}

		fetchUserNotePages();
		// const newPageId = data[0].id;
		// setSelectedPageID(newPageId);
		setIsModalOpen(false);
	};

	const AddNoteModal = () => {
		return (
			<>
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title='Add note'>
					<div className='pb-4 flex flex-col gap-4'>
						<form onSubmit={handleSubmit}>
							{/* Title */}
							<label className='form-control w-full'>
								<div className='label'>
									<span className='label-text'>
										Title <span className='text-primary'>*</span>
									</span>
									{/* <span className='label-text-alt'>
										{characterCount}/{titleMaxChar}
									</span> */}
								</div>
								<input
									type='text'
									required
									ref={titleRef}
									maxLength={titleMaxChar}
									// onChange={handleTitleChange}
									className='input input-bordered w-full bg-base-300'
								/>
							</label>
							<div className='flex justify-end pt-6'>
								<button type='submit' className='btn btn-primary'>
									Confirm
								</button>
							</div>
						</form>
					</div>
				</Modal>
			</>
		);
	};

	return (
		<>
			<AddNoteModal />
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setIsModalOpen(true)}>
				Add note
			</button>
		</>
	);
};

export default AddNoteBtn;
