import { useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { ChevronDownIcon } from '@radix-ui/react-icons';

// import SideBarAssistant from './SideBarAssistant';
import DropdownAddPage from '../atom-components/DropdownAddPage';
// import DropdownStageSelect from '../atom-components/DropdownStageSelect';
// import SideBarSnippets from './SideBarSnippets';
// import SideBarQuestions from '../single-job-components/SideBarQuestions';

const TopBarJobDesktop = () => {
	const { currentJob } = useContext(DatabaseContext);

	return (
		<div className='p-4 row-span-1 col-span-1 lg:col-span-2 bg-base-200 flex items-center justify-between '>
			<div className='flex gap-6 items-center'>
				<div className='max-w-[200px]'>
					<p className='font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
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
				<div className='dropdown dropdown-end'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-xs btn-outline flex justify-between min-w-32'>
						{currentJob.status} <ChevronDownIcon />
					</div>
					<ul
						tabIndex={0}
						className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
						<li>
							<button>Interested</button>
						</li>
						<li>
							<button>Applied</button>
						</li>
						<li>
							<button>Interviewing</button>
						</li>
						<li>
							<button>Negotiating</button>
						</li>
						<li>
							<button>Accepted</button>
						</li>
						<li>
							<button>Declined</button>
						</li>
						<li>
							<button>Rejected</button>
						</li>
						<li>
							<button>Archived</button>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<DropdownAddPage />
			</div>
		</div>
	);
};

export default TopBarJobDesktop;
