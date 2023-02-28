import React, { useState, useEffect, useCallback } from 'react';
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
        console.log('all sheets', records);
        fetchNextPage();
      });
  };

  const fetchAllJobs = async () => {
    await base('jobs')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllJobs(records);
        console.log('all jobs', records);
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
      await base('profiles')
        .select({
          view: 'Grid view',
          filterByFormula: `{account} = '${auth0Email}'`,
        })
        .eachPage(function page(records, fetchNextPage) {
          setUserProfile(records);
          console.log('userProfile is', records);
          fetchNextPage();
        });
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
          console.log('userJobs are', records);
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
          console.log('userSheets are', records);
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
          console.log('currentSheets are', records);
          fetchNextPage();
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
        setCurrentJob,
        currentSheets,
        setCurrentSheets,
        setAllJobs,
        fetchAllJobs,
        fetchAllSheets,
        fetchCurrentSheets,
        fetchUserJobs,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
