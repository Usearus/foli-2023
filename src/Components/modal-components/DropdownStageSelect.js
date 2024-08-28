import { useContext, useEffect } from 'react';
import { supabase } from '../../API/supabase';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const DropdownStageSelect = ({ job }) => {
	const { fetchCurrentJob, fetchUserJobs, fetchUserJobsArchived } =
		useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const handleUpdateStatusClick = async (status) => {
		// console.log(status);
		// console.log(job.id);
		const { error } = await supabase
			.from('jobs')
			.update({
				status: status,
				edited: new Date().toLocaleDateString('en-US'),
			})
			.eq('id', job.id);
		setAlert('Status updated', 'success');
		fetchUserJobs();
		fetchUserJobsArchived();
		fetchCurrentJob(job);

		if (error) {
			setAlert('Unable to update job.', 'error');
			console.log('error is', error);
			return;
		}
	};

	useEffect(() => {
		// Add event listeners to blur active element when dropdown items are clicked
		const dropdownItems = document.querySelectorAll('.dropdown-content>li');
		dropdownItems.forEach((element) => {
			element.addEventListener('click', () => {
				document.activeElement.blur();
			});
		});

		// Cleanup event listeners on unmount
		return () => {
			dropdownItems.forEach((element) => {
				element.removeEventListener('click', () => {
					document.activeElement.blur();
				});
			});
		};
	}, []);

	return (
		<div className='dropdown dropdown-end'>
			<div
				tabIndex={0}
				role='button'
				// onMouseDown={(e) => checkAndCloseDropDown(e)}
				className='btn btn-xs btn-outline flex justify-between min-w-32'>
				{job.status} <ChevronDownIcon />
			</div>
			<ul
				tabIndex='0'
				className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
				<li onClick={() => handleUpdateStatusClick('Interested')}>
					<button>Interested</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Applied')}>
					<button>Applied</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Interviewing')}>
					<button>Interviewing</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Negotiating')}>
					<button>Negotiating</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Accepted')}>
					<button>Accepted</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Declined')}>
					<button>Declined</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Rejected')}>
					<button>Rejected</button>
				</li>
				<li onClick={() => handleUpdateStatusClick('Archived')}>
					<button>Archived</button>
				</li>
			</ul>
		</div>
	);
};

export default DropdownStageSelect;
