import { useState, useContext } from 'react';
import JobsTable from '../Components/job-table-components/JobsTable';
import { DatabaseContext } from '../context/DatabaseContext';
import TopBarTable from '../Components/job-table-components/TopBarTable';
import AddPreferencesModal from '../Components/modal-components/AddPreferencesModal';

const JobsPage = () => {
	const { userJobs, userJobsArchived, userProfile } =
		useContext(DatabaseContext);

	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!userProfile) {
		return <></>;
	}

	return (
		<>
			{userJobs.length === 0 && userJobsArchived.length === 0 ? (
				<>
					{/* New account or 0 jobs */}
					<AddPreferencesModal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
					<div className='h-full overflow-hidden flex flex-col'>
						<TopBarTable />
						{/* Tabs component */}
						<div className='flex justify-center items-center h-full p-6'>
							<h5 className='text-lg'>
								No jobs are being tracked. Add a job to get started.
							</h5>
						</div>
					</div>
				</>
			) : (
				<>
					{/* Main page content */}
					<div className='h-full overflow-hidden flex flex-col'>
						<TopBarTable />
						{/* Tabs component */}
						<div className='p-0 lg:px-4 pt-2 lg:pt-4 flex-grow'>
							<div role='tablist' className='tabs tabs-bordered'>
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
								<div role='tabpanel' className='tab-content mt-4'>
									<JobsTable jobs={userJobsArchived} />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default JobsPage;
