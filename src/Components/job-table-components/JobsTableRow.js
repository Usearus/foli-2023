import { useContext, useState } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';

import { DotsVerticalIcon, ChevronDownIcon } from '@radix-ui/react-icons';

const JobsTableRow = (job) => {
	const { fetchCurrentJob, fetchCurrentPages } = useContext(DatabaseContext);
	const navigate = useNavigate();

	const handleTableRowClick = async () => {
		await fetchCurrentJob(job);
		await fetchCurrentPages(job);
		navigate(`/job/id:${job.id}`);
	};

	return (
		<>
			<tr key={job.id} className='hover:bg-base-100'>
				{/* Job Cell */}
				<td
					onClick={handleTableRowClick}
					className='min-w-[100px] max-w-[200px] cursor-pointer'>
					<div className='font-bold '>{job.company}</div>
					<div className='font-light whitespace-nowrap overflow-hidden text-ellipsis'>
						{job.position}
					</div>
				</td>
				{/* Salary Cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell font-light cursor-pointer'>
					{job.salary_min && job.salary_max
						? `$${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
						: '-'}
				</td>
				{/* Location cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell cursor-pointer'>
					{job.location ? (
						// TO DO - Fix clipping
						<div className='badge badge-neutral overflow-hidden mr-2 my-1'>
							{job.location}
						</div>
					) : (
						''
					)}
					{job.remote ? <div className='badge badge-neutral'>Remote</div> : ''}
				</td>
				{/* Edited cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell font-light cursor-pointer'>
					{new Date(job.edited).toLocaleDateString()}
				</td>
				{/* Status dropdown Cell */}
				<td>
					<div className='dropdown dropdown-end'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-xs btn-outline flex justify-between min-w-32'>
							{job.status} <ChevronDownIcon />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
							<li>
								<a>Interested</a>
							</li>
							<li>
								<a>Applied</a>
							</li>
							<li>
								<a>Interviewing</a>
							</li>
							<li>
								<a>Negotiating</a>
							</li>
							<li>
								<a>Accepted</a>
							</li>
							<li>
								<a>Declined</a>
							</li>
							<li>
								<a>Rejected</a>
							</li>
							<li>
								<a>Archived</a>
							</li>
						</ul>
					</div>
				</td>
				{/* More actions Cell */}
				<td className='w-8'>
					<div className='dropdown dropdown-end'>
						<div tabIndex={0} role='button' className='btn btn-xs btn-ghost '>
							<DotsVerticalIcon />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
							<li>
								<a>Edit</a>
							</li>
							<li>
								<a>Delete</a>
							</li>
						</ul>
					</div>
				</td>
			</tr>
		</>
	);
};

export default JobsTableRow;

// import ModalDeleteConfirmation from '../modal-components/ModalDeleteConfirmation';
// import { Dropdown } from 'react-bootstrap';
// import { FiMoreVertical } from 'react-icons/fi';
// import ModalEditJob from '../modal-components/ModalEditJob';
// import DropdownStageSelect from '../atom-components/DropdownStageSelect';
// import FoliBadge from '../atom-components/FoliBadge';

// const JobsTableRow = (job) => {
// 	const { fetchCurrentJob, fetchCurrentPages } = useContext(DatabaseContext);

// 	const [showDeleteModal, setShowDeleteModal] = useState(false);
// 	const [showEditModal, setShowEditModal] = useState(false);

// 	const handleSelect = (eventKey) => {
// 		if (eventKey === '1') {
// 			setShowEditModal(true);
// 		}
// 		if (eventKey === '2') {
// 			setShowDeleteModal(true);
// 		}
// 	};

// 	// Will close any modal opened by the dropdown
// 	const handleCloseReset = () => {
// 		setShowDeleteModal(false);
// 		setShowEditModal(false);
// 	};

// 	return (
// 		<tr style={{ background: 'var(--white)' }}>
// 			<td
// 				onClick={handleTableRowClick}
// 				className=' align-middle'
// 				style={{ minWidth: '100', maxWidth: '200px' }}>
// 				<div style={{ fontWeight: '600', color: 'var(--primary-700)' }}>
// 					{job.company}
// 				</div>
// 				<div
// 					style={{
// 						whiteSpace: 'nowrap',
// 						overflow: 'hidden',
// 						textOverflow: 'ellipsis',
// 					}}>
// 					{job.position}
// 				</div>
// 			</td>
// 			<td
// 				className='desktop-only-table-cell align-middle'
// 				onClick={handleTableRowClick}
// 				style={{
// 					minWidth: '88px',
// 				}}>
// 				{job.salary_min && job.salary_max
// 					? `$${job.salary_min.toLocaleString()} -
//                 ${job.salary_max.toLocaleString()}`
// 					: '-'}
// 			</td>
// 			<td
// 				className='desktop-only-table-cell align-middle'
// 				style={{
// 					minWidth: '130px',
// 				}}
// 				onClick={handleTableRowClick}>
// 				{job.location ? <FoliBadge content={job.location} /> : ''}
// 				{job.remote ? <FoliBadge content='Remote' /> : ''}
// 			</td>
// 			<td className='align-middle' style={{ width: '160px' }}>
// 				<DropdownStageSelect job={job} />
// 			</td>
// 			<td
// 				className='desktop-only-table-cell align-middle'
// 				style={{ width: '100px' }}
// 				onClick={handleTableRowClick}>
// 				{new Date(job.edited).toLocaleDateString()}
// 			</td>
// 			<td className='align-middle' style={{ width: '48px' }}>
// 				<Dropdown onSelect={handleSelect}>
// 					<Dropdown.Toggle
// 						id='dropdown'
// 						variant='link'
// 						style={{ color: 'var(--grey-800)' }}>
// 						<FiMoreVertical />
// 					</Dropdown.Toggle>
// 					<Dropdown.Menu>
// 						<Dropdown.Item eventKey='1'>Edit Job</Dropdown.Item>
// 						<Dropdown.Item eventKey='2'>Delete Job</Dropdown.Item>
// 					</Dropdown.Menu>
// 				</Dropdown>
// 				{showDeleteModal && (
// 					<ModalDeleteConfirmation
// 						show={showDeleteModal}
// 						close={handleCloseReset}
// 						object={job}
// 						type='job'
// 					/>
// 				)}
// 				{showEditModal && (
// 					<ModalEditJob
// 						show={showEditModal}
// 						close={handleCloseReset}
// 						job={job}
// 					/>
// 				)}
// 			</td>
// 		</tr>
// 	);
// };

// export default JobsTableRow;
