import { useState, useRef, useContext } from 'react';
import { supabase } from '../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import ReactQuillEditor from '../atom-components/ReactQuillEditor';

const DropdownAddPage = () => {
	const { setAlert } = useAlert();
	const { user } = useAuth0();
	const { currentJob, currentPages, fetchCurrentPages, setSelectedPageID } =
		useContext(DatabaseContext);
	const [validated, setValidated] = useState(false);
	const titleRef = useRef();
	const [content, setContent] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [characterCount, setCharacterCount] = useState(0);
	const titleMaxChar = 32;

	const handleAddPageClick = async () => {
		if (currentJob) {
			await supabase.from('jobs').select().eq('id', currentJob.id);

			const { data, error } = await supabase
				.from('pages')
				.insert({
					account: user.email,
					title: titleRef.current.value,
					content: content,
					jobid: currentJob.id,
					position: currentPages.length,
				})
				.select();
			setAlert('Page added', 'success');
			if (error) {
				setAlert('Unable to add page', 'error');
				console.log(error);
				return;
			}

			fetchCurrentPages(currentJob);
			const newPageId = data[0].id;
			setSelectedPageID(newPageId);
			setIsModalOpen(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === true) {
			setValidated(false);
			handleAddPageClick();
		} else {
			setValidated(true);
		}
	};

	// const handleTitleChange = (event) => {
	// 	const newValue = event.target.value;
	// 	setCharacterCount(newValue.length);
	// };

	const handleClose = () => {
		setIsModalOpen(false);
		setContent('');
	};

	const AddPageModal = () => {
		return (
			<>
				{isModalOpen && (
					<dialog className='modal modal-open'>
						<div className='modal-box bg-base-200'>
							<form onSubmit={handleSubmit}>
								<button
									type='button'
									onClick={handleClose}
									className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
									✕
								</button>
								<h3 className='font-bold text-lg'>Add page</h3>
								<div className='pt-4 flex flex-col gap-4'>
									{/* Title */}
									<label className='form-control w-full'>
										<div className='label'>
											<span className='label-text'>Page title</span>
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
											className='input input-bordered w-full'
										/>
									</label>
									{/* Quill Content */}
									{/* <label className='form-control w-full'>
										<div className='label'>
											<span className='label-text'>Content</span>
										</div>
										<div className='min-h-[300px]'>
											<ReactQuillEditor value={content} />
										</div>
									</label> */}
									<div className='modal-action'>
										<button type='submit' className='btn btn-primary btn-sm'>
											Add
										</button>
									</div>
								</div>
							</form>
						</div>
					</dialog>
				)}
			</>
		);
	};

	return (
		<>
			<AddPageModal />
			<div className='dropdown dropdown-bottom dropdown-end'>
				<div tabIndex={0} role='button' className='btn btn-sm btn-primary m-1'>
					Add page
				</div>
				<ul
					tabIndex={0}
					className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
					<li>
						<button onClick={() => setIsModalOpen(true)}>Blank page</button>
					</li>
					<li className='disabled'>
						<button>Use template</button>
					</li>
					<li className='disabled'>
						<button>Use AI assistant</button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default DropdownAddPage;
