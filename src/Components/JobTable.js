import Table from 'react-bootstrap/Table';
import JobsTableRow from './JobsTableRow';
import styled from 'styled-components';

const JobsTable = ({ jobs }) => {
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
          {jobs.map((job) => {
            return <JobsTableRow key={job.id} {...job} />;
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default JobsTable;

const Wrapper = styled.div`
  padding: 2rem 2rem;

  .table tbody:hover {
    cursor: pointer;
  }
`;
