import { useState, useContext } from 'react';
import { supabase } from '../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../Custom Hooks/useAlert';
import { DatabaseContext } from '../context/DatabaseContext';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import { TbRefresh } from 'react-icons/tb';
import styled from 'styled-components';
import { openai } from '../API/gpt';
import Loader from '../Components/Loader';
import MarkdownView from 'react-showdown';

const SideBarAssistant = () => {
	const { currentPages, currentJob, fetchCurrentPages } =
		useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const { user } = useAuth0();
	const [isLoading, setIsLoading] = useState(false);

	const [show, setShow] = useState(false);
	const [generatedAttempt, setGeneratedAttempt] = useState(false);

	const [response, setResponse] = useState([]);
	const { userProfile } = useContext(DatabaseContext);
	const [promptNewPage, setPromptNewPage] = useState('');

	const [selectedNewPage, setSelectedNewPage] = useState('');
	const [selectedExistingPageContent, setSelectedExistingPageContent] =
		useState('');

	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		setGeneratedAttempt(false);
	};

	const handleGenerateClick = () => {
		setGeneratedAttempt(true);
		setIsLoading(true);
		handleResponse();
	};

	// const handleSubmit = (event) => {
	//     event.preventDefault();
	//     event.stopPropagation();
	//     const form = event.currentTarget;
	//     if (form.checkValidity() === true) {
	//         setValidated(false);
	//         handleAddPageClick();
	//     } else {
	//         setValidated(true);
	//     }
	// };

	const handleAddPageClick = async () => {
		if (currentJob) {
			await supabase.from('jobs').select().eq('id', currentJob.id);
			const { error } = await supabase.from('pages').insert({
				account: user.email,
				title: selectedNewPage,
				content: response,
				jobid: currentJob.id,
				position: currentPages.length,
			});
			fetchCurrentPages(currentJob);
			handleClose();
			setAlert('Page successfully added!', 'success');
			if (error) {
				setAlert('There was an error adding the page.', 'error');
				console.log(error);
				return;
			}
		}
		setGeneratedAttempt(false);
		setShow(false);
	};

	const handleNewPageSelect = (event) => {
		setSelectedNewPage(event.target.value);
		if (event.target.value === 'Resume') {
			setPromptNewPage(
				`I want you to create a resume for me using the following content: 
                ${selectedExistingPageContent}. 
                Use this resume template:
                <h1><span style="font-size: 32px;">Name</span></h1><p><strong style="font-size: 16px;">Position</strong></p><p><br></p><p><span style="font-size: 14px;">Email:</span></p><p><span style="font-size: 14px;">LinkedIn:</span></p><p><span style="font-size: 14px;">Phone:</span></p><p><br></p><h2><span style="font-size: 20px;">Professional Summary</span></h2><p><em style="font-size: 14px;">2-4 sentences that summarize your qualifications for the role.</em></p><p><br></p><h2><span style="font-size: 20px;">Work History</span></h2><p><br></p><p><strong style="font-size: 14px;">Role, Company (Start date-End date)</strong></p><ul><li><span style="font-size: 14px;">Achievement 1</span></li><li><span style="font-size: 14px;">Achievement 2</span></li><li><span style="font-size: 14px;">Achievement 3</span></li></ul><p><strong style="font-size: 14px;">Role, Company (Start date-End date)</strong></p><ul><li><span style="font-size: 14px;">Achievement 1</span></li><li><span style="font-size: 14px;">Achievement 2</span></li><li><span style="font-size: 14px;">Achievement 3</span></li></ul><p><strong style="font-size: 14px;">Role, Company (Start date-End date)</strong></p><ul><li><span style="font-size: 14px;">Achievement 1</span></li><li><span style="font-size: 14px;">Achievement 2</span></li><li><span style="font-size: 14px;">Achievement 3</span></li></ul><p><br></p><h2><strong style="font-size: 20px;">Education</strong></h2><p><span style="font-size: 14px;">Degree, University Name (Start date-End date)</span></p><p><br></p><h2><strong style="font-size: 20px;">Skills</strong></h2><p><em style="font-size: 14px;">List of hard &amp; soft skills relevant to the position.</em></p>
                `
			);
		}
		if (event.target.value === 'Cover letter') {
			setPromptNewPage('create a cover letter');
		}
		if (event.target.value === 'Interview questions you may be asked') {
			setPromptNewPage(
				'craft 10 interview questions that I may be asked by the interviewer'
			);
		}
		if (event.target.value === 'Interview questions you can ask') {
			setPromptNewPage(
				'craft 10 interview questions that I should say in the interview'
			);
		}
	};
	// console.log('promptNewPage', promptNewPage);
	// console.log('selectedNewPage', selectedNewPage);

	const handleExistingPageSelect = async (event) => {
		const { data } = await supabase
			.from('pages')
			.select('*')
			.filter('jobid', 'eq', currentJob.id)
			.filter('title', 'eq', event.target.value)
			.single();
		if (data) {
			// console.log('selected page is', data);
			const text = data.content;
			const regex = /(<([^>]+)>)/gi;
			const result = text.replace(regex, '');
			setSelectedExistingPageContent(result);
		}
	};
	// console.log('selected page content is', selectedExistingPageContent);

	const handleResponse = async () => {
		const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
		XMLHttpRequest.prototype.setRequestHeader = function newSetRequestHeader(
			key,
			val
		) {
			if (key.toLocaleLowerCase() === 'user-agent') {
				return;
			}
			setRequestHeader.apply(this, [key, val]);
		};

		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: `You are a career coach named "Foli" that helps people land their dream job. Format all responses in HTML & do not use headers bigger than <h4>. Do not send intro and outro text to me, only the content I ask for. Company: ${currentJob.company} 
                Job Position: ${currentJob.position}
                ${promptNewPage}`,
				},
			],
		});
		setResponse(completion.data.choices[0].message.content);
		setIsLoading(false);
	};

	return (
		<>
			<Button variant='outline-secondary' onClick={handleShow}>
				Open assistant
			</Button>

			<Offcanvas
				show={show}
				onHide={handleClose}
				backdrop='false'
				placement='end'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<div>Assistant</div>
						<p style={{ margin: '0' }}>Powered by Chat GPT</p>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Wrapper>
						{isLoading ? (
							<div className='loading-state'>
								<h6>
									Processing a lot of text. Responses can take up to 30 seconds
									in some cases.
								</h6>
								<Loader />
							</div>
						) : (
							<div className='assistant-container'>
								{!generatedAttempt ? (
									<div className='empty-state-container'>
										<h4>Use AI to create a new page from existing pages</h4>
										<br />
										<p>For example:</p>
										<ol>
											<li>
												Create a <b>resume</b> or <b>cover letter</b> from a{' '}
												<b>job description</b>.
											</li>
											<li>
												Create <b>interview questions</b> you can ask the hiring
												manager from a <b>job description</b>.
											</li>
										</ol>
									</div>
								) : (
									<div className='response-container'>
										<MarkdownView
											markdown={response}
											options={{ tables: true, emoji: true }}
										/>
									</div>
								)}
								<Form id='assistantForm'>
									{/* Title */}
									<Form.Group className='mb-3' controlId='assistant'>
										<Form.Label>Create new page *</Form.Label>
										<Form.Select
											value={selectedNewPage}
											onChange={handleNewPageSelect}
											aria-label='Default select example'>
											<option value=''>Choose an option</option>
											<option value='Resume'>Resume</option>
											<option value='Cover letter'>Cover letter</option>
											<option value='Interview questions you may be asked'>
												Interview questions you may be asked
											</option>
											<option value='Interview questions you can ask'>
												Interview questions you can ask
											</option>
										</Form.Select>
									</Form.Group>
									{/* Content */}
									<Form.Group className='mb-3' controlId='content'>
										<Form.Label>From existing page *</Form.Label>
										<Form.Select
											aria-label='Default select example'
											onChange={handleExistingPageSelect}>
											<option value=''>Choose an existing page</option>
											{currentPages.map((page) => (
												<option key={page.title} value={page.title}>
													{page.title}
												</option>
											))}
										</Form.Select>
									</Form.Group>
									<div className='assistant-footer-btns'>
										{!generatedAttempt ? (
											<Button variant='primary' onClick={handleGenerateClick}>
												Generate
											</Button>
										) : (
											<>
												<Button
													variant='outline-secondary'
													onClick={handleGenerateClick}>
													<TbRefresh /> Generate again
												</Button>
												<Button variant='primary' onClick={handleAddPageClick}>
													Create page
												</Button>
											</>
										)}
									</div>
								</Form>
							</div>
						)}
					</Wrapper>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default SideBarAssistant;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;

	b {
		color: var(--primary-400);
	}

	.loading-state {
		padding: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.assistant-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
		/* align-items: center; */
	}

	.response-container {
		overflow-y: auto;
		margin-bottom: 2rem;
		border: 1px solid var(--grey-400);
		border-radius: 0.5rem;
		padding: 0.75rem;
	}

	.empty-state-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: auto;
		padding: 0.75rem;
	}

	.assistant-footer-btns {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		padding: 1rem 0 0 0;
	}
`;
