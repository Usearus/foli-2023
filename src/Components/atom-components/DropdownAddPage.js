import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ModalAddPage from '../modal-components/ModalAddPage';
import SideBarTemplates from '../single-job-components/template-components/SideBarTemplates';
import SideBarAssistant from '../single-job-components/SideBarAssistant';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { AiOutlineRobot } from 'react-icons/ai';
import { DatabaseContext } from '../../context/DatabaseContext';

const DropdownAddPage = () => {
	const [showAddPageModal, setShowAddPageModal] = useState(false);
	const [showSideBarTemplates, setShowSideBarTemplates] = useState(false);
	const [showSidebarAssistant, setShowSidebarAssistant] = useState(false);
	const { setPreviewTemplate, setActiveTemplate } = useContext(DatabaseContext);

	const handleSelect = (eventKey) => {
		if (eventKey === '1') {
			setShowAddPageModal(true);
		}
		if (eventKey === '2') {
			setShowSideBarTemplates(true);
		}
		if (eventKey === '3') {
			setShowSidebarAssistant(true);
		}
	};

	const handleCloseReset = () => {
		setShowAddPageModal(false);
		setShowSideBarTemplates(false);
		setShowSidebarAssistant(false);
		setActiveTemplate(null);
		setPreviewTemplate(false);
	};

	return (
		<Wrapper>
			<DropdownButton
				title='Add page'
				id='add-page-dropdown'
				align='end'
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
					<GrTemplate style={{ marginRight: '.5rem' }} /> Use template
				</Dropdown.Item>
				<Dropdown.Item
					eventKey='3'
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '.5rem 1rem',
					}}>
					<AiOutlineRobot style={{ marginRight: '.5rem' }} /> Use AI assistant
				</Dropdown.Item>
			</DropdownButton>
			{showAddPageModal && (
				<ModalAddPage show={showAddPageModal} close={handleCloseReset} />
			)}
			{showSideBarTemplates && (
				<SideBarTemplates
					show={showSideBarTemplates}
					close={handleCloseReset}
				/>
			)}
			{showSidebarAssistant && (
				<SideBarAssistant
					show={showSidebarAssistant}
					close={handleCloseReset}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default DropdownAddPage;
