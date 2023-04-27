import { useContext, useState } from 'react';
import styled from 'styled-components';
import { DatabaseContext } from '../../context/DatabaseContext';
import { Form } from 'react-bootstrap';
import useAlert from '../../Custom Hooks/useAlert';
import { supabase } from '../../API/supabase';

const DropdownStageSelect = ({ job }) => {
	const { fetchUserJobs } = useContext(DatabaseContext);

	const { setAlert } = useAlert();
	const [selectedStatus, setSelectedStatus] = useState(job.status);

	const handleUpdateStatusClick = async (e) => {
		setSelectedStatus(e.target.value);
		const { error } = await supabase
			.from('jobs')
			.update({
				status: e.target.value,
				edited: new Date().toLocaleDateString('en-US'),
			})
			.eq('id', job.id);
		setAlert('Job successfully updated!', 'success');
		fetchUserJobs();

		if (error) {
			setAlert('Something went wrong. Job not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	return (
		<Wrapper>
			<Form>
				<Form.Select
					size='sm'
					aria-label='Select job status'
					onChange={handleUpdateStatusClick}
					value={selectedStatus}
					className={`select ${selectedStatus}`}>
					<option value='Bookmarked'>Bookmarked</option>
					<option value='Applied'>Applied</option>
					<option value='Interviewing'>Interviewing</option>
					<option value='Negotiating'>Negotiating</option>
					<option value='Accepted'>Accepted</option>
					<option value='Declined'>Declined</option>
					<option value='Rejected'>Rejected</option>
					<option value='Archived'>Archived</option>
				</Form.Select>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.select {
		cursor: pointer;
		max-width: 140px;
		border: 1px solid var(--grey-400);
		color: var(--primary-500);
		background-color: var(--grey-100);
		border-radius: 90px;
		margin-top: 0.5rem;
		font-weight: 600;
		font-size: 12px;
		margin: 0;
	}

	/* 
	.Applied {
		background-color: var(--primary-50);
		color: var(--grey-800);
	}

	.Interviewing {
		background-color: var(--primary-100);
		color: var(--grey-800);
	}

	.Negotiating {
		background-color: var(--primary-200);
		color: var(--black);
	}

	.Accepted {
		background-color: var(--primary-300);
		color: var(--white);
	}

	.Rejected,
	.Declined,
	.Archived {
		background-color: var(--grey-200);
		color: var(--grey-800);
	} */
`;

export default DropdownStageSelect;
