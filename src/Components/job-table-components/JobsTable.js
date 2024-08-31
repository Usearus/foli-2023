import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import JobsTableRow from './JobsTableRow';

const JobsTable = ({ jobs }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState({
		column: 'company',
		direction: 'asc',
	});

	const rowsPerPage = 10;
	const totalPages = Math.ceil(jobs.length / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, jobs.length);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleHeaderClick = (column) => {
		if (column === sortOrder.column) {
			setSortOrder({
				column,
				direction: sortOrder.direction === 'asc' ? 'desc' : 'asc',
			});
		} else {
			setSortOrder({ column, direction: 'asc' });
		}
	};

	const sortedJobs = [...jobs].sort((a, b) => {
		const direction = sortOrder.direction === 'asc' ? 1 : -1;
		const columnA = a[sortOrder.column];
		const columnB = b[sortOrder.column];

		if (sortOrder.column === 'salary') {
			return (columnA - columnB) * direction;
		} else {
			return columnA.localeCompare(columnB) * direction;
		}
	});

	const renderSortIcon = (columnName) => {
		if (columnName === sortOrder.column) {
			return sortOrder.direction === 'asc' ? (
				<ChevronUpIcon />
			) : (
				<ChevronDownIcon />
			);
		}
		return null;
	};

	const getHeaderClassName = (columnName) => {
		return columnName === sortOrder.column ? 'bg-base-100' : '';
	};

	if (jobs && jobs.length > 0) {
		return (
			<div className='w-full flex flex-col items-end'>
				<table className='table  text-base-content table-pin-rows'>
					<thead>
						<tr className='bg-base-200'>
							<th
								className={`min-w-[100px] max-w-[200px] cursor-pointer ${getHeaderClassName(
									'company'
								)}`}
								onClick={() => handleHeaderClick('company')}>
								<div className='flex items-center'>
									Job {renderSortIcon('company')}
								</div>
							</th>
							<th
								className={`hidden lg:table-cell cursor-pointer ${getHeaderClassName(
									'salary'
								)}`}
								onClick={() => handleHeaderClick('salary')}>
								<div className='flex items-center'>
									Salary {renderSortIcon('salary')}
								</div>
							</th>
							<th
								className={`hidden lg:table-cell cursor-pointer ${getHeaderClassName(
									'location'
								)}`}
								onClick={() => handleHeaderClick('location')}>
								<div className='flex items-center'>
									Location {renderSortIcon('location')}
								</div>
							</th>
							<th
								className={`hidden lg:table-cell cursor-pointer ${getHeaderClassName(
									'edited'
								)}`}
								onClick={() => handleHeaderClick('edited')}>
								<div className='flex items-center'>
									Edited {renderSortIcon('edited')}
								</div>
							</th>
							<th
								className={`cursor-pointer ${getHeaderClassName('status')}`}
								onClick={() => handleHeaderClick('status')}>
								<div className='flex items-center'>
									Status {renderSortIcon('status')}
								</div>
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sortedJobs.slice(startIndex, endIndex).map((job) => (
							<JobsTableRow key={job.id} {...job} id={job.id} />
						))}
					</tbody>
				</table>

				<div className='mt-4 flex items-center gap-4 pr-4'>
					<span className='text-sm'>
						{startIndex + 1}-{endIndex} jobs of <span>{jobs.length}</span>
					</span>
					{totalPages > 1 && (
						<div className='join flex'>
							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index + 1}
									className={`join-item btn btn-sm ${
										currentPage === index + 1 ? 'btn-primary' : ''
									}`}
									onClick={() => handlePageChange(index + 1)}>
									{index + 1}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
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
