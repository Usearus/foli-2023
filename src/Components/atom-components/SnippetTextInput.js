import { useState, useRef, useContext } from 'react';
import useAlert from '../../Custom Hooks/useAlert';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import { supabase } from '../../API/supabase';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { DatabaseContext } from '../../context/DatabaseContext';
import ModalDeleteConfirmation from '../modal-components/ModalDeleteConfirmation';

const SnippetTextInput = ({
	label,
	value,
	database,
	valueSource,
	fetchSource,
	textArea,
	type,
	placeholder,
	deleteIcon,
}) => {
	const { setAlert } = useAlert();

	const { currentJob } = useContext(DatabaseContext);

	const [editing, setEditing] = useState(false);
	const valueRef = useRef();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const initialValues = {
		value: valueSource?.[value] || '',
	};

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleCancelClick = () => {
		valueRef.current.value = initialValues.value;
		setEditing(false);
	};

	const handleSaveClick = async () => {
		const { error } = await supabase
			.from(database)
			.update({
				[value]: valueRef.current.value,
			})
			.eq('id', valueSource.id);
		if (valueSource === currentJob) {
			fetchSource(currentJob);
		} else {
			fetchSource();
		}

		setAlert('Successfully updated!', 'success');
		setEditing(false);

		if (error) {
			setAlert('Something went wrong. Not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	const handleDeleteClick = async (e) => {
		setShowDeleteModal(true);
	};

	const handleCopyClick = () => {
		navigator.clipboard
			.writeText(valueRef.current.value)
			.then(() => {
				setAlert('Snippet copied to clickboard', 'success');
			})
			.catch(() => {
				setAlert('Failed to copy Snippet to clipboard', 'warning');
			});
	};

	const handleCloseReset = () => {
		setShowDeleteModal(false);
	};

	if ([valueSource]) {
		return (
			<Wrapper>
				{!editing ? (
					<div className='view-container'>
						{label ? <Form.Label>{label}</Form.Label> : ''}
						<div className='button-group-container'>
							{/* COPY */}
							<OverlayTrigger
								key='copy-snippet'
								placement='left'
								delay={{ show: 750, hide: 0 }}
								overlay={<Tooltip id='copy'>Copy to clipboard</Tooltip>}>
								{textArea ? (
									<Form.Control
										as='textarea'
										rows={3}
										type={type}
										ref={valueRef}
										value={initialValues.value}
										readOnly
										onClick={handleCopyClick}
										placeholder={placeholder}
									/>
								) : (
									<Form.Control
										type={type}
										ref={valueRef}
										value={initialValues.value}
										readOnly
										onClick={handleCopyClick}
										placeholder={placeholder}
									/>
								)}
							</OverlayTrigger>

							{/* DELETE */}
							{!deleteIcon ? null : (
								<OverlayTrigger
									key='delete-snippet'
									placement='left'
									delay={{ show: 750, hide: 0 }}
									overlay={<Tooltip id='copy'>Delete Snippet</Tooltip>}>
									<Button
										size='sm'
										variant='outline-secondary'
										onClick={handleDeleteClick}
										style={{ borderColor: 'var(--white)', height: '32px' }}>
										<MdDelete />
									</Button>
								</OverlayTrigger>
							)}
							{/* EDIT */}
							<OverlayTrigger
								key='edit-snippet'
								placement='top'
								delay={{ show: 750, hide: 0 }}
								overlay={<Tooltip id='copy'>Edit Snippet</Tooltip>}>
								<Button
									size='sm'
									variant='outline-secondary'
									onClick={handleEditClick}
									style={{ borderColor: 'var(--white)', height: '32px' }}>
									<AiFillEdit />
								</Button>
							</OverlayTrigger>
						</div>
					</div>
				) : (
					<div className='edit-container'>
						{/* VALUE 1 */}
						<Form.Label>{label}</Form.Label>
						<Form.Group className='mb-2' controlId={value}>
							{textArea ? (
								<Form.Control
									as='textarea'
									rows={3}
									type={type}
									ref={valueRef}
									defaultValue={initialValues.value}
									size='sm'
									placeholder={placeholder}
								/>
							) : (
								<Form.Control
									type={type}
									ref={valueRef}
									defaultValue={initialValues.value}
									size='sm'
									placeholder={placeholder}
								/>
							)}
						</Form.Group>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: '.5rem',
							}}>
							<Button
								variant='outline-secondary'
								size='sm'
								onClick={handleCancelClick}>
								Cancel
							</Button>
							<Button variant='primary' size='sm' onClick={handleSaveClick}>
								Save
							</Button>
						</div>
					</div>
				)}
				{showDeleteModal && (
					<ModalDeleteConfirmation
						show={showDeleteModal}
						close={handleCloseReset}
						object={valueSource}
						type='snippet'
					/>
				)}
			</Wrapper>
		);
	}
};

export default SnippetTextInput;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* min-width: 500px; */

	.view-container .form-control {
		/* background: var(--grey-50); */
		cursor: pointer;
		transition: var(--transition-2);
		border-color: var(--white);
		font-size: 14px;
		padding-left: 0.55rem;
	}

	.view-container {
		display: flex;
		flex-direction: column;
		padding: 0.3rem 0;
	}

	.button-group-container {
		display: flex;
		flex-direction: row;
	}

	.view-container .form-control:hover {
		background: var(--grey-600);
		color: var(--grey-100);
		cursor: pointer;
		border-color: var(--grey-600);
	}

	.form-control:focus {
		box-shadow: none;
	}

	.button:hover {
		color: var(--grey-500);
		background: var(--grey-600);
	}
`;
