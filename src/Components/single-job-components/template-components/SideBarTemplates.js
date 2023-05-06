import { useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';
import TemplateCardGrid from './TemplateCardGrid';
import { DatabaseContext } from '../../../context/DatabaseContext';
import { Button } from 'react-bootstrap';
import { supabase } from '../../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../../../Custom Hooks/useAlert';
import styled from 'styled-components';

const SideBarTemplates = ({ show, close }) => {
	const { user } = useAuth0();
	const { setAlert } = useAlert();

	const {
		previewTemplate,
		activeTemplate,
		setActiveTemplate,
		setPreviewTemplate,
		currentJob,
		fetchCurrentPages,
		currentPages,
		setSelectedCategory,
		setCurrentTemplates,
		allTemplates,
	} = useContext(DatabaseContext);

	const addPage = async () => {
		await supabase.from('pages').select().eq('id', currentJob.id);
		const { error } = await supabase.from('pages').insert({
			account: user.email,
			title: activeTemplate.title,
			content: activeTemplate.content,
			jobid: currentJob.id,
			position: currentPages.length,
		});
		// console.log(data, 'template added');
		fetchCurrentPages(currentJob);
		setAlert('Page successfully added!', 'success');
		if (error) {
			setAlert('There was an error adding the template.', 'error');
			console.log(error);
			return;
		}
	};

	const handleCloseActive = () => {
		setActiveTemplate(null);
		setPreviewTemplate(false);
		setSelectedCategory('All');
		setCurrentTemplates(allTemplates);
	};

	const handleCloseAndReset = () => {
		setActiveTemplate(null);
		setPreviewTemplate(false);
		setSelectedCategory('All');
		setCurrentTemplates(allTemplates);
		close();
	};

	const handleAddPageClick = () => {
		addPage();
		setActiveTemplate(null);
		setPreviewTemplate(false);
		setSelectedCategory('All');
		setCurrentTemplates(allTemplates);
		close();
	};

	return (
		<Offcanvas
			show={show}
			onHide={close}
			placement='end'
			backdrop={false}
			scroll={true}
			// style={{ background: 'var(--grey-100)' }}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Templates</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Wrapper>
					<TemplateCardGrid />
					{!previewTemplate ? (
						''
					) : (
						<div className='page-footer' style={{}}>
							<Button variant='outline-secondary' onClick={handleCloseActive}>
								Back to templates
							</Button>
							<Button variant='primary' onClick={handleAddPageClick}>
								Add page
							</Button>
						</div>
					)}
				</Wrapper>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default SideBarTemplates;
const Wrapper = styled.div`
	.page-footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
	.offcanvas-body {
		padding: 0 !important;
	}

	.accordion-body {
		padding: 1rem 0;
		padding-bottom: 2rem;
	}
`;
