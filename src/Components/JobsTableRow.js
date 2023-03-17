import { useContext, useState } from 'react';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import { Form, Dropdown } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';

const JobsTableRow = (job) => {
  const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(job.fields.status);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateJobClick = (e) => {
    setSelectedStatus(e.target.value);
    base('jobs').update(
      job.id,
      {
        status: e.target.value,
        edited: new Date().toLocaleDateString('en-US'),
      },
      function (err, record) {
        if (err) {
          console.error(err);
          setAlert('Something went wrong. Job not updated.', 'Danger');
          return;
        }
        // console.log('Job updated', record.getId());
        setAlert('Job successfully updated!', 'success');
        fetchUserJobs();
      }
    );
  };

  const handleTableRowClick = async () => {
    await fetchCurrentJob(job);
    await fetchCurrentSheets(job);
    navigate(`/job/id:${job.fields.jobid}`);
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
        <td onClick={handleTableRowClick}>{job.fields.company}</td>
        <td onClick={handleTableRowClick}>{job.fields.position}</td>
        <td onClick={handleTableRowClick}>
          {job.fields.salary_min && job.fields.salary_max
            ? `$${job.fields.salary_min.toLocaleString()} -
        ${job.fields.salary_max.toLocaleString()}`
            : '-'}
        </td>
        <td onClick={handleTableRowClick}>{job.fields.location}</td>
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
        <td onClick={handleTableRowClick}>{job.fields.edited}</td>
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
              <Dropdown.Item eventKey='1'>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {showDeleteModal && (
            <ModalDeleteConfirmation
              show={showDeleteModal}
              close={handleCloseReset}
              job={job}
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
