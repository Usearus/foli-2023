import { useState, useEffect } from 'react';
import {
	ChevronUpIcon,
	ChevronDownIcon,
	InfoCircledIcon,
} from '@radix-ui/react-icons';
import JobsTableRow from './JobsTableRow';
import Loader from '../atom-components/Loader';

const JobsTable = ({ jobs }) => {
	const [currentTablePage, setCurrentTablePage] = useState(1);
	const [sortOrder, setSortOrder] = useState({
		column: null, // No initial sorting
		direction: null, // No sorting direction
	});

	const rowsPerPage = 10;
	const totalPages = Math.ceil(jobs.length / rowsPerPage);
	const startIndex = (currentTablePage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, jobs.length);

	const handlePageChange = (pageNumber) => {
		setCurrentTablePage(pageNumber);
	};

	const handleHeaderClick = (column) => {
		setSortOrder((prevState) => {
			if (prevState.column === column) {
				if (prevState.direction === 'asc') {
					return { column: column, direction: 'desc' }; // Switch to descending
				} else if (prevState.direction === 'desc') {
					return { column: null, direction: null }; // Reset to unsorted
				}
			} else {
				return { column: column, direction: 'asc' }; // Default to ascending for a new column
			}
			return prevState;
		});
	};

	const sortedJobs = [...jobs].sort((a, b) => {
		if (!sortOrder.column || !sortOrder.direction) {
			return 0; // No sorting if unsorted
		}

		const direction = sortOrder.direction === 'asc' ? 1 : -1;

		if (sortOrder.column === 'salary') {
			const salaryA = a.salary_max;
			const salaryB = b.salary_max;
			return (salaryA - salaryB) * direction;
		} else {
			const columnA = a[sortOrder.column];
			const columnB = b[sortOrder.column];
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

	// Loading state
	const [loading, setLoading] = useState(true); // New loading state

	useEffect(() => {
		// Simulate data fetching
		const timer = setTimeout(() => {
			setLoading(false); // Data is ready
		}, 1000); // Adjust the delay as needed

		return () => clearTimeout(timer); // Cleanup timer on unmount
	}, []);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-full p-6'>
				<Loader />
			</div>
		);
	}

	return (
		<>
			{jobs && jobs.length > 0 ? (
				<div className='w-full flex flex-col items-end'>
					<table className='table text-base-content table-pin-rows'>
						<thead>
							<tr className='bg-base-300 border-b-neutral'>
								<th
									className={`hover:bg-base-200 min-w-[100px] max-w-[200px] cursor-pointer ${getHeaderClassName(
										'company'
									)}`}
									onClick={() => handleHeaderClick('company')}>
									<div className='flex items-center'>
										Job {renderSortIcon('company')}
									</div>
								</th>
								<th
									className={`cursor-pointer ${getHeaderClassName('salary')}`}
									onClick={() => handleHeaderClick('salary')}>
									<div className='flex items-center gap-1'>
										Salary
										<div
											className='tooltip font-normal'
											data-tip='Sorts by max salary'>
											<InfoCircledIcon />
										</div>
										{renderSortIcon('salary')}
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
									className={`hidden lg:table-cell cursor-pointer ${getHeaderClassName(
										'status'
									)}`}
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
					{/* Pagination  */}
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
											currentTablePage === index + 1 ? 'btn-primary' : ''
										}`}
										onClick={() => handlePageChange(index + 1)}>
										{index + 1}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			) : (
				// Empty state
				<div className='flex justify-center items-center h-full p-6'>
					<h5 className='text-lg'>
						No jobs are being tracked. Add a job to get started.
					</h5>
				</div>
			)}
		</>
	);
};

export default JobsTable;
