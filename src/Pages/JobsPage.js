import React from 'react';
import JobsTable from '../Components/JobTable';
import { AirtableContext } from '../context/AirtableContext';
import TopBarTable from '../Components/TopBarTable';

export const JobsPage = () => {
  const { jobs } = React.useContext(AirtableContext);
  const thisUsersJobs = jobs;
  console.log('thisUsersJobs', thisUsersJobs);

  return (
    <>
      <TopBarTable />
      <JobsTable jobs={thisUsersJobs} />
    </>
  );
};

export default JobsPage;
