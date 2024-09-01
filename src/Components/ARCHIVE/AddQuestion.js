// import { useState, useRef, useContext } from 'react';
// import useAlert from '../../Custom Hooks/useAlert';
// import { Form, Button } from 'react-bootstrap';
// import styled from 'styled-components';
// import { supabase } from '../../API/supabase';
// import { DatabaseContext } from '../../context/DatabaseContext';

// const AddQuestion = ({
// 	label,
// 	value,
// 	database,
// 	valueSource,
// 	fetchSource,
// 	textArea,
// 	type,
// }) => {
// 	const { setAlert } = useAlert();

// 	const {
// 		fetchAllQuestions,
// 		// allQuestions
// 	} = useContext(DatabaseContext);
// 	const [editing, setediting] = useState(false);

// 	const handleAddClick = () => {
// 		setediting(true);
// 	};

// 	const handleCancelClick = () => {
// 		setediting(false);
// 	};

// 	const categoryRef = useRef();
// 	const questionRef = useRef();

// 	const handleAddQuestionClick = async () => {
// 		const { error } = await supabase.from('questions').insert({
// 			category: categoryRef.current.value,
// 			question: questionRef.current.value,
// 		});
// 		fetchAllQuestions();
// 		setAlert('Question added', 'success');
// 		setediting(false);

// 		if (error) {
// 			setAlert('Unable to add question', 'error');
// 			console.log('error is', error);
// 			return;
// 		}
// 	};

// 	if ([valueSource]) {
// 		return (
// 			<Wrapper>
// 				{!editing ? (
// 					<div>
// 						<Button
// 							variant='outline-primary'
// 							onClick={handleAddClick}
// 							size='sm'>
// 							Add question
// 						</Button>
// 					</div>
// 				) : (
// 					<div>
// 						<div
// 							style={{
// 								display: 'flex',
// 								flexDirection: 'column',
// 								gap: '1rem',
// 							}}>
// 							<label>Add a question</label>
// 							<div>
// 								<Form.Label>Category</Form.Label>
// 								<Form.Control type={type} ref={categoryRef} />
// 							</div>
// 							<div>
// 								<Form.Label>Question</Form.Label>
// 								<Form.Control
// 									as='textarea'
// 									rows={3}
// 									type={type}
// 									ref={questionRef}
// 								/>
// 							</div>
// 						</div>

// 						<div
// 							style={{
// 								display: 'flex',
// 								justifyContent: 'flex-end',
// 								gap: '.5rem',
// 								paddingTop: '.5rem',
// 							}}>
// 							<Button
// 								variant='outline-secondary'
// 								size='sm'
// 								onClick={handleCancelClick}>
// 								Cancel
// 							</Button>
// 							<Button
// 								variant='primary'
// 								size='sm'
// 								onClick={handleAddQuestionClick}>
// 								Add question
// 							</Button>
// 						</div>
// 						{/* <div
// 							style={{
// 								display: 'flex',
// 								flexDirection: 'column',
// 								gap: '.5rem',
// 								paddingTop: '2rem',
// 							}}>
// 							<label>All current categories</label>
// 							{allQuestions
// 								.sort((a, b) => a.created_at.localeCompare(b.created_at))
// 								.map((q) => (
// 									<p
// 										style={{
// 											marginBottom: '0',
// 										}}>
// 										{q.category}
// 									</p>
// 								))}
// 						</div> */}
// 					</div>
// 				)}
// 			</Wrapper>
// 		);
// 	}
// };

// export default AddQuestion;

// const Wrapper = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	padding-bottom: 1rem;

// 	.form-control:focus {
// 		box-shadow: none;
// 	}
// `;
