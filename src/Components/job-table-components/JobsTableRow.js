import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseContext } from '../../context/DatabaseContext';
import EditStageSelectDropdown from '../modal-components/EditStageSelectDropdown';
import {
	DotsVerticalIcon,
	ArrowUpIcon,
	ArrowDownIcon,
} from '@radix-ui/react-icons';
import DeleteJobBtn from '../modal-components/DeleteJobBtn';
import EditJobBtn from '../modal-components/EditJobBtn';

const JobsTableRow = (job) => {
	const { fetchCurrentJob, fetchCurrentJobPages, userProfile } =
		useContext(DatabaseContext);
	const navigate = useNavigate();

	const handleTableRowClick = async () => {
		await fetchCurrentJob(job);
		await fetchCurrentJobPages(job);
		navigate(`/job/id:${job.id}`);
	};

	const targetSalaryIncrease =
		userProfile.salary_target !== undefined &&
		userProfile.salary_current !== undefined
			? Math.round(
					((job.salary_max - userProfile.salary_current) /
						userProfile.salary_target) *
						100
			  )
			: undefined;

	const salaryIncreaseClassName =
		targetSalaryIncrease > 0 ? 'badge-success' : 'badge-error';

	// Conditionally render the icon with the formatted salary increase
	const formattedSalaryIncrease =
		targetSalaryIncrease !== undefined ? (
			<span>
				{targetSalaryIncrease > 0 ? (
					<div className='flex items-center'>
						<ArrowUpIcon className='inline-block mr-1' />
						{targetSalaryIncrease}%
					</div>
				) : (
					<div className='flex items-center'>
						<ArrowDownIcon className='inline-block mr-1' />
						{Math.abs(targetSalaryIncrease)}%
					</div>
				)}
			</span>
		) : (
			''
		);

	// Set tooltip text based on the salary increase direction
	const tooltipText =
		targetSalaryIncrease !== undefined
			? targetSalaryIncrease > 0
				? `${targetSalaryIncrease}% higher than current salary`
				: `${Math.abs(targetSalaryIncrease)}% lower than current salary`
			: '';

	const salaryDisplay = (() => {
		// Min & Max filled
		if (job.salary_min && job.salary_max) {
			return (
				<div className='flex flex-wrap items-center gap-2'>
					${job.salary_min.toLocaleString()} - $
					{job.salary_max.toLocaleString()}{' '}
					{/* Only show badge if Target Salary is filled */}
					{userProfile.salary_target ? (
						<div className='tooltip' data-tip={tooltipText}>
							<span
								className={`badge badge-outline ${salaryIncreaseClassName}`}>
								{formattedSalaryIncrease}
							</span>
						</div>
					) : null}
				</div>
			);
		} else if (
			// Min only
			job.salary_min &&
			(job.salary_max === 0 || job.salary_max === null)
		) {
			return (
				<div className='flex flex-wrap items-center gap-2'>
					${job.salary_min.toLocaleString()}
				</div>
			);
		} else if (
			// Max only
			(job.salary_min === 0 || job.salary_min === null) &&
			job.salary_max
		) {
			return (
				<div className='flex flex-wrap items-center gap-2'>
					${job.salary_max.toLocaleString()}{' '}
					{/* Only show badge if Target Salary is filled */}
					{userProfile.salary_target ? (
						<div className='tooltip' data-tip={tooltipText}>
							<span
								className={`badge badge-outline ${salaryIncreaseClassName}`}>
								{formattedSalaryIncrease}
							</span>
						</div>
					) : null}
				</div>
			);
		} else {
			return '-';
		}
	})();

	return (
		<>
			<tr key={job.id} className='hover:bg-base-200 border-b-neutral'>
				{/* Job Cell */}
				<td
					onClick={handleTableRowClick}
					className='min-w-[100px] max-w-[200px] cursor-pointer'>
					<div className='font-bold'>{job.company}</div>
					<div className='font-light whitespace-nowrap overflow-hidden text-ellipsis'>
						{job.position}
					</div>
				</td>
				{/* Salary Cell */}
				<td
					onClick={handleTableRowClick}
					className='table-cell font-light cursor-pointer'>
					{salaryDisplay}
				</td>
				{/* Location cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell w-[300px] cursor-pointer'>
					{job.location ? (
						<div className='badge badge-neutral overflow-hidden mr-2 my-1'>
							{job.location}
						</div>
					) : (
						''
					)}
					{job.remote ? (
						<div className='badge badge-neutral'>Remote / Hybrid</div>
					) : (
						''
					)}
				</td>
				{/* Edited cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell font-light cursor-pointer'>
					{new Date(job.edited).toLocaleDateString()}
				</td>
				{/* Status dropdown Cell */}
				<td className='hidden lg:table-cell'>
					<EditStageSelectDropdown job={job} />
				</td>
				{/* More actions Cell */}
				<td className='w-8'>
					<div className='dropdown dropdown-end'>
						<div tabIndex={0} role='button' className='btn btn-xs btn-ghost '>
							<DotsVerticalIcon />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
							<li>
								<EditJobBtn job={job} />
							</li>
							<li>
								<DeleteJobBtn job={job} />
							</li>
						</ul>
					</div>
				</td>
			</tr>
		</>
	);
};

export default JobsTableRow;
