import React, { useContext } from 'react';
import JobsTable from '../Components/JobTable';
import { AirtableContext } from '../context/AirtableContext';
import TopBarTable from '../Components/TopBarTable';

export const JobsPage = () => {
  const { userJobs } = useContext(AirtableContext);

  if (userJobs) {
    return (
      <>
        <TopBarTable />
        <JobsTable jobs={userJobs || 'no jobs yet'} />
      </>
    );
  }
  return (
    <>
      <TopBarTable />
      <h1>No Jobs Added Yet</h1>
    </>
  );
};
export default JobsPage;
