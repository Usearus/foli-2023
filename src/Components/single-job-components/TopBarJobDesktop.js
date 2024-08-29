import { useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import DropdownAddPage from '../modal-components/DropdownAddPage';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import EditJobBtn from '../modal-components/EditJobBtn';
import DeleteJobBtn from '../modal-components/DeleteJobBtn';
// import SideBarAssistant from './SideBarAssistant';
// import SideBarSnippets from './SideBarSnippets';
// import SideBarQuestions from '../single-job-components/SideBarQuestions';

const TopBarJobDesktop = () => {
	const { currentJob } = useContext(DatabaseContext);

	return (
		<div className='p-4 row-span-1 col-span-1 lg:col-span-2 flex items-center justify-between '>
			<div className='flex gap-6 items-center'>
				<div className='max-w-[200px]'>
					<p className='font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis'>
						{currentJob.company}
					</p>

					{currentJob.link ? (
						<a href={currentJob.link} target='_blank' rel='noreferrer'>
							<p className='link link-primary text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer'>
								{currentJob.position}
							</p>
						</a>
					) : (
						<p className='text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer'>
							{currentJob.position}
						</p>
					)}
				</div>
			</div>
			<div className='flex items-center'>
				<DropdownAddPage />
				<div className='dropdown dropdown-end'>
					<div tabIndex={0} role='button' className='btn btn-sm btn-ghost '>
						<DotsVerticalIcon />
					</div>
					<ul
						tabIndex={0}
						className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
						<li>
							<EditJobBtn job={currentJob} />
						</li>
						<li>
							<DeleteJobBtn job={currentJob} />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TopBarJobDesktop;
