import { useState, useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { Button, Offcanvas, Accordion } from 'react-bootstrap';
import SnippetTextInput from '../atom-components/SnippetTextInput';
import styled from 'styled-components';

const SideBarSnippets = () => {
	const { userResume, fetchUserResume, fetchUserProfile, userProfile } =
		useContext(DatabaseContext);

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
	};

	return (
		<>
			<Button variant='outline-secondary' onClick={handleShow}>
				Snippets
			</Button>

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
						<Accordion flush alwaysOpen>
							<p style={{ paddingBottom: '1rem' }}>
								Quickly copy & paste anything from your profile
							</p>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Job Details</Accordion.Header>
							</Accordion.Item>
							<Accordion.Item eventKey='1'>
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
									<SnippetTextInput
										label1='Target position'
										value1='position'
										database='profiles'
										valueSource={userProfile}
										fetchSource={fetchUserProfile}
									/>
								</Accordion.Body>
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
`;
