import React, { useContext, useState } from 'react';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import { Form } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';

// TODO Fix this: JobsTableRow: `key` is not a prop. Trying to access it will result
//      in `undefined` being returned. If you need to access the same value within the
//      child component, you should pass it as a different prop.

const JobsTableRow = (singleJob) => {
  const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState(singleJob.fields.status);

  const handleUpdateJobClick = (e) => {
    setSelectedStatus(e.target.value);
    base('jobs').update(
      singleJob.id,
      {
        status: e.target.value,
        // edited: new Date().toLocaleDateString('en-US'),
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

  const handleDeleteJobClick = (e) => {
    base('jobs').destroy(singleJob.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        setAlert('Something went wrong. Job not deleted.', 'Danger');
        return;
      }
      // console.log('Deleted record', deletedRecord.id);
      setAlert('Job successfully deleted!', 'success');
      fetchUserJobs();
    });
  };

  const handleTableRowClick = async () => {
    await fetchCurrentJob(singleJob);
    await fetchCurrentSheets(singleJob);
    navigate(`/job/id:${singleJob.id}`);
  };

  return (
    <>
      <tr>
        <td onClick={handleTableRowClick}>{singleJob.fields.company}</td>
        <td onClick={handleTableRowClick}>{singleJob.fields.position}</td>
        <td onClick={handleTableRowClick}>
          {singleJob.fields.salary_min && singleJob.fields.salary_max
            ? `$${singleJob.fields.salary_min.toLocaleString()} -
        ${singleJob.fields.salary_max.toLocaleString()}`
            : '-'}
        </td>
        <td onClick={handleTableRowClick}>{singleJob.fields.location}</td>
        <td>
          <Wrapper>
            <Form>
              <Form.Select
                size='sm'
                aria-label='Select job status'
                onChange={handleUpdateJobClick}
                value={selectedStatus}
                className='select'
              >
                <option value='Bookmarked'>Bookmarked</option>
                <option value='Applied'>Applied</option>
                <option value='Interviewing'>Interviewing</option>
                <option value='Accepted'>Accepted</option>
                <option value='Negotiating'>Negotiating</option>
                <option value='Declined'>Declined</option>
                <option value='Rejected'>Rejected</option>
                <option value='Archived'>Archived</option>
              </Form.Select>
            </Form>
          </Wrapper>
        </td>
        <td onClick={handleTableRowClick}>{singleJob.fields.edited}</td>
        <td>
          <ModalDeleteConfirmation
            deleteFunction={handleDeleteJobClick}
            type='job'
          />
        </td>
      </tr>
    </>
  );
};

export default JobsTableRow;

const Wrapper = styled.div`
  .select {
    min-width: 130px;
    border: 0;
    background-color: #f8f9fa;
  }
`;
