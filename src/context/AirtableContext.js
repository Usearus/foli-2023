import React, { useState, useEffect, useMemo } from 'react';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';

const AirtableContext = React.createContext();

const AirtableProvider = ({ children }) => {
  // USER AUTH0 EMAIL
  const { user } = useAuth0();
  const [auth0Email, setAuth0Email] = useState(null);

  // USEEFFECT TO SET USER EMAIL
  useEffect(
    function effectSetAuth0Email() {
      if (user) {
        setAuth0Email(user.email);
      }
    },
    [user]
  );

  // ALL AIRTABLE DATA
  const [allSheets, setAllSheets] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);

  // FETCH ALL AIRTABLE DATA
  const fetchAllSheets = async () => {
    await base('sheets')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllSheets(records);
        // console.log('all sheets', records);
        fetchNextPage();
      });
  };

  const fetchAllJobs = async () => {
    await base('jobs')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllJobs(records);
        // console.log('all jobs', records);
        fetchNextPage();
      });
  };

  const fetchAllProfiles = async () => {
    await base('profiles')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllProfiles(records);
        console.log('all profiles', records);
        fetchNextPage();
      });
  };

  useEffect(() => {
    fetchAllSheets();
  }, []);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  // *
  // *
  // *
  // *
  // SET USER AIRTABLE DATA
  const [userProfile, setUserProfile] = useState(null);
  const [userJobs, setUserJobs] = useState(null);
  const [userSheets, setUserSheets] = useState(null);

  // FIND ALL USER AIRTABLE DATA
  const fetchUserProfile = async () => {
    if (auth0Email) {
      // This is array destructuring and I can assign first item of array to the variable
      const [record] = await base('profiles')
        .select({
          maxRecords: 1,
          filterByFormula: `{account} = '${auth0Email}'`,
        })
        .firstPage();
      setUserProfile(record);
      console.log('userProfile is', record);
    }
  };

  const fetchUserJobs = async () => {
    if (auth0Email) {
      await base('jobs')
        .select({
          view: 'Grid view',
          filterByFormula: `{account} = '${auth0Email}'`,
        })
        .eachPage(function page(records, fetchNextPage) {
          setUserJobs(records);
          // console.log('userJobs are', records);
          fetchNextPage();
        });
    }
  };

  const fetchUserSheets = async () => {
    if (auth0Email) {
      await base('sheets')
        .select({
          view: 'Grid view',
          filterByFormula: `{account} = '${auth0Email}'`,
        })
        .eachPage(function page(records, fetchNextPage) {
          setUserSheets(records);
          // console.log('userSheets are', records);
          fetchNextPage();
        });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [auth0Email]);

  useEffect(() => {
    fetchUserJobs();
  }, [auth0Email]);

  useEffect(() => {
    fetchUserSheets();
  }, [auth0Email]);

  // *
  // *
  // SET CURRENTLY VIEWED JOB DATA
  const [currentSheets, setCurrentSheets] = useState([]);
  const [currentJob, setCurrentJob] = useState([]);

  const fetchCurrentJob = async (job) => {
    console.log('job received for fetch:', job);
    const jobId = job.fields.jobid;
    if (jobId) {
      // This is array destructuring and I can assign first item of array to the variable
      const [record] = await base('jobs')
        .select({
          maxRecords: 1,
          filterByFormula: `{jobid} = '${jobId}'`,
        })
        .firstPage();
      setCurrentJob(record);
      console.log('currentJob is', record);
      localStorage.setItem('currentJob', JSON.stringify(record));
    }
  };

  const fetchCurrentSheets = async (job) => {
    console.log('job received:', job);
    const jobJobId = job.fields.jobid;
    if (jobJobId) {
      await base('sheets')
        .select({
          view: 'Grid view',
          filterByFormula: `{jobid} = '${jobJobId}'`,
        })
        .eachPage(function page(records, fetchNextPage) {
          setCurrentSheets(records);
          fetchNextPage();
          console.log('currentSheets are', records);
          localStorage.setItem('currentSheets', JSON.stringify(records));
        });
    }
  };

  return (
    <AirtableContext.Provider
      value={{
        allSheets,
        allJobs,
        userProfile,
        userJobs,
        userSheets,
        currentJob,
        currentSheets,
        setCurrentJob, // Use the memoized setCurrentJob
        setCurrentSheets,
        setAllJobs,
        fetchAllJobs,
        fetchAllSheets,
        fetchCurrentSheets,
        fetchCurrentJob,
        fetchUserJobs,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
