import { useState, useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { Button, Offcanvas, Accordion } from 'react-bootstrap';
import SnippetTextInput from '../atom-components/SnippetTextInput';
import styled from 'styled-components';

const SideBarSnippets = () => {
	const {
		userResume,
		fetchUserResume,
		fetchUserProfile,
		userProfile,
		currentJob,
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
						{/* <p style={{ paddingBottom: '1rem' }}>
							Quickly copy & paste anything from your profile
						</p> */}
						<label>Job listing</label>
						<Accordion flush alwaysOpen>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Details</Accordion.Header>
							</Accordion.Item>
							<Accordion.Item eventKey='1'>
								<Accordion.Header>Contacts</Accordion.Header>
							</Accordion.Item>
							<br />
						</Accordion>
						<label>Resume</label>
						<Accordion flush alwaysOpen>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Contact</Accordion.Header>
								<Accordion.Body>
									<SnippetTextInput
										label1='First name'
										value1='firstName'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
									/>
									<SnippetTextInput
										label1='Last name'
										value1='lastName'
										database='resumes'
										valueSource={userResume}
										fetchSource={fetchUserResume}
									/>
									{/* <SnippetTextInput
										label1='Target position'
										value1='position'
										database='profiles'
										valueSource={userProfile}
										fetchSource={fetchUserProfile}
									/> */}
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey='1'>
								<Accordion.Header>Professional Summary</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>

							<Accordion.Item eventKey='2'>
								<Accordion.Header>Work history</Accordion.Header>
								<Accordion.Body>
									<SnippetTextInput
										label1='Coming soon'
										// value1='firstName'
										// database='resumes'
										// valueSource={userResume}
										// fetchSource={fetchUserResume}
									/>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey='3'>
								<Accordion.Header>Education</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey='4'>
								<Accordion.Header>Skills</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<br />
						<label>Custom</label>
						<Accordion flush alwaysOpen>
							<Accordion.Item eventKey='4'>
								<Accordion.Header>Create custom Snippet</Accordion.Header>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
						</Accordion>
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
		font-weight: 700;
	}
`;
