import React from 'react';
import JobsTable from '../Components/JobTable';
import { AirtableContext } from '../context/AirtableContext';

export const JobsPage = () => {
  const { jobs } = React.useContext(AirtableContext);
  const thisUsersJobs = jobs;
  console.log('thisUsersJobs', thisUsersJobs);

  return (
    <>
      <JobsTable jobs={thisUsersJobs} />
    </>
  );
};

export default JobsPage;
