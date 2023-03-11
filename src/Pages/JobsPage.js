import { useContext } from 'react';
import JobsTable from '../Components/JobTable';
import { AirtableContext } from '../context/AirtableContext';
import TopBarTable from '../Components/TopBarTable';
import Loader from '../Components/Loader';

const JobsPage = () => {
  const { userJobs } = useContext(AirtableContext);

  if (userJobs) {
    return (
      <>
        <TopBarTable />
        <JobsTable jobs={userJobs} />
      </>
    );
  }
  return (
    <>
      <Loader />
    </>
  );
};
export default JobsPage;
