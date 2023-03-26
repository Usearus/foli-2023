import { useContext, useState } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import { Form, Dropdown } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { supabase } from '../API/supabase';

const JobsTableRow = (job) => {
  const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(job.status);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateJobClick = async (e) => {
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

  const handleTableRowClick = async () => {
    await fetchCurrentJob(job);
    await fetchCurrentSheets(job);
    navigate(`/job/id:${job.id}`);
  };

  // Will handle any modal option selected
  const handleSelect = (eventKey) => {
    setSelectedEventKey(eventKey);
    if (eventKey === '1') {
      setShowDeleteModal(true);
    }
  };

  // Will close any modal opened by the dropdown
  const handleCloseReset = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr>
        <td onClick={handleTableRowClick}>{job.company}</td>
        <td onClick={handleTableRowClick}>{job.position}</td>
        <td onClick={handleTableRowClick}>
          {job.salary_min && job.salary_max
            ? `$${job.salary_min.toLocaleString()} -
        ${job.salary_max.toLocaleString()}`
            : '-'}
        </td>
        <td onClick={handleTableRowClick}>{job.location}</td>
        <td>
          <Wrapper>
            <Form>
              <Form.Select
                size='sm'
                aria-label='Select job status'
                onChange={handleUpdateJobClick}
                value={selectedStatus}
                className={`select ${selectedStatus}`}
              >
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
        </td>
        <td onClick={handleTableRowClick}>
          {new Date(job.edited).toLocaleDateString()}
        </td>
        <td>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              id='dropdown'
              variant='link'
              style={{ color: 'var(--grey-800)' }}
            >
              <FiMoreVertical />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='1'>Delete Job</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {showDeleteModal && (
            <ModalDeleteConfirmation
              show={showDeleteModal}
              close={handleCloseReset}
              object={job}
              type='job'
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default JobsTableRow;

const Wrapper = styled.div`
  .select {
    cursor: pointer;
    min-width: 132px;
    border: 1px solid var(--grey-600);
    border-radius: 90px;
  }

  option {
    background-color: var(--white);
    color: var(--grey-900);
  }

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
    background-color: var(--primary-800);
    color: var(--white);
  }
`;
