import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';

const JobsTableRow = (singleJob, handleCheckboxChange) => {
  const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);
  const navigate = useNavigate();

  const handleDeleteJobClick = (e) => {
    e.stopPropagation();
    base('jobs').destroy(singleJob.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      // console.log('Deleted record', deletedRecord.id);
      fetchUserJobs();
    });
  };

  // const handleTableRowClick = async () => {
  //   await fetchCurrentJob(singleJob);
  //   await fetchCurrentSheets(singleJob);
  //   navigate(`/job/id:${singleJob.id}`);
  // };

  return (
    // <tr key={singleJob.fields.id} onClick={handleTableRowClick}>
    <tr key={singleJob.fields.id}>
      <td>
        <Form.Check type='checkbox' onChange={handleCheckboxChange} />
      </td>
      <td>{singleJob.fields.company}</td>
      <td>{singleJob.fields.position}</td>
      <td>
        {singleJob.fields.salary_min && singleJob.fields.salary_max
          ? `$${singleJob.fields.salary_min.toLocaleString()} -
        ${singleJob.fields.salary_max.toLocaleString()}`
          : '-'}
      </td>
      <td>{singleJob.fields.location}</td>
      <td>
        <Badge pill bg='secondary'>
          {singleJob.fields.status}
        </Badge>
      </td>
      <td>{singleJob.fields.edited}</td>
      <td>
        <ModalDeleteConfirmation
          job={singleJob}
          handleDeleteJobClick={handleDeleteJobClick}
        />
      </td>
    </tr>
  );
};

export default JobsTableRow;
