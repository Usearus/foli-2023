import Table from 'react-bootstrap/Table';
import JobsTableRow from './JobsTableRow';
import styled from 'styled-components';

function JobsTable({ jobs }) {
  return (
    <Wrapper>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Status</th>
            <th>Edited</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((singleJob) => {
            return <JobsTableRow key={singleJob.id} {...singleJob} />;
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default JobsTable;

const Wrapper = styled.div`
  padding: 2rem 2rem;

  .table tbody:hover {
    cursor: pointer;
  }
`;
