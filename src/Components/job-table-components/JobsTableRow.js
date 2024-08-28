import { useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import DropdownStageSelect from '../modal-components/DropdownStageSelect';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import DeleteJobBtn from '../modal-components/DeleteJobBtn';
import EditJobBtn from '../modal-components/EditJobBtn';

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
					<DropdownStageSelect job={job} />
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
