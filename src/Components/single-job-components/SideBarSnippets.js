import { useState, useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { Button, Offcanvas, Accordion } from 'react-bootstrap';
import SnippetTextInput from '../atom-components/SnippetTextInput';
import styled from 'styled-components';
import AddSnippet from './AddSnippet';
const SideBarSnippets = () => {
	const {
		userResume,
		fetchUserResume,
		currentJob,
		fetchCurrentJob,
		userSnippets,
		fetchUserSnippets,
		adminProfile,
	} = useContext(DatabaseContext);

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
	};

	return (
		<>
			{adminProfile ? (
				<Button variant='outline-secondary' onClick={handleShow}>
					Snippets
				</Button>
			) : null}

			<Offcanvas
				show={show}
				onHide={handleClose}
				placement='end'
				backdrop={false}
				scroll={true}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Snippets</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Wrapper>
						{/* JOB DETAILS */}
						<label>Job listing</label>
						<Accordion flush alwaysOpen>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Details</Accordion.Header>
								<Accordion.Body>
									<SnippetTextInput
										label='Company'
										value='company'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='text'
									/>
									<SnippetTextInput
										label='Position'
										value='position'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='text'
									/>
									<SnippetTextInput
										label='Salary min ($)'
										value='salary_min'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='number'
										placeholder='0'
									/>
									<SnippetTextInput
										label='Salary Max ($)'
										value='salary_max'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='number'
										placeholder='0'
									/>
									<SnippetTextInput
										label='Location'
										value='location'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='text'
									/>
									<SnippetTextInput
										label='Listing URL'
										value='link'
										database='jobs'
										valueSource={currentJob}
										fetchSource={fetchCurrentJob}
										type='text'
									/>
								</Accordion.Body>
							</Accordion.Item>
							<br />
						</Accordion>
						<label>Resume</label>
						<Accordion flush alwaysOpen>
							{/* CONTACT */}
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Contact</Accordion.Header>
								<Accordion.Body>
									<SnippetTextInput
										label='First name'
										value='firstName'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='Last name'
										value='lastName'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='Email address'
										value='resumeEmail'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='Phone number'
										value='resumePhone'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='LinkedIn URL'
										value='resumeLinkedin'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='Address'
										value='resumeAddress'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
									<SnippetTextInput
										label='Website URL'
										value='resumeWebsite'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
										type='text'
									/>
								</Accordion.Body>
							</Accordion.Item>

							{/* PROFESSIONAL SUMMARY */}
							<Accordion.Item eventKey='1'>
								<Accordion.Header>Professional summary</Accordion.Header>
								<Accordion.Body>
									{userSnippets
										.filter((s) => s.category === 'professional summary')
										.sort((a, b) => a.created_at.localeCompare(b.created_at))
										.map((s) => (
											<SnippetTextInput
												key={s.id}
												value='content'
												database='snippets'
												valueSource={s}
												fetchSource={fetchUserSnippets}
												textArea
												deleteIcon
											/>
										))}
									<AddSnippet
										label='professional summary'
										value='content'
										database='snippets'
										valueSource={userSnippets}
										fetchSource={fetchUserSnippets}
										textArea
										// type='text'
									/>
								</Accordion.Body>
							</Accordion.Item>

							{/* WORK HISTORY */}
							{/* <Accordion.Item eventKey='2'>
								<Accordion.Header>Work history</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item> */}

							{/* Education */}
							{/* <Accordion.Item eventKey='3'>
								<Accordion.Header>Education</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item> */}

							{/* Skills */}
							<Accordion.Item eventKey='4'>
								<Accordion.Header>Skills</Accordion.Header>
								<Accordion.Body>
									{userSnippets
										.filter((snippet) => snippet.category === 'skill')
										.sort((a, b) => a.created_at.localeCompare(b.created_at))
										.map((snippet) => (
											<SnippetTextInput
												key={snippet.id}
												value='content'
												database='snippets'
												valueSource={snippet}
												fetchSource={fetchUserSnippets}
												type='text'
												deleteIcon
											/>
										))}
									<AddSnippet
										label='skill'
										value='content'
										database='snippets'
										valueSource={userSnippets}
										fetchSource={fetchUserSnippets}
										type='text'
									/>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<br />

						{/* CUSTOM */}
						{/* 						
						<label>Custom</label>
						<Accordion flush alwaysOpen>
							<Accordion.Item eventKey='4'>
								<Accordion.Header>Create custom Snippet</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
						</Accordion> */}
					</Wrapper>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default SideBarSnippets;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;

	label {
		margin: 0;
	}
`;
