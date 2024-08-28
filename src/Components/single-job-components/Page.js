import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import MarkdownView from 'react-showdown';
import useAlert from '../../Custom Hooks/useAlert';
import ReactQuillEditor from '../atom-components/ReactQuillEditor';
import { supabase } from '../../API/supabase';
import { Resizable } from 're-resizable';
import { DotsVerticalIcon, Pencil1Icon } from '@radix-ui/react-icons';
import '../../quillStyles1.css';
import DeletePageBtn from '../modal-components/DeletePageBtn';

const Page = (page) => {
	const { fetchCurrentPages, currentJob } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	// 	React Quill Editor Variables & Functions
	const [content, setContent] = useState(page.content);

	const initialVisibleValue = page.visible;
	//  Check width on load and render mobile or desktop pages
	const isMobile = window.matchMedia('(max-width: 768px)').matches;

	// 	Resizing
	const [pageWidth, setPageWidth] = useState(page.width);

	const handleUpdateWidthClick = async (newPageWidth) => {
		setPageWidth(newPageWidth);
		const { error } = await supabase
			.from('pages')
			.update({
				width: newPageWidth,
			})
			.eq('id', page.id);
		if (error) {
			setAlert('Unable to update page width.', 'error');
			console.log('error is', error);
			return;
		}
	};

	// 	EDITING PAGE FUNCTIONS
	const [editing, setEditing] = useState(false);
	const handleEditClick = () => {
		setEditing(true);
		// console.log('editing is now', editing);
	};

	const handleCancelClick = () => {
		setContent(page.content);
		setEditing(false);
		// setShowEditPageModal(false);
	};

	const closeEditorWarning = (event) => {
		if (editing) {
			event.preventDefault();
			event.returnValue = '';
		}
	};

	// 	// ATTEMPTING TO PREVENT USER FROM LEAVING IF EDITING IS TRUE
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			closeEditorWarning(event);
		};

		const handlePopstate = (event) => {
			closeEditorWarning(event);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		window.addEventListener('popstate', handlePopstate);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('popstate', handlePopstate);
		};
	}, [editing]);

	const handleEditorChange = (value) => {
		setContent(value);
	};

	const handleUpdateContentClick = async () => {
		if (page.locked) {
			const { error } = await supabase
				.from('pages')
				.update({
					content: content,
				})
				.eq('id', page.id);
			setAlert('Page updated', 'success');
			fetchCurrentPages(currentJob);
			setEditing(false);
			// setShowEditPageModal(false);
			if (error) {
				setAlert('Unable to update page', 'error');
				console.log('error is', error);
				return;
			}
		}
		if (!page.locked) {
			const { error } = await supabase
				.from('pages')
				.update({
					content: content,
					title: titleRef.current.value,
				})
				.eq('id', page.id);
			setAlert('Page updated', 'success');
			fetchCurrentPages(currentJob);
			setEditing(false);
			// setShowEditPageModal(false);
			if (error) {
				setAlert('Unable to update page', 'error');
				console.log('error is', error);
				return;
			}
		}
	};

	// Editing Title
	const initialTitleValue = page.title ?? '';
	const [title, setTitle] = useState(page.title);
	const titleRef = useRef();
	const [characterCount, setCharacterCount] = useState(title.length);
	const titleMaxChar = 32;
	const handleTitleChange = (event) => {
		const newValue = event.target.value;
		setCharacterCount(newValue.length);
	};

	if (initialVisibleValue === false) {
		return <></>;
	}

	// MOBILE PAGE
	// if (isMobile === true && initialVisibleValue === true) {
	// 	return (
	// 		<>
	// 			<article className='bg-base-100 w-[92vw] h-hull py-4 px-0 flex flex-col gap-2'>
	// 				{/* Title Content */}
	// 				<header>
	// 					{editing ? (
	// 						<div className='flex justify-between'>
	// 							{page.locked ? (
	// 								<label className='font-bold pl-2'>{page.title}</label>
	// 							) : (
	// 								<label className='input input-xs flex grow items-center gap-2 mb-[2px]'>
	// 									<input
	// 										type='text'
	// 										required
	// 										ref={titleRef}
	// 										defaultValue={initialTitleValue}
	// 										maxLength={titleMaxChar}
	// 										onChange={handleTitleChange}
	// 										placeholder='Add page title'
	// 										className='grow font-bold text-base'
	// 									/>
	// 									<span className='label-text-alt'>
	// 										{characterCount}/{titleMaxChar}
	// 									</span>
	// 								</label>
	// 							)}
	// 						</div>
	// 					) : (
	// 						<div className='flex justify-between'>
	// 							<label className='font-bold pl-[9px]'>{page.title}</label>
	// 							<div className='flex justify-end gap-2'>
	// 								{page.locked ? (
	// 									''
	// 								) : (
	// 									<div className='dropdown dropdown-end'>
	// 										<div
	// 											tabIndex={0}
	// 											role='button'
	// 											className='btn btn-xs btn-ghost '>
	// 											<DotsVerticalIcon />
	// 										</div>
	// 										<ul
	// 											tabIndex={0}
	// 											className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
	// 											{/* Delete option */}
	// 											<li>
	// 												<button
	// 													className='text-error'
	// 													onClick={() =>
	// 														document
	// 															.getElementById('delete_page_modal')
	// 															.showModal()
	// 													}>
	// 													Delete
	// 												</button>
	// 											</li>
	// 										</ul>
	// 									</div>
	// 								)}
	// 							</div>
	// 						</div>
	// 					)}
	// 				</header>
	// 				<hr />

	// 				{/* Markdown/Quill content */}
	// 				{editing ? (
	// 					// Quill version
	// 					<div className='flex flex-col justify-between h-full'>
	// 						<div className='page-scroll'>
	// 							<ReactQuillEditor
	// 								value={content}
	// 								onChange={handleEditorChange}
	// 							/>
	// 						</div>
	// 						<div className='flex justify-end gap-2'>
	// 							<button
	// 								type='button'
	// 								className='btn btn-sm btn-ghost btn-primary w-fit'
	// 								onClick={handleCancelClick}>
	// 								Cancel
	// 							</button>
	// 							<button
	// 								type='button'
	// 								className='btn btn-sm btn-primary w-fit'
	// 								onClick={handleUpdateContentClick}>
	// 								Save page
	// 							</button>
	// 						</div>
	// 					</div>
	// 				) : (
	// 					// Markdown version
	// 					<div className='flex flex-col justify-between h-full'>
	// 						<MarkdownView
	// 							className='page-scroll markdown-content'
	// 							markdown={page.content}
	// 						/>
	// 						<div className='flex justify-end'>
	// 							<button
	// 								type='button'
	// 								className='btn btn-sm btn-outline btn-primary w-fit'
	// 								onClick={handleEditClick}>
	// 								Edit page
	// 							</button>
	// 						</div>
	// 					</div>
	// 				)}
	// 			</article>
	// 		</>
	// 	);
	// }

	// 	// DESKTOP PAGE
	// if (isMobile === false) {
	return (
		<>
			<Resizable
				enable={{
					top: false,
					right: true,
					bottom: false,
					left: false,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				}}
				onResizeStop={(e, direction, ref, d) => {
					const newPageWidth = pageWidth + d.width;
					handleUpdateWidthClick(newPageWidth);
				}}
				minWidth='300px'
				maxWidth='700px'
				size={{ height: '100%', width: pageWidth }}
				className={`${
					editing ? 'bg-neutral' : 'bg-base-100'
				} h-full p-4 flex flex-col gap-2`}>
				{/* Title Content */}
				<header>
					{editing ? (
						<div className='flex justify-between'>
							{page.locked ? (
								<label className='font-bold pl-2'>{page.title}</label>
							) : (
								<label className='input input-ghost input-xs flex grow items-center gap-2 mb-[2px]'>
									<input
										type='text'
										required
										ref={titleRef}
										defaultValue={initialTitleValue}
										maxLength={titleMaxChar}
										onChange={handleTitleChange}
										placeholder='Add page title'
										className='grow font-bold text-base '
									/>

									<span className='label-text-alt'>
										{characterCount}/{titleMaxChar}
									</span>
								</label>
							)}
						</div>
					) : (
						<div className='flex justify-between'>
							<label className='font-bold pl-[9px]'>{page.title}</label>
							<div className='flex justify-end gap-2'>
								<button
									className='btn btn-xs btn-ghost'
									onClick={handleEditClick}>
									<Pencil1Icon />
								</button>
								{page.locked ? (
									''
								) : (
									<div className='dropdown dropdown-end'>
										<button tabIndex={0} className='btn btn-xs btn-ghost '>
											<DotsVerticalIcon />
										</button>
										<ul
											tabIndex={0}
											className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
											<li>
												<DeletePageBtn page={page} />
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					)}
				</header>
				<div className='divider m-0' />

				{/* Markdown/Quill content */}
				{editing ? (
					// Quill version
					<div className='flex flex-col justify-between h-full'>
						<div className='page-scroll'>
							<ReactQuillEditor value={content} onChange={handleEditorChange} />
						</div>
						<div className='flex justify-end gap-2'>
							<button
								type='button'
								className='btn btn-sm btn-ghost btn-primary w-fit'
								onClick={handleCancelClick}>
								Cancel
							</button>
							<button
								type='button'
								className='btn btn-sm btn-primary w-fit'
								onClick={handleUpdateContentClick}>
								Save page
							</button>
						</div>
					</div>
				) : (
					// Markdown version
					<div className='flex flex-col justify-between h-full'>
						<MarkdownView
							className='page-scroll markdown-content'
							markdown={page.content}
						/>
					</div>
				)}
			</Resizable>
		</>
	);
};
// };
export default Page;

// 	// MOBILE PAGE
// 	if (isMobile === true && initialVisibleValue === true) {
// 		return (
// 			<Wrapper>
// 				<div className='page-content pages-mobile'>
// 					<header className='page-title'>
// 						{/* {!editing ? ( */}
// 						<Stack direction='horizontal'>
// 							<h6 style={{ color: 'var(--primary-700)' }}>{page.title}</h6>
// 							<Stack direction='horizontal' className='ms-auto'>
// 								<Button
// 									variant='light'
// 									style={{
// 										background: 'var(--white)',
// 										border: 0,
// 									}}
// 									onClick={handleOpenPageModalClick}>
// 									<AiFillEdit />
// 								</Button>
// 								{page.locked ? (
// 									''
// 								) : (
// 									<Dropdown onSelect={handleSelect}>
// 										<Dropdown.Toggle
// 											id='dropdown'
// 											variant='link'
// 											style={{
// 												color: 'var(--grey-800)',
// 											}}>
// 											<FiMoreVertical />
// 										</Dropdown.Toggle>
// 										<Dropdown.Menu>
// 											<Dropdown.Item eventKey='1'>Delete page</Dropdown.Item>
// 										</Dropdown.Menu>
// 									</Dropdown>
// 								)}
// 							</Stack>
// 							{showEditPageModal && (
// 								<ModalEditPage
// 									showEditPageModal={showEditPageModal}
// 									handleCancelClick={handleCancelClick}
// 									page={page}
// 									content={content}
// 									setContent={setContent}
// 									initialTitleValue={initialTitleValue}
// 									titleRef={titleRef}
// 									titleMaxChar={titleMaxChar}
// 									handleTitleChange={handleTitleChange}
// 									characterCount={characterCount}
// 									handleUpdateContentClick={handleUpdateContentClick}
// 									handleEditorChange={handleEditorChange}
// 								/>
