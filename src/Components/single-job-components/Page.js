import { useState, useContext, useRef, useEffect } from 'react';
import { Button, Form, Dropdown, Stack } from 'react-bootstrap';
import { DatabaseContext } from '../../context/DatabaseContext';
import styled from 'styled-components';
import MarkdownView from 'react-showdown';
import useAlert from '../../Custom Hooks/useAlert';
import ReactQuillEditor from '../atom-components/ReactQuillEditor';
import ModalDeleteConfirmation from '../modal-components/ModalDeleteConfirmation';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import ModalEditPage from '../modal-components/ModalEditPage';
import { supabase } from '../../API/supabase';
import { Resizable } from 're-resizable';

const Page = (page) => {
	// Context Variables
	const { fetchCurrentPages, currentJob, settingPageStack } =
		useContext(DatabaseContext);
	const { setAlert } = useAlert();

	// Modals

	// Modal Variables
	const [selectedEventKey, setSelectedEventKey] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditPageModal, setShowEditPageModal] = useState(false);

	const handleSelect = (eventKey) => {
		setSelectedEventKey(eventKey);
		if (eventKey === '1') {
			setShowDeleteModal(true);
			console.log('handleSelect called');
		}
	};

	const handleOpenPageModalClick = () => {
		setShowEditPageModal(true);
	};

	const handleCloseReset = () => {
		// Will close any modal opened by the dropdown
		console.log('handleCloseReset called');
		setShowDeleteModal(false);
	};

	// PAGE FUNCTIONS
	const initialVisibleValue = page.visible;
	// Check width on load and render mobile or desktop pages
	const isMobile = window.matchMedia('(max-width: 768px)').matches;

	// Resizing
	const [pageWidth, setPageWidth] = useState(page.width);
	const handleUpdateWidthClick = async (newPageWidth) => {
		console.log(newPageWidth);

		setPageWidth(newPageWidth);
		const { error } = await supabase
			.from('pages')
			.update({
				width: newPageWidth,
			})
			.eq('id', page.id);
		setAlert('Page successfully added!', 'success');

		if (error) {
			setAlert('Something went wrong. Page width not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	// EDITING PAGE FUNCTIONS
	const [editing, setEditing] = useState(false);
	const handleEditClick = () => {
		setEditing(true);
	};

	const handleCancelClick = () => {
		setContent(page.content);
		setEditing(false);
		setShowEditPageModal(false);
	};

	const closeEditorWarning = (event) => {
		if (editing) {
			event.preventDefault();
			event.returnValue = '';
		}
	};

	// ATTEMPTING TO PREVENT USER FROM LEAVING IF EDITING IS TRUE
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

	// React Quill Editor Variables & Functions
	const [content, setContent] = useState(page.content);

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
			setAlert('Page successfully updated!', 'success');
			fetchCurrentPages(currentJob);
			setEditing(false);
			setShowEditPageModal(false);
			if (error) {
				setAlert('Something went wrong. Page not updated.', 'danger');
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
			setAlert('Page successfully updated!', 'success');
			fetchCurrentPages(currentJob);
			setEditing(false);
			setShowEditPageModal(false);
			if (error) {
				setAlert('Something went wrong. Page not updated.', 'danger');
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
	if (isMobile === true && initialVisibleValue === true) {
		return (
			<Wrapper>
				<div className='page-content pages-mobile'>
					<header className='page-title'>
						{/* {!editing ? ( */}
						<Stack direction='horizontal'>
							<h6 style={{ color: 'var(--primary-700)' }}>{page.title}</h6>
							<Stack direction='horizontal' className='ms-auto'>
								<Button
									variant='light'
									style={{
										background: 'var(--white)',
										border: 0,
									}}
									onClick={handleOpenPageModalClick}>
									<AiFillEdit />
								</Button>
								{page.locked ? (
									''
								) : (
									<Dropdown onSelect={handleSelect}>
										<Dropdown.Toggle
											id='dropdown'
											variant='link'
											style={{
												color: 'var(--grey-800)',
											}}>
											<FiMoreVertical />
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item eventKey='1'>Delete page</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								)}
							</Stack>
							{showEditPageModal && (
								<ModalEditPage
									showEditPageModal={showEditPageModal}
									handleCancelClick={handleCancelClick}
									page={page}
									content={content}
									setContent={setContent}
									initialTitleValue={initialTitleValue}
									titleRef={titleRef}
									titleMaxChar={titleMaxChar}
									handleTitleChange={handleTitleChange}
									characterCount={characterCount}
									handleUpdateContentClick={handleUpdateContentClick}
									handleEditorChange={handleEditorChange}
								/>
							)}
							{showDeleteModal && (
								<ModalDeleteConfirmation
									show={showDeleteModal}
									close={handleCloseReset}
									object={page}
									type='page'
								/>
							)}
						</Stack>
					</header>
					<hr />
					{!editing ? (
						<MarkdownView
							className='page-scroll markdown-content'
							markdown={page.content}
						/>
					) : (
						<Form className='page-scroll'>
							<Form.Group controlId='content'>
								<ReactQuillEditor
									value={content}
									onChange={handleEditorChange}
								/>
							</Form.Group>
						</Form>
					)}
				</div>
			</Wrapper>
		);
	}

	// DESKTOP PAGE
	if (isMobile === false) {
		return (
			<Wrapper>
				<Resizable
					className={`${
						editing ? 'editing-content' : 'page-content'
					} shadow-on`}
					enable={{
						top: false,
						right: settingPageStack === 'horizontal' ? true : false,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					}}
					{...(settingPageStack === 'horizontal'
						? {
								onResizeStop: (e, direction, ref, d) => {
									const newPageWidth = pageWidth + d.width;
									handleUpdateWidthClick(newPageWidth);
								},
								minWidth: '300px',
								maxWidth: '700px',
								size: { height: '100%', width: pageWidth },
						  }
						: {
								// minWidth: '400',
								// maxWidth: '600',
								size: { height: '100%', width: '650' },
						  })}>
					<header className='page-title'>
						{!editing ? (
							<Stack direction='horizontal'>
								<h6>{page.title}</h6>
								<Stack direction='horizontal' className='ms-auto'>
									<Dropdown className='fade-in' onSelect={handleSelect}>
										<Button
											variant='light'
											style={{
												background: 'var(--white)',
												border: 0,
											}}
											onClick={handleEditClick}>
											<AiFillEdit />
										</Button>
										{page.locked ? (
											''
										) : (
											<Dropdown.Toggle
												id='dropdown'
												variant='link'
												style={{
													color: 'var(--grey-800)',
												}}>
												<FiMoreVertical />
											</Dropdown.Toggle>
										)}
										<Dropdown.Menu>
											<Dropdown.Item eventKey='1'>Delete page</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Stack>
								{showDeleteModal && (
									<ModalDeleteConfirmation
										show={showDeleteModal}
										close={handleCloseReset}
										object={page}
										type='page'
									/>
								)}
							</Stack>
						) : (
							<div>
								<Stack direction='horizontal' gap='1'>
									{page.locked ? (
										<h6>{page.title}</h6>
									) : (
										<>
											<Form className='title-form'>
												<Form.Group className='title-field' controlId='title'>
													<Form.Control
														type='text'
														required
														autoFocus
														ref={titleRef}
														defaultValue={initialTitleValue}
														placeholder='Add page title'
														size='md'
														maxLength={titleMaxChar}
														onChange={handleTitleChange}
													/>
												</Form.Group>
											</Form>
											<div className='character-count'>
												{characterCount}/{titleMaxChar}
											</div>{' '}
										</>
									)}
									<Button
										variant='light'
										style={{
											background: 'var(--white)',
											border: 0,
										}}
										className='ms-auto'
										onClick={handleCancelClick}>
										<AiOutlineClose />
									</Button>
								</Stack>
							</div>
						)}
					</header>
					<hr />

					{!editing ? (
						<MarkdownView
							className='page-scroll markdown-content'
							markdown={page.content}
						/>
					) : (
						<>
							<Form className='page-scroll'>
								<Form.Group controlId='content'>
									<ReactQuillEditor
										value={content}
										onChange={handleEditorChange}
									/>
								</Form.Group>
							</Form>
							<div className='page-footer'>
								<Button
									variant='primary'
									onClick={handleUpdateContentClick}
									// className="ms-auto"
								>
									Save
								</Button>
							</div>
						</>
					)}
				</Resizable>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	height: 100%;
	.page-title {
		padding: 1rem 1rem 0.5rem 1rem;
	}

	.page-title h6 {
		margin-bottom: 0rem;
		font-weight: 800;
		margin: 0 1rem;
	}

	hr {
		margin: 0 1.5rem;
	}

	.editing-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background: var(--white);
		border: 2px solid var(--primary-200);
		border-radius: 0.5rem;
	}

	.page-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background: var(--white);
	}

	.character-count {
		font-style: italic;
		font-size: small;
	}

	.page-scroll {
		overflow-y: auto;
		width: 98%;
		height: 100%;
	}

	.page-footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		padding: 1rem;
	}

	.form-control {
		font-weight: 700;
		border: 0 0 1px 0;
	}

	.markdown-content {
		* {
			color: var(--secondaryTextColor);
		}

		a {
			color: var(--primary-400);
		}

		padding: 1rem 2rem;
		h1 {
			font-size: 1.8rem;
		}

		h2 {
			font-size: 1.25rem;
		}

		h3 {
			font-size: 1rem;
		}

		h4 {
			font-size: 1rem;
		}

		h5 {
			font-size: 1rem;
		}
		p {
			margin-bottom: 0;
		}

		ul li {
			padding-bottom: 1rem !important;

			list-style-type: circle !important;
		}
	}

	// React Quill Customization for page Component only!

	.ql-container {
		border: none !important;
		padding: 0rem 1rem;
	}

	.ql-toolbar {
		border: none !important;
		padding: 1rem 1rem;
	}

	.fade-up {
		opacity: 0;
		transition: opacity 0.3s ease, transform 0.3s ease;
		transform: translateY(10px);
	}

	:hover .fade-up {
		opacity: 1;
		transform: translateY(0);
	}

	:hover .fade-in {
		opacity: 1;
	}

	.shadow-on {
		box-shadow: var(--shadow-1);
		transition: box-shadow 1s ease;
	}

	:hover .shadow-on {
		box-shadow: 0px 5px 10px var(--grey-500);
	}

	.pages-mobile {
		width: 90vw;
		max-width: 500px;
	}
`;

export default Page;
