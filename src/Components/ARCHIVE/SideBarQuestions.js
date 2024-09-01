// import { useState, useContext } from 'react';
// import { DatabaseContext } from '../../context/DatabaseContext';
// import { Button, Offcanvas, Accordion } from 'react-bootstrap';
// import QuestionTextInput from '../atom-components/QuestionTextInput';
// import styled from 'styled-components';
// import AddQuestion from './AddQuestion';

// const SideBarQuestions = () => {
// 	const { allQuestions, fetchAllQuestions, adminProfile } =
// 		useContext(DatabaseContext);

// 	const [show, setShow] = useState(false);
// 	const handleShow = () => setShow(true);
// 	const handleClose = () => {
// 		setShow(false);
// 	};

// 	return (
// 		<>
// 			<Button variant='outline-secondary' onClick={handleShow}>
// 				Questions
// 			</Button>

// 			<Offcanvas
// 				show={show}
// 				onHide={handleClose}
// 				placement='end'
// 				backdrop={false}
// 				scroll={true}>
// 				<Offcanvas.Header closeButton>
// 					<Offcanvas.Title>Questions</Offcanvas.Title>
// 				</Offcanvas.Header>
// 				<Offcanvas.Body>
// 					<Wrapper>
// 						{/* Candidate questions */}
// 						<div>
// 							<h6>
// 								<b>Candidate questions</b>
// 							</h6>
// 							<br />

// 							<label>Role specific</label>
// 							<Accordion flush alwaysOpen>
// 								<Accordion.Item eventKey='0'>
// 									<Accordion.Header>Product design</Accordion.Header>
// 									<Accordion.Body>
// 										{allQuestions
// 											.filter((q) => q.category === 'Product design')
// 											.sort((a, b) => a.question.localeCompare(b.question))
// 											.map((q) => (
// 												<>
// 													<hr />
// 													<QuestionTextInput
// 														key={q.id}
// 														value='question'
// 														database='questions'
// 														valueSource={q}
// 														fetchSource={fetchAllQuestions}
// 														type='text'
// 														textArea
// 													/>
// 												</>
// 											))}
// 									</Accordion.Body>
// 								</Accordion.Item>
// 							</Accordion>
// 							<br />

// 							<label>Interview specific</label>
// 							<Accordion flush alwaysOpen>
// 								<Accordion.Item eventKey='0'>
// 									<Accordion.Header>Initial screener</Accordion.Header>
// 									<Accordion.Body>
// 										{allQuestions
// 											.filter((q) => q.category === 'Initial screener')
// 											.sort((a, b) => a.question.localeCompare(b.question))
// 											.map((q) => (
// 												<>
// 													<hr />
// 													<QuestionTextInput
// 														key={q.id}
// 														value='question'
// 														database='questions'
// 														valueSource={q}
// 														fetchSource={fetchAllQuestions}
// 														type='text'
// 														textArea
// 													/>
// 												</>
// 											))}
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='1'>
// 									<Accordion.Header>Hiring manager</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Hiring manager')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='2'>
// 									<Accordion.Header>Group interview</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Group interview')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>
// 							</Accordion>
// 							<br />

// 							<label>General</label>
// 							<Accordion flush alwaysOpen>
// 								<Accordion.Item eventKey='0'>
// 									<Accordion.Header>Closing questions</Accordion.Header>
// 									<Accordion.Body>
// 										{allQuestions
// 											.filter((q) => q.category === 'Closing questions')
// 											.sort((a, b) => a.question.localeCompare(b.question))
// 											.map((q) => (
// 												<>
// 													<hr />
// 													<QuestionTextInput
// 														key={q.id}
// 														value='question'
// 														database='questions'
// 														valueSource={q}
// 														fetchSource={fetchAllQuestions}
// 														type='text'
// 														textArea
// 													/>
// 												</>
// 											))}
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='1'>
// 									<Accordion.Header>Company growth</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Company growth')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='2'>
// 									<Accordion.Header>Company culture</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Company culture')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='3'>
// 									<Accordion.Header>Diversity & inclusion</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Diversity & inclusion')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='4'>
// 									<Accordion.Header>Role expectations</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Role expectations')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>

// 								<Accordion.Item eventKey='5'>
// 									<Accordion.Header>Remote/hybrid teams</Accordion.Header>
// 									<Accordion.Body>
// 										<>
// 											{allQuestions
// 												.filter((q) => q.category === 'Remote/hybrid teams')
// 												.sort((a, b) => a.question.localeCompare(b.question))
// 												.map((q) => (
// 													<>
// 														<hr />
// 														<QuestionTextInput
// 															key={q.id}
// 															value='question'
// 															database='questions'
// 															valueSource={q}
// 															fetchSource={fetchAllQuestions}
// 															type='text'
// 															textArea
// 														/>
// 													</>
// 												))}
// 										</>
// 									</Accordion.Body>
// 								</Accordion.Item>
// 							</Accordion>
// 							<br />
// 							<br />
// 						</div>

// 						{/* Interviewer questions */}
// 						{adminProfile ? (
// 							<div>
// 								<h6>
// 									<b>Interviewer questions</b>
// 								</h6>
// 								<br />
// 								<label>Role Specific</label>
// 								<Accordion flush alwaysOpen>
// 									<Accordion.Item eventKey='0'>
// 										<Accordion.Header>Product design</Accordion.Header>
// 										<Accordion.Body>
// 											<>
// 												{allQuestions
// 													.filter((q) => q.category === '_Product design')
// 													.sort((a, b) => a.question.localeCompare(b.question))
// 													.map((q) => (
// 														<>
// 															<br />
// 															<div>
// 																{adminProfile ? (
// 																	<p
// 																		style={{
// 																			paddingTop: '1rem',
// 																			marginBottom: '0',
// 																			fontWeight: '600',
// 																		}}>
// 																		Question
// 																	</p>
// 																) : null}
// 																<QuestionTextInput
// 																	key={q.id}
// 																	value='question'
// 																	database='questions'
// 																	valueSource={q}
// 																	fetchSource={fetchAllQuestions}
// 																	type='text'
// 																	textArea
// 																/>
// 																{adminProfile ? (
// 																	<>
// 																		<p
// 																			style={{
// 																				// paddingTop: '1rem',
// 																				marginBottom: '0',
// 																				fontWeight: '600',
// 																			}}>
// 																			My response
// 																		</p>
// 																		<QuestionTextInput
// 																			key={q.id}
// 																			value='response'
// 																			database='questions'
// 																			valueSource={q}
// 																			fetchSource={fetchAllQuestions}
// 																			type='text'
// 																			textArea
// 																		/>
// 																	</>
// 																) : null}
// 															</div>
// 															<br />
// 															<hr />
// 														</>
// 													))}
// 											</>
// 										</Accordion.Body>
// 									</Accordion.Item>
// 								</Accordion>
// 								<br />

// 								<label>General</label>
// 								<Accordion flush alwaysOpen>
// 									<Accordion.Item eventKey='0'>
// 										<Accordion.Header>Behavioral questions</Accordion.Header>
// 										<Accordion.Body>
// 											<>
// 												{allQuestions
// 													.filter((q) => q.category === '_Behavioral questions')
// 													.sort((a, b) => a.question.localeCompare(b.question))
// 													.map((q) => (
// 														<>
// 															<br />
// 															<div>
// 																{adminProfile ? (
// 																	<p
// 																		style={{
// 																			paddingTop: '1rem',
// 																			marginBottom: '0',
// 																			fontWeight: '600',
// 																		}}>
// 																		Question
// 																	</p>
// 																) : null}
// 																<QuestionTextInput
// 																	key={q.id}
// 																	value='question'
// 																	database='questions'
// 																	valueSource={q}
// 																	fetchSource={fetchAllQuestions}
// 																	type='text'
// 																	textArea
// 																/>
// 																{adminProfile ? (
// 																	<>
// 																		<p
// 																			style={{
// 																				// paddingTop: '1rem',
// 																				marginBottom: '0',
// 																				fontWeight: '600',
// 																			}}>
// 																			My response
// 																		</p>
// 																		<QuestionTextInput
// 																			key={q.id}
// 																			value='response'
// 																			database='questions'
// 																			valueSource={q}
// 																			fetchSource={fetchAllQuestions}
// 																			type='text'
// 																			textArea
// 																		/>
// 																	</>
// 																) : null}
// 															</div>
// 															<br />
// 															<hr />
// 														</>
// 													))}
// 											</>
// 										</Accordion.Body>
// 									</Accordion.Item>
// 								</Accordion>

// 								<Accordion flush alwaysOpen>
// 									<Accordion.Item eventKey='1'>
// 										<Accordion.Header>Generic questions</Accordion.Header>
// 										<Accordion.Body>
// 											<>
// 												{allQuestions
// 													.filter((q) => q.category === '_Generic questions')
// 													.sort((a, b) => a.question.localeCompare(b.question))
// 													.map((q) => (
// 														<>
// 															<br />
// 															<div>
// 																{adminProfile ? (
// 																	<p
// 																		style={{
// 																			paddingTop: '1rem',
// 																			marginBottom: '0',
// 																			fontWeight: '600',
// 																		}}>
// 																		Question
// 																	</p>
// 																) : null}
// 																<QuestionTextInput
// 																	key={q.id}
// 																	value='question'
// 																	database='questions'
// 																	valueSource={q}
// 																	fetchSource={fetchAllQuestions}
// 																	type='text'
// 																	textArea
// 																/>
// 																{adminProfile ? (
// 																	<>
// 																		<p
// 																			style={{
// 																				// paddingTop: '1rem',
// 																				marginBottom: '0',
// 																				fontWeight: '600',
// 																			}}>
// 																			My response
// 																		</p>
// 																		<QuestionTextInput
// 																			key={q.id}
// 																			value='response'
// 																			database='questions'
// 																			valueSource={q}
// 																			fetchSource={fetchAllQuestions}
// 																			type='text'
// 																			textArea
// 																		/>
// 																	</>
// 																) : null}
// 															</div>
// 															<br />
// 															<hr />
// 														</>
// 													))}
// 											</>
// 										</Accordion.Body>
// 									</Accordion.Item>
// 								</Accordion>
// 								<br />
// 							</div>
// 						) : null}

// 						{/* Add question */}
// 						{adminProfile ? (
// 							<AddQuestion
// 								label='question'
// 								value='question'
// 								database='questions'
// 								valueSource={allQuestions}
// 								fetchSource={fetchAllQuestions}
// 								type='text'
// 							/>
// 						) : null}
// 					</Wrapper>
// 				</Offcanvas.Body>
// 			</Offcanvas>
// 		</>
// 	);
// };

// export default SideBarQuestions;

// const Wrapper = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: flex-start;
// 	height: 100%;

// 	label {
// 		margin: 0;
// 	}

// 	.accordion-body {
// 		padding-top: 0;
// 		padding-left: 0;
// 		padding-right: 0;
// 		padding-bottom: 16px;
// 		/* padding: 4px; */
// 	}

// 	hr {
// 		margin-top: 0px;
// 		margin-bottom: 4px;
// 		color: #b9b9b9;
// 	}
// `;
