import { useState, useContext, useRef, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import MarkdownView from 'react-showdown';
import useAlert from '../../Custom Hooks/useAlert';
import ReactQuillEditor from '../atom-components/ReactQuillEditor';
import { supabase } from '../../API/supabase';
import { Resizable } from 're-resizable';
import { DotsVerticalIcon, Pencil1Icon } from '@radix-ui/react-icons';
import '../../quillStyles.css';
import DeletePageBtn from '../modal-components/DeletePageBtn';

const PageNote = (page) => {
	const { fetchUserNotePages, userNotePages } = useContext(DatabaseContext);
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
		const { error } = await supabase
			.from('pages')
			.update({
				content: content,
				title: titleRef.current.value,
			})
			.eq('id', page.id);
		setAlert('Note updated', 'success');
		fetchUserNotePages();
		setEditing(false);
		if (error) {
			setAlert('Unable to update note', 'error');
			console.log('error is', error);
			return;
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

	return (
		<>
			{isMobile === false && initialVisibleValue === true ? (
				// Desktop Version
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
					className='h-full p-4 flex flex-col gap-2 bg-base-200 shadow-lg'>
					{/* Title Content */}
					<header>
						{editing ? (
							<div className='flex justify-between'>
								<label className='input input-ghost input-xs flex grow items-center gap-2 mb-[2px]'>
									<input
										type='text'
										required
										ref={titleRef}
										defaultValue={initialTitleValue}
										maxLength={titleMaxChar}
										onChange={handleTitleChange}
										placeholder='Add page title'
										className='grow font-bold text-base'
									/>
									<span className='label-text-alt'>
										{characterCount}/{titleMaxChar}
									</span>
								</label>
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
									<div className='dropdown dropdown-end'>
										<button tabIndex={0} className='btn btn-xs btn-ghost'>
											<DotsVerticalIcon />
										</button>
										<ul
											tabIndex={0}
											className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
											<li>
												<DeletePageBtn page={page} />
											</li>
										</ul>
									</div>
								</div>
							</div>
						)}
					</header>
					<div className='divider m-0 pb-[1px]' />

					{/* Markdown/Quill content */}
					{editing ? (
						<div className='flex flex-col justify-between h-full'>
							<div className='page-scroll'>
								<ReactQuillEditor
									value={content}
									onChange={handleEditorChange}
								/>
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
									Save note
								</button>
							</div>
						</div>
					) : (
						<div className='flex flex-col justify-between h-full'>
							<MarkdownView
								className='page-scroll markdown-content'
								markdown={page.content}
							/>
						</div>
					)}
				</Resizable>
			) : (
				// Mobile Version
				<div className='h-full w-[90vw] p-4 flex flex-col gap-2 bg-base-200 shadow-lg'>
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
											className='grow font-bold text-base'
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
									{!page.locked && (
										<div className='dropdown dropdown-end '>
											<button tabIndex={0} className='btn btn-xs btn-ghost'>
												<DotsVerticalIcon />
											</button>
											<ul
												tabIndex={0}
												className='dropdown-content menu  rounded-box z-[1] w-52 p-2 shadow'>
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
						<div className='flex flex-col justify-between h-full'>
							<div className='page-scroll'>
								<ReactQuillEditor
									value={content}
									onChange={handleEditorChange}
								/>
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
						<div className='flex flex-col justify-between h-full'>
							<MarkdownView
								className='page-scroll markdown-content'
								markdown={page.content}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default PageNote;
