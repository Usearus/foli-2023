import React, { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import useAlert from '../Custom Hooks/useAlert';

// TODO Fix this: JobsTableRow: `key` is not a prop. Trying to access it will result
//      in `undefined` being returned. If you need to access the same value within the
//      child component, you should pass it as a different prop.

const JobsTableRow = (singleJob) => {
  const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const handleDeleteJobClick = (e) => {
    e.stopPropagation();
    base('jobs').destroy(singleJob.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
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
          <Badge pill bg='secondary'>
            {singleJob.fields.status}
          </Badge>
        </td>
        <td onClick={handleTableRowClick}>{singleJob.fields.edited}</td>
        <td>
          <ModalDeleteConfirmation
            deleteFunction={handleDeleteJobClick}
            type={'job'}
          />
        </td>
      </tr>
    </>
  );
};

export default JobsTableRow;
