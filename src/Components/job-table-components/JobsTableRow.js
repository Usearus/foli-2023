import { useContext, useState } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from '../modal-components/ModalDeleteConfirmation';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import ModalEditJob from '../modal-components/ModalEditJob';
import DropdownStageSelect from '../atom-components/DropdownStageSelect';
import FoliBadge from '../atom-components/FoliBadge';

const JobsTableRow = (job) => {
	const { fetchCurrentJob, fetchCurrentPages } = useContext(DatabaseContext);

	const navigate = useNavigate();

	const [selectedEventKey, setSelectedEventKey] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const handleTableRowClick = async () => {
		await fetchCurrentJob(job);
		await fetchCurrentPages(job);
		navigate(`/job/id:${job.id}`);
	};

	// Will handle any modal option selected
	const handleSelect = (eventKey) => {
		setSelectedEventKey(eventKey);
		if (eventKey === '1') {
			setShowEditModal(true);
		}
		if (eventKey === '2') {
			setShowDeleteModal(true);
		}
	};

	// Will close any modal opened by the dropdown
	const handleCloseReset = () => {
		setShowDeleteModal(false);
		setShowEditModal(false);
	};

	return (
		<tr style={{ background: 'var(--white)' }}>
			<td
				onClick={handleTableRowClick}
				className=' align-middle'
				style={{ minWidth: '100', maxWidth: '200px' }}>
				<div style={{ fontWeight: '600', color: 'var(--primary-700)' }}>
					{job.company}
				</div>
				<div
					style={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}>
					{job.position}
				</div>
			</td>
			<td
				className='desktop-only-table-cell align-middle'
				onClick={handleTableRowClick}
				style={{
					minWidth: '88px',
				}}>
				{job.salary_min && job.salary_max
					? `$${job.salary_min.toLocaleString()} -
                ${job.salary_max.toLocaleString()}`
					: '-'}
			</td>
			<td
				className='desktop-only-table-cell align-middle'
				style={{
					minWidth: '130px',
				}}
				onClick={handleTableRowClick}>
				{job.location ? <FoliBadge content={job.location} /> : ''}
				{job.remote ? <FoliBadge content='Remote' /> : ''}
			</td>
			<td className='align-middle' style={{ width: '160px' }}>
				<DropdownStageSelect job={job} />
			</td>
			<td
				className='desktop-only-table-cell align-middle'
				style={{ width: '100px' }}
				onClick={handleTableRowClick}>
				{new Date(job.edited).toLocaleDateString()}
			</td>
			<td className='align-middle' style={{ width: '48px' }}>
				<Dropdown onSelect={handleSelect}>
					<Dropdown.Toggle
						id='dropdown'
						variant='link'
						style={{ color: 'var(--grey-800)' }}>
						<FiMoreVertical />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey='1'>Edit Job</Dropdown.Item>
						<Dropdown.Item eventKey='2'>Delete Job</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				{showDeleteModal && (
					<ModalDeleteConfirmation
						show={showDeleteModal}
						close={handleCloseReset}
						object={job}
						type='job'
					/>
				)}
				{showEditModal && (
					<ModalEditJob
						show={showEditModal}
						close={handleCloseReset}
						job={job}
					/>
				)}
			</td>
		</tr>
	);
};

export default JobsTableRow;

const Wrapper = styled.div``;
