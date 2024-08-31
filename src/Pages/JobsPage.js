import { useState, useContext, useEffect } from 'react';
import JobsTable from '../Components/job-table-components/JobsTable';
import { DatabaseContext } from '../context/DatabaseContext';
import TopBarTable from '../Components/job-table-components/TopBarTable';
import Loader from '../Components/atom-components/Loader';
import AddPreferencesModal from '../Components/modal-components/AddPreferencesModal';

const JobsPage = () => {
	const { userJobs, userJobsArchived, userProfile } =
		useContext(DatabaseContext);

	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Simulate loading
	useEffect(() => {
		if (userJobs && userJobsArchived) {
			setIsLoading(false);
		}
	}, [userJobs, userJobsArchived]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-full w-full'>
				<Loader />
			</div>
		);
	}

	if (!userProfile) {
		return <></>;
	}

	return (
		<>
			{/* Only shows if onboarding is false */}
			<AddPreferencesModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			{/* Main page content */}
			<div className='h-full overflow-hidden flex flex-col'>
				<TopBarTable />
				{/* Tabs component */}
				<div className='p-0 lg:px-12 flex-grow'>
					<div
						role='tablist'
						className='tabs tabs-bordered grid-rows-[1fr_auto]'>
						<input
							type='radio'
							name='my_tabs_1'
							role='tab'
							className='tab'
							aria-label='Active'
							defaultChecked
						/>
						<div role='tabpanel' className='tab-content mt-4'>
							<JobsTable jobs={userJobs} />
						</div>
						<input
							type='radio'
							name='my_tabs_1'
							role='tab'
							className='tab'
							aria-label='Closed'
						/>
						<div role='tabpanel' className='tab-content mt-4 '>
							<JobsTable jobs={userJobsArchived} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default JobsPage;
