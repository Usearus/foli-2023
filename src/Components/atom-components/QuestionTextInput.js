import { useRef } from 'react';
import useAlert from '../../Custom Hooks/useAlert';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const QuestionTextInput = ({
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

	const valueRef = useRef();

	const initialValues = {
		value: valueSource?.[value] || '',
	};

	const handleCopyClick = () => {
		navigator.clipboard
			.writeText(valueRef.current.value)
			.then(() => {
				setAlert('Copied', 'success');
			})
			.catch(() => {
				setAlert('Unable to copy', 'warning');
			});
	};

	if ([valueSource]) {
		return (
			<Wrapper>
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
					</div>
				</div>
			</Wrapper>
		);
	}
};

export default QuestionTextInput;

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
		background: var(--grey-200);
	}
`;
