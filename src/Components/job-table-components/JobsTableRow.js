import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseContext } from '../../context/DatabaseContext';
import EditStageSelectDropdown from '../modal-components/EditStageSelectDropdown';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import DeleteJobBtn from '../modal-components/DeleteJobBtn';
import EditJobBtn from '../modal-components/EditJobBtn';

const JobsTableRow = (job) => {
	const { fetchCurrentJob, fetchCurrentPages, userProfile } =
		useContext(DatabaseContext);
	const navigate = useNavigate();

	const handleTableRowClick = async () => {
		await fetchCurrentJob(job);
		await fetchCurrentPages(job);
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
		targetSalaryIncrease > 0 ? 'text-success' : 'text-error';

	const formattedSalaryIncrease =
		targetSalaryIncrease !== undefined
			? targetSalaryIncrease > 0
				? `+${targetSalaryIncrease}%`
				: `${targetSalaryIncrease}%`
			: '';

	return (
		<>
			<tr key={job.id} className='hover:bg-base-200'>
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
					className='table-cell font-light cursor-pointer'>
					{job.salary_min && job.salary_max ? (
						<div>
							${job.salary_min.toLocaleString()} - $
							{job.salary_max.toLocaleString()}{' '}
							<div
								className='tooltip'
								data-tip={`${formattedSalaryIncrease} compared to current salary`}>
								<span className={`badge ${salaryIncreaseClassName}`}>
									{formattedSalaryIncrease}
								</span>
							</div>
						</div>
					) : (
						'-'
					)}{' '}
				</td>
				{/* Location cell */}
				<td
					onClick={handleTableRowClick}
					className='hidden lg:table-cell w-[300px] cursor-pointer'>
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
