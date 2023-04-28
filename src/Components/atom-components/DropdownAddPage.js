import { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ModalAddPage from '../modal-components/ModalAddPage';
import ModalTemplates from '../modal-components/ModalTemplates';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';

const DropdownAddPage = () => {
	const [selectedEventKey, setSelectedEventKey] = useState(null);
	const [showAddPageModal, setShowAddPageModal] = useState(false);
	const [showTemplateModal, setShowTemplateModal] = useState(false);

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
					<GrTemplate style={{ marginRight: '.5rem' }} /> From template
				</Dropdown.Item>
			</DropdownButton>
			{showAddPageModal && (
				<ModalAddPage show={showAddPageModal} handleClose={handleCloseReset} />
			)}
			{showTemplateModal && (
				<ModalTemplates
					show={showTemplateModal}
					closeTemplateModal={handleCloseReset}
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
