import { useState, useRef, useContext } from 'react';
import useAlert from '../../Custom Hooks/useAlert';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { supabase } from '../../API/supabase';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useAuth0 } from '@auth0/auth0-react';

const AddSnippet = ({
	label,
	value,
	database,
	valueSource,
	fetchSource,
	textArea,
	type,
}) => {
	const { setAlert } = useAlert();
	const { user } = useAuth0();

	const { currentJob } = useContext(DatabaseContext);
	const [editing, setediting] = useState(false);
	const valueRef = useRef();

	const handleAddClick = () => {
		setediting(true);
	};

	const handleCancelClick = () => {
		setediting(false);
	};

	const handleSaveClick = async () => {
		const { error } = await supabase
			.from(database)
			.insert({
				account: user.email,
				[value]: valueRef.current.value,
				category: `${label}`,
			})
			.eq('id', valueSource.id);
		if (valueSource === currentJob) {
			fetchSource(currentJob);
		} else {
			fetchSource();
		}

		setAlert('Snippet updated', 'success');
		setediting(false);

		if (error) {
			setAlert('Unable to update snippet', 'danger');
			console.log('error is', error);
			return;
		}
	};

	if ([valueSource]) {
		return (
			<Wrapper>
				{!editing ? (
					<div className='view-container'>
						<Button variant='link' onClick={handleAddClick} size='sm'>
							Add {label}
						</Button>
					</div>
				) : (
					<div className='edit-container'>
						{/* VALUE 1 */}
						{textArea ? (
							<>
								<Form.Label>Add {label}</Form.Label>
								<Form.Control
									as='textarea'
									rows={3}
									type={type}
									ref={valueRef}
								/>
							</>
						) : (
							<Form.Control type={type} ref={valueRef} />
						)}
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: '.5rem',
								paddingTop: '.5rem',
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

export default AddSnippet;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 1rem;

	.form-control:focus {
		box-shadow: none;
	}
`;
