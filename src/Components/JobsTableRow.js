import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { FiTrash } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useNavigate } from 'react-router-dom';

const JobsTableRow = (singleJob) => {
  const { fetchAllJobs, setCurrentJob, findCurrentSheets } =
    useContext(AirtableContext);

  const navigate = useNavigate();

  const handleDeleteJobClick = (event) => {
    event.stopPropagation();
    base('jobs').destroy(singleJob.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted record', deletedRecord.id);
      fetchAllJobs();
    });
  };

  const openJob = (singleJob) => {
    setCurrentJob(singleJob);
    findCurrentSheets(singleJob);
    navigate(`/job/${singleJob.id}`);
  };

  const handleTableRowClick = () => {
    openJob(singleJob);
  };

  return (
    <tr key={singleJob.fields.id} onClick={handleTableRowClick}>
      <td>
        <Form.Check type='checkbox' />
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
        <Button variant='light' onClick={handleDeleteJobClick}>
          <FiTrash />
        </Button>
      </td>
    </tr>
  );
};

export default JobsTableRow;

// import React, { useContext } from 'react';
// import Form from 'react-bootstrap/Form';
// import Badge from 'react-bootstrap/Badge';
// import { FiTrash } from 'react-icons/fi';
// import { Button } from 'react-bootstrap';
// import base from '../API/base';
// import { AirtableContext } from '../context/AirtableContext';
// import { useNavigate } from 'react-router-dom';

// const JobsTableRow = (singleJob) => {
//   const { fetchAllJobs, setCurrentJob, setCurrentSheets, userSheets } =
//     useContext(AirtableContext);

//   const navigate = useNavigate();

//   const handleDeleteJobClick = () => {
//     base('jobs').destroy(singleJob.id, function (err, deletedRecord) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log('Deleted record', deletedRecord.id);
//       fetchAllJobs();
//     });
//   };

//   const findCurrentSheets = () => {
//     const jobSheetIds = singleJob.fields.sheets;
//     if (jobSheetIds) {
//       const matchingSheets = userSheets.filter((sheet) =>
//         jobSheetIds.some((id) => id === sheet.id)
//       );
//       setCurrentSheets(matchingSheets);
//     } else {
//       return setCurrentSheets([]);
//     }
//   };

//   const handleOpenJobClick = (singleJob) => {
//     setCurrentJob(singleJob);
//     navigate(`/job/${singleJob.id}`);
//     findCurrentSheets();
//   };

//   return (
//     <tr key={singleJob.fields.id} onClick={() => handleOpenJobClick(singleJob)}>
//       <td>
//         <Form.Check type='checkbox' />
//       </td>
//       <td>{singleJob.fields.company}</td>
//       <td>{singleJob.fields.position}</td>
//       <td>
//         {singleJob.fields.salary_min && singleJob.fields.salary_max
//           ? `$${singleJob.fields.salary_min.toLocaleString()} -
//         ${singleJob.fields.salary_max.toLocaleString()}`
//           : '-'}
//       </td>
//       <td>{singleJob.fields.location}</td>
//       <td>
//         <Badge pill bg='secondary'>
//           {singleJob.fields.status}
//         </Badge>
//       </td>
//       <td>{singleJob.fields.edited}</td>
//       <td>
//         <Button variant='light' onClick={handleDeleteJobClick}>
//           <FiTrash />
//         </Button>
//       </td>
//     </tr>
//   );
// };

// export default JobsTableRow;
