import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import JobsTableRow from './JobsTableRow';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { AirtableContext } from '../context/AirtableContext';

function JobsTable({ jobs }) {
  const {
    checkedCount,
    setCheckedCount,
    batchActionsVisible,
    setBatchActionsVisible,
  } = useContext(AirtableContext);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const increment = isChecked ? 1 : -1;
    setCheckedCount((prevCount) => prevCount + increment);
    setBatchActionsVisible(checkedCount + increment > 0);
  };

  return (
    <Wrapper>
      {batchActionsVisible && (
        <div>
          <p>{checkedCount} jobs selected</p>
          <button>Batch Action 1</button>
          <button>Batch Action 2</button>
        </div>
      )}
      {/* {batchActionsVisible ? (
        <>
          <h1>Job is checked</h1>
        </>
      ) : (
        <></>
      )} */}
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <Form.Check type='checkbox' onChange={handleCheckboxChange} />
            </th>
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
            return (
              <JobsTableRow
                key={singleJob.id}
                {...singleJob}
                handleCheckboxChange={handleCheckboxChange}
              />
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default JobsTable;

const Wrapper = styled.div`
  padding: 2rem 2rem;
`;
