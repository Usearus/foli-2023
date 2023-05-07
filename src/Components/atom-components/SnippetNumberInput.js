import { useState, useRef } from 'react';
import useAlert from '../../Custom Hooks/useAlert';
import {
	Form,
	Button,
	InputGroup,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { supabase } from '../../API/supabase';
import { AiFillEdit } from 'react-icons/ai';

const SnippetNumberInput = ({
	label1,
	value1,
	database,
	valueSource,
	fetchSource,
}) => {
	const { setAlert } = useAlert();

	const [editing, setEditing] = useState(false);
	const value1Ref = useRef();
	const initialValues = {
		value1: valueSource && valueSource[value1] ? valueSource[value1] : '',
	};

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleCancelClick = () => {
		value1Ref.current.value = initialValues.value1;
		setEditing(false);
	};

	const handleSaveClick = async () => {
		const { error } = await supabase
			.from(database)
			.update({
				[value1]: value1Ref.current.value * 1,
			})
			.eq('id', valueSource.id);
		fetchSource();
		setAlert('Successfully updated!', 'success');
		setEditing(false);

		if (error) {
			setAlert('Something went wrong. Not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	const handleCopyClick = () => {
		navigator.clipboard
			.writeText(value1Ref.current.value)
			.then(() => {
				setAlert('Snippet copied to clickboard', 'success');
			})
			.catch(() => {
				setAlert('Failed to copy Snippet to clipboard', 'warning');
			});
	};

	if ([valueSource]) {
		return (
			<Wrapper>
				{!editing ? (
					<div className='view-container'>
						<Form.Label>{label1}</Form.Label>
						<InputGroup size='sm' className='mb-2'>
							{/* VALUE 1 */}
							<OverlayTrigger
								key='copy-snippet'
								placement='top'
								// delay={{ show: 250, hide: 0 }}
								overlay={<Tooltip id='copy'>Copy to clipboard</Tooltip>}>
								<Form.Control
									type='number'
									ref={value1Ref}
									value={initialValues.value1 * 1}
									readOnly
									onClick={handleCopyClick}
								/>
							</OverlayTrigger>
							<OverlayTrigger
								key='edit-snippet'
								placement='top'
								// delay={{ show: 250, hide: 0 }}
								overlay={<Tooltip id='copy'>Edit Snippet</Tooltip>}>
								<Button variant='outline-secondary' onClick={handleEditClick}>
									<AiFillEdit />
								</Button>
							</OverlayTrigger>
						</InputGroup>
					</div>
				) : (
					<div className='edit-container'>
						{/* VALUE 1 */}
						<Form.Label>{label1}</Form.Label>
						<Form.Group className='mb-2' controlId={value1}>
							<Form.Control
								type='number'
								ref={value1Ref}
								defaultValue={initialValues.value1}
								size='sm'
							/>
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
			</Wrapper>
		);
	}
};

export default SnippetNumberInput;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* min-width: 500px; */

	.view-container .form-control {
		/* background: var(--grey-100); */
		cursor: pointer;
		transition: var(--transition-2);
		/* border: none; */
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
`;
