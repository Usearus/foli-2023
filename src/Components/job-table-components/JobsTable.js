// import { useState } from 'react';
// import JobsTableRow from './JobsTableRow';
// import styled from 'styled-components';
// import { GoChevronDown, GoChevronUp } from 'react-icons/go';
// import { Table } from 'react-bootstrap';

// const JobsTable = ({ jobs }) => {
// 	const [sortOrder, setSortOrder] = useState({
// 		column: 'company',
// 		direction: 'asc',
// 	});

// 	const handleHeaderClick = (column) => {
// 		if (column === sortOrder.column) {
// 			setSortOrder({
// 				column,
// 				direction: sortOrder.direction === 'asc' ? 'desc' : 'asc',
// 			});
// 		} else {
// 			setSortOrder({ column, direction: 'asc' });
// 		}
// 	};

// 	const sortedJobs = [...jobs].sort((a, b) => {
// 		const direction = sortOrder.direction === 'asc' ? 1 : -1;
// 		const columnA = a[sortOrder.column];
// 		const columnB = b[sortOrder.column];
// 		// TODO salary needs to be fixed
// 		if (sortOrder.column === 'salary') {
// 			if (columnA === 0 && columnB === 0) {
// 				return 0;
// 			} else if (columnA === 0) {
// 				return 1 * direction;
// 			} else if (columnB === 0) {
// 				return -1 * direction;
// 			} else {
// 				return (columnA - columnB) * direction;
// 			}
// 		} else {
// 			return columnA.localeCompare(columnB) * direction;
// 		}
// 	});
// 	// console.log(sortedJobs);

// 	const renderSortIcon = (columnName) => {
// 		if (columnName === sortOrder.column) {
// 			return sortOrder.direction === 'asc' ? (
// 				<GoChevronUp />
// 			) : (
// 				<GoChevronDown />
// 			);
// 		} else {
// 			return null;
// 		}
// 	};

// 	return (
// 		<Wrapper>
// 			<div className='job-table'>
// 				<Table hover>
// 					<thead>
// 						<tr>
// 							<th
// 								className={`custom-width ${
// 									sortOrder.column === 'company' ? 'active-header' : ''
// 								}`}
// 								onClick={() => handleHeaderClick('company')}>
// 								Job {renderSortIcon('company')}
// 							</th>
// 							<th
// 								className={`${
// 									sortOrder.column === 'salary' ? 'active-header' : ''
// 								} , desktop-only-table-cell`}

// 								// TODO onClick={() => handleHeaderClick('salary')}
// 							>
// 								Salary {renderSortIcon('salary')}
// 							</th>
// 							<th
// 								className={`${
// 									sortOrder.column === 'location' ? 'active-header' : ''
// 								}, desktop-only-table-cell`}
// 								onClick={() => handleHeaderClick('location')}>
// 								Location {renderSortIcon('location')}
// 							</th>
// 							<th
// 								className={`${
// 									sortOrder.column === 'status' ? 'active-header' : ''
// 								}`}
// 								onClick={() => handleHeaderClick('status')}>
// 								Stage{renderSortIcon('status')}
// 							</th>
// 							<th
// 								className={`${
// 									sortOrder.column === 'edited' ? 'active-header' : ''
// 								}, desktop-only-table-cell`}
// 								onClick={() => handleHeaderClick('edited')}>
// 								Edited {renderSortIcon('edited')}
// 							</th>
// 							<th></th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{sortedJobs.map((job) => {
// 							return <JobsTableRow key={job.id} {...job} id={job.id} />;
// 						})}
// 					</tbody>
// 				</Table>
// 			</div>
// 		</Wrapper>
// 	);
// };

// export default JobsTable;

import JobsTableRow from './JobsTableRow';

const JobsTable = ({ jobs }) => {
	if (jobs && jobs.length > 0) {
		return (
			<table className='table text-base-content'>
				{/* Head */}
				<thead>
					<tr>
						<th className='min-w-[100px] max-w-[200px] '>Job</th>
						<th className='hidden lg:table-cell'>Salary</th>
						<th className='hidden lg:table-cell'>Location</th>
						<th className='hidden lg:table-cell'>Edited</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				{/* Body */}
				<tbody>
					{jobs.map((job) => (
						<JobsTableRow key={job.id} {...job} id={job.id} />
					))}
				</tbody>
			</table>
		);
	}

	if (jobs && jobs.length === 0) {
		return (
			<div className='flex justify-center items-center h-full p-6'>
				<h5 className='text-lg'>
					No jobs are being tracked. Add your first job to get started.
				</h5>
			</div>
		);
	}
};
export default JobsTable;
