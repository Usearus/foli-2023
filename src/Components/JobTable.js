import Table from 'react-bootstrap/Table';
import JobsTableRow from './JobsTableRow';
import Form from 'react-bootstrap/Form';

function JobsTable({ jobs }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check type='checkbox' />
          </th>
          <th>Company</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Location</th>
          <th>Status</th>
          <th>Edited</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((singleJob) => {
          return <JobsTableRow key={singleJob.id} {...singleJob} />;
        })}
      </tbody>
    </Table>
  );
}

export default JobsTable;
