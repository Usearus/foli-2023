// import { useContext } from 'react';
// import { Offcanvas } from 'react-bootstrap';
// import { DatabaseContext } from '../../../context/DatabaseContext';
// import { Button } from 'react-bootstrap';
// import { supabase } from '../../../API/supabase';
// import { useAuth0 } from '@auth0/auth0-react';
// import useAlert from '../../../Custom Hooks/useAlert';
// import styled from 'styled-components';
// import AccordianTemplates from './AccordianTemplates';
// import MarkdownView from 'react-showdown';

// const SideBarTemplates = ({ show, close }) => {
// 	const { user } = useAuth0();
// 	const { setAlert } = useAlert();

// 	const {
// 		previewTemplate, // KEEP
// 		activeTemplate, // KEEP
// 		setActiveTemplate, // KEEP
// 		setPreviewTemplate, // KEEP
// 		currentJob, // KEEP
// 		fetchCurrentPages, // KEEP
// 		currentPages, // KEEP
// 	} = useContext(DatabaseContext);

// 	const addPage = async () => {
// 		await supabase.from('pages').select().eq('id', currentJob.id);
// 		const { error } = await supabase.from('pages').insert({
// 			account: user.email,
// 			title: activeTemplate.title,
// 			content: activeTemplate.content,
// 			jobid: currentJob.id,
// 			position: currentPages.length,
// 		});
// 		// console.log(data, 'template added');
// 		fetchCurrentPages(currentJob);
// 		setAlert('Page successfully added!', 'success');
// 		if (error) {
// 			setAlert('There was an error adding the template.', 'error');
// 			console.log(error);
// 			return;
// 		}
// 	};

// 	const handleCloseActive = () => {
// 		setActiveTemplate(null); // Keeping
// 		setPreviewTemplate(false); // Keeping
// 	};

// 	const handleAddPageClick = () => {
// 		addPage();
// 		setActiveTemplate(null);
// 		setPreviewTemplate(false);
// 		close();
// 	};

// 	return (
// 		<Offcanvas
// 			show={show}
// 			onHide={close}
// 			placement='end'
// 			backdrop={false}
// 			scroll={true}>
// 			<Offcanvas.Header closeButton>
// 				<Offcanvas.Title>Templates</Offcanvas.Title>
// 			</Offcanvas.Header>
// 			<Offcanvas.Body>
// 				<Wrapper>
// 					{!previewTemplate ? (
// 						<AccordianTemplates />
// 					) : (
// 						<div className='page-body'>
// 							<header className='page-title'>
// 								<h6>{activeTemplate.title}</h6>
// 								<hr />
// 							</header>
// 							<MarkdownView
// 								className='page-content markdown-content'
// 								markdown={activeTemplate.content}
// 							/>
// 							<div className='page-footer' style={{}}>
// 								<Button variant='outline-secondary' onClick={handleCloseActive}>
// 									Back to templates
// 								</Button>
// 								<Button variant='primary' onClick={handleAddPageClick}>
// 									Add page
// 								</Button>
// 							</div>
// 						</div>
// 					)}
// 				</Wrapper>
// 			</Offcanvas.Body>
// 		</Offcanvas>
// 	);
// };

// export default SideBarTemplates;
// const Wrapper = styled.div`
// 	height: 90%;

// 	/* Footer element */
// 	.page-footer {
// 		display: flex;
// 		justify-content: flex-end;
// 		gap: 1rem;
// 	}

// 	/* Accordion element */
// 	.accordion-body {
// 		padding: 1rem 0;
// 		padding-bottom: 2rem;
// 	}

// 	/* Preview Page element */
// 	.page-body {
// 		height: 100%;
// 	}

// 	.page-title h6 {
// 		margin-bottom: 0rem;
// 		font-weight: 600;
// 		margin: 0 1rem;
// 		padding: 0.85rem 0;
// 	}

// 	.page-content {
// 		overflow-x: scroll;
// 		height: 100%;
// 	}

// 	hr {
// 		margin: 0;
// 	}

// 	.markdown-content {
// 		padding: 1rem;
// 		h1 {
// 			font-size: 1.8rem;
// 		}

// 		h2 {
// 			font-size: 1.25rem;
// 		}

// 		h3 {
// 			font-size: 1rem;
// 		}

// 		h4 {
// 			font-size: 1rem;
// 		}

// 		h5 {
// 			font-size: 1rem;
// 		}
// 		p {
// 			margin-bottom: 0;
// 		}

// 		ul {
// 			padding-bottom: 1rem !important;
// 			padding-left: 2rem;
// 			list-style-type: circle !important;
// 		}
// 	}
// `;
