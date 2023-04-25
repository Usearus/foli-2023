import { useContext, useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddPage from './ModalAddPage';
import { DatabaseContext } from '../context/DatabaseContext';
import ModalTemplates from './ModalTemplates';
import {
	Form,
	Dropdown,
	DropdownButton,
	ButtonGroup,
	Button,
	Tooltip,
	OverlayTrigger,
} from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { RxViewVertical, RxViewHorizontal } from 'react-icons/rx';
import { supabase } from '../API/supabase';
import SideBarAssistant from './SideBarAssistant';

const TopBarJobDesktop = ({ className }) => {
	const {
		setCurrentJob,
		fetchUserJobs,
		currentJob,
		userProfile,
		fetchUserProfile,
	} = useContext(DatabaseContext);
	const { setAlert } = useAlert();
	const [selectedEventKey, setSelectedEventKey] = useState(null);
	const [showAddPageModal, setShowAddPageModal] = useState(false);
	const [showTemplateModal, setShowTemplateModal] = useState(false);

	useEffect(() => {
		const jobFromStorage = localStorage.getItem('currentJob');
		setCurrentJob(JSON.parse(jobFromStorage));
	}, [setCurrentJob]);

	const [selectedStatus, setSelectedStatus] = useState(currentJob.status);

	const handleUpdateStatusClick = async (e) => {
		setSelectedStatus(e.target.value);
		const { error } = await supabase
			.from('jobs')
			.update({
				status: e.target.value,
				edited: new Date().toLocaleDateString('en-US'),
			})
			.eq('id', currentJob.id);
		setAlert('Job successfully updated!', 'success');
		fetchUserJobs();

		if (error) {
			setAlert('Something went wrong. Job not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	const handleSelect = (eventKey) => {
		setSelectedEventKey(eventKey);
		if (eventKey === '1') {
			setShowAddPageModal(true);
		}
		if (eventKey === '2') {
			setShowTemplateModal(true);
		}
	};

	const handleCloseReset = () => {
		setShowAddPageModal(false);
		setShowTemplateModal(false);
	};

	const handleUpdateSettingPageStackClick = async (selectedStack) => {
		const { error } = await supabase
			.from('profiles')
			.update({
				page_stack: selectedStack,
			})
			.eq('id', userProfile.id);
		fetchUserProfile();
		// fetchCurrentPages();
		if (error) {
			setAlert('Something went wrong. Setting not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	return (
		<Wrapper className={className}>
			<Container fluid>
				<Stack
					direction='horizontal'
					gap={3}
					className='top-bar-container'>
					<div className='left-content'>
						<div className='title-content'>
							{currentJob ? (
								<>
									<h5 style={{ fontWeight: '600' }}>
										{currentJob.company}
									</h5>
									<h6
										className='truncate'
										style={{ margin: '0' }}>
										{currentJob.position}
									</h6>
								</>
							) : (
								''
							)}
						</div>
						<Form>
							<Form.Select
								size='sm'
								aria-label='Select job status'
								onChange={handleUpdateStatusClick}
								value={selectedStatus}
								className={`select ${selectedStatus}`}>
								<option value='Bookmarked'>Bookmarked</option>
								<option value='Applied'>Applied</option>
								<option value='Interviewing'>
									Interviewing
								</option>
								<option value='Negotiating'>Negotiating</option>
								<option value='Accepted'>Accepted</option>
								<option value='Declined'>Declined</option>
								<option value='Rejected'>Rejected</option>
								<option value='Archived'>Archived</option>
							</Form.Select>
						</Form>
					</div>
					<div className='right-content'>
						<ButtonGroup aria-label='page-stack-buttons'>
							<OverlayTrigger
								placement='top'
								delay={{ show: 250, hide: 0 }}
								overlay={
									<Tooltip id='vertical-stack'>
										Vertical layout
									</Tooltip>
								}>
								<Button
									variant='outline-secondary'
									onClick={() =>
										handleUpdateSettingPageStackClick(
											'vertical'
										)
									}
									active={
										userProfile.page_stack === 'vertical'
									}>
									<RxViewHorizontal />
								</Button>
							</OverlayTrigger>
							<OverlayTrigger
								placement='top'
								delay={{ show: 250, hide: 0 }}
								overlay={
									<Tooltip id='horizontal-stack'>
										Horizontal layout
									</Tooltip>
								}>
								<Button
									variant='outline-secondary'
									onClick={() =>
										handleUpdateSettingPageStackClick(
											'horizontal'
										)
									}
									active={
										userProfile.page_stack === 'horizontal'
									}>
									<RxViewVertical />
								</Button>
							</OverlayTrigger>
						</ButtonGroup>
						<SideBarAssistant />
						<DropdownButton
							title='Add page'
							id='add-page-dropdown'
							onSelect={handleSelect}>
							<Dropdown.Item
								eventKey='1'
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '.5rem 1rem',
								}}>
								<BiFileBlank style={{ marginRight: '.5rem' }} />
								Blank page
							</Dropdown.Item>
							<Dropdown.Item
								eventKey='2'
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '.5rem 1rem',
								}}>
								<GrTemplate style={{ marginRight: '.5rem' }} />{' '}
								From template
							</Dropdown.Item>
						</DropdownButton>
						{showAddPageModal && (
							<ModalAddPage
								show={showAddPageModal}
								handleClose={handleCloseReset}
							/>
						)}
						{showTemplateModal && (
							<ModalTemplates
								show={showTemplateModal}
								closeTemplateModal={handleCloseReset}
							/>
						)}
					</div>
				</Stack>
			</Container>
		</Wrapper>
	);
};

export default TopBarJobDesktop;

const Wrapper = styled.div`
	position: sticky;
	z-index: 1;

	.horizontal-stack {
		flex-wrap: none;
	}

	.vertical-stack {
		flex-wrap: wrap;
		padding: 0.5rem 5rem 0.5rem 5rem;
	}

	.top-bar-container {
		background: var(--grey-200);
		justify-content: space-between;
		border-bottom: 1px solid var(--grey-200);
		color: var(--grey-700);
		padding: 1rem;
	}

	.left-content {
		display: flex;
		flex-direction: row;
		justify-content: stretch;
		align-items: center;
		gap: 1rem;
	}
	.title-content {
		max-width: 300px;
	}
	.truncate {
		white-space: nowrap; /* prevent the text from wrapping to a new line */
		overflow: hidden; /* hide any text that overflows the element */
		text-overflow: ellipsis;
	}

	/* Mobile */
	@media (max-width: 576px) {
		.truncate {
			display: none;
		}
	}

	.right-content {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.select {
		cursor: pointer;
		min-width: 130px;
		border: 1px solid var(--grey-600);
		color: var(--grey-600);
		background-color: var(--grey-100);
		border-radius: 90px;
	}
`;
