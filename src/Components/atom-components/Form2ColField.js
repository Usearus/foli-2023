import { useState, useRef } from 'react';
import useAlert from '../../Custom Hooks/useAlert';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { supabase } from '../../API/supabase';

const Form2ColField = ({
	label1,
	value1,
	label2,
	value2,
	database,
	valueSource,
	fetchSource,
}) => {
	const { setAlert } = useAlert();

	const [editing, setEditing] = useState(false);

	const value1Ref = useRef();
	const value2Ref = useRef();

	const initialValues = {
		value1: valueSource && valueSource[value1] ? valueSource[value1] : '',
		value2: valueSource && valueSource[value2] ? valueSource[value2] : '',
	};

	// console.log('initial value1', initialValues.value1);
	// console.log('initial value2', initialValues.value2);
	// console.log('valueSource is', valueSource);

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleCancelClick = () => {
		value1Ref.current.value = initialValues.value1;
		value2Ref.current.value = initialValues.value2;
		setEditing(false);
	};

	const handleSaveClick = async () => {
		const { error } = await supabase
			.from(database)
			.update({
				[value1]: value1Ref.current.value,
				[value2]: value2Ref.current.value,
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

	if ([valueSource]) {
		return (
			<Wrapper>
				{!editing ? (
					<div className='view-container'>
						<Form className='form-2-column'>
							{/* VALUE 1 */}
							<Form.Group className='mb-4 half-column' controlId={value1}>
								<Form.Label>{label1}</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									ref={value1Ref}
									defaultValue={initialValues.value1}
									plaintext
								/>
								{/* VALUE 2 */}
							</Form.Group>
							<Form.Group className='mb-4 half-column' controlId={value2}>
								<Form.Label>{label2}</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									ref={value2Ref}
									defaultValue={initialValues.value2}
									plaintext
								/>
							</Form.Group>
						</Form>
					</div>
				) : (
					<div className='edit-container'>
						<Form className='form-2-column'>
							{/* VALUE 1 */}
							<Form.Group className='mb-4 half-column' controlId={value1}>
								<Form.Label>{label1}</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									ref={value1Ref}
									defaultValue={initialValues.value1}
								/>
								{/* VALUE 2 */}
							</Form.Group>
							<Form.Group className='mb-4 half-column' controlId={value2}>
								<Form.Label>{label2}</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									ref={value2Ref}
									defaultValue={initialValues.value2}
								/>
							</Form.Group>
						</Form>
					</div>
				)}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '1rem',
					}}>
					{!editing ? (
						<Button variant='outline-secondary' onClick={handleEditClick}>
							Edit
						</Button>
					) : (
						<>
							<Button variant='outline-secondary' onClick={handleCancelClick}>
								Cancel
							</Button>
							<Button variant='primary' onClick={handleSaveClick}>
								Save
							</Button>
						</>
					)}
				</div>
			</Wrapper>
		);
	}
};

export default Form2ColField;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.component-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.view-container {
		display: flex;
		flex-direction: column;
		/* min-width: 500px; */
	}

	.edit-container {
		display: flex;
		flex-direction: column;
		/* min-width: 500px; */
	}

	.form-2-column {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.half-column {
		width: 50%;
	}
`;
