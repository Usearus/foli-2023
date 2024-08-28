import { useContext } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import DropdownAddPage from '../modal-components/DropdownAddPage';
// import DropdownStageSelect from '../modal-components/DropdownStageSelect';
// import SideBarAssistant from './SideBarAssistant';
// import SideBarSnippets from './SideBarSnippets';
// import SideBarQuestions from '../single-job-components/SideBarQuestions';

const TopBarJobDesktop = () => {
	const { currentJob } = useContext(DatabaseContext);

	return (
		<div className='p-4 row-span-1 col-span-1 lg:col-span-2 bg-base-200 flex items-center justify-between '>
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
				{/* <DropdownStageSelect job={currentJob} /> */}
			</div>
			<div>
				<DropdownAddPage />
			</div>
		</div>
	);
};

export default TopBarJobDesktop;
