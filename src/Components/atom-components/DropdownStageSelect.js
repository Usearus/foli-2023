import { useState, useRef, useContext } from 'react';
import { supabase } from '../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const DropdownStageSelect = ({ job }) => {
	const { currentJob, fetchUserJobs, fetchUserJobsArchived } =
		useContext(DatabaseContext);

	// Database handling variables
	const { setAlert } = useAlert();
	const [selectedStatus, setSelectedStatus] = useState(job.status);

	const handleUpdateStatusClick = async (e) => {
		setSelectedStatus(e.target.value);
		console.log(e.target.value);
		const { error } = await supabase
			.from('jobs')
			.update({
				status: e.target.value,
				edited: new Date().toLocaleDateString('en-US'),
			})
			.eq('id', job.id);
		setAlert('Status updated', 'success');
		fetchUserJobs();
		fetchUserJobsArchived();

		if (error) {
			setAlert('Unable to update job.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	return (
		<>
			<div className='dropdown dropdown-end'>
				<div
					tabIndex={0}
					role='button'
					onChange={handleUpdateStatusClick}
					value={selectedStatus}
					className='btn btn-xs btn-outline flex justify-between min-w-32'>
					{currentJob.status} <ChevronDownIcon />
				</div>
				<ul
					tabIndex={0}
					className='dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow'>
					<li value='Interested' onClick={handleUpdateStatusClick}>
						<button>Interested</button>
					</li>
					<li value='Applied' onClick={handleUpdateStatusClick}>
						<button>Applied</button>
					</li>
					<li value='Interviewing' onClick={handleUpdateStatusClick}>
						<button>Interviewing</button>
					</li>
					<li value='Negotiating' onClick={handleUpdateStatusClick}>
						<button>Negotiating</button>
					</li>
					<li value='Accepted' onClick={handleUpdateStatusClick}>
						<button>Accepted</button>
					</li>
					<li value='Declined' onClick={handleUpdateStatusClick}>
						<button>Declined</button>
					</li>
					<li value='Rejected' onClick={handleUpdateStatusClick}>
						<button>Rejected</button>
					</li>
					<li value='Archived' onClick={handleUpdateStatusClick}>
						<button>Archived</button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default DropdownStageSelect;

// import { useContext, useState } from 'react';
// import styled from 'styled-components';
// import { DatabaseContext } from '../../context/DatabaseContext';
// import { Form } from 'react-bootstrap';
// import useAlert from '../../Custom Hooks/useAlert';
// import { supabase } from '../../API/supabase';

// const DropdownStageSelect = ({ job }) => {
// 	const { fetchUserJobs, fetchUserJobsArchived } = useContext(DatabaseContext);

// 	const { setAlert } = useAlert();
// 	const [selectedStatus, setSelectedStatus] = useState(job.status);

// 	return (
// 		<Wrapper>
// 			<Form>
// 				<Form.Select
// 					size='sm'
// 					aria-label='Select job status'
// 					onChange={handleUpdateStatusClick}
// 					value={selectedStatus}
// 					className={`select ${selectedStatus}`}>
// 					<option value='Interested'>Interested</option>
// 					<option value='Applied'>Applied</option>
// 					<option value='Interviewing'>Interviewing</option>
// 					<option value='Negotiating'>Negotiating</option>
// 					<option value='Accepted'>Accepted</option>
// 					<option value='Declined'>Declined</option>
// 					<option value='Rejected'>Rejected</option>
// 					<option value='Archived'>Archived</option>
// 				</Form.Select>
// 			</Form>
// 		</Wrapper>
// 	);
// };

// const Wrapper = styled.section`
// 	.select {
// 		cursor: pointer;
// 		max-width: 140px;
// 		border: 1px solid var(--grey-400);
// 		color: var(--primary-500);
// 		background-color: var(--grey-100);
// 		border-radius: 90px;
// 		margin-top: 0.5rem;
// 		font-weight: 600;
// 		font-size: 12px;
// 		margin: 0;
// 	}

// 	/*
// 	.Applied {
// 		background-color: var(--primary-50);
// 		color: var(--grey-800);
// 	}

// 	.Interviewing {
// 		background-color: var(--primary-100);
// 		color: var(--grey-800);
// 	}

// 	.Negotiating {
// 		background-color: var(--primary-200);
// 		color: var(--black);
// 	}

// 	.Accepted {
// 		background-color: var(--primary-300);
// 		color: var(--white);
// 	}

// 	.Rejected,
// 	.Declined,
// 	.Archived {
// 		background-color: var(--grey-200);
// 		color: var(--grey-800);
// 	} */
// `;

// export default DropdownStageSelect;
