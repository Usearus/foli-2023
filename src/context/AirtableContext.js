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
  // const fetchAllSheets = () => {
  //   base('sheets')
  //     .select({ view: 'Grid view' })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setAllSheets(records);
  //       console.log('all sheets', records);
  //       fetchNextPage();
  //     });
  // };

  const fetchAllSheets = () => {
    return new Promise((resolve, reject) => {
      base('sheets')
        .select({ view: 'Grid view' })
        .all()
        .then((records) => {
          setAllSheets(records);
          console.log('all sheets', records);
          resolve();
        })
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    });
  };

  const fetchAllJobs = () => {
    return new Promise((resolve, reject) => {
      base('jobs')
        .select({ view: 'Grid view' })
        .all()
        .then((records) => {
          setAllJobs(records);
          console.log('all jobs', records);
          resolve();
        })
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    });
  };

  const fetchAllProfiles = () => {
    base('profiles')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllProfiles(records);
        // console.log('all profiles', records);
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
  useEffect(
    function effectFindUserProfile() {
      if (auth0Email && allProfiles.length > 0) {
        const findUserProfile = (auth0Email, allProfiles) => {
          return allProfiles.find(
            (profile) => profile.fields.account === auth0Email
          );
        };
        const matchingProfile = findUserProfile(auth0Email, allProfiles);
        setUserProfile(matchingProfile);
        // console.log('context userProfile', userProfile);
      }
    },
    [auth0Email, allProfiles, userProfile]
  );

  useEffect(
    function effectFindUserJobs() {
      if (auth0Email && allJobs.length > 0) {
        const findUserJobs = (auth0Email, allJobs) => {
          return allJobs.filter((job) => job.fields.account === auth0Email);
        };
        const matchingJobs = findUserJobs(auth0Email, allJobs);
        setUserJobs(matchingJobs);
      }
    },
    [auth0Email, allJobs]
  );
  // console.log('context userJobs', userJobs);

  useEffect(
    function effectFindUserSheets() {
      if (auth0Email && allSheets.length > 0) {
        const findUserSheets = (auth0Email, allSheets) => {
          return allSheets.filter(
            (sheet) => sheet.fields.account === auth0Email
          );
        };
        const matchingSheets = findUserSheets(auth0Email, allSheets);
        setUserSheets(matchingSheets);
      }
    },
    [auth0Email, allSheets]
  );
  console.log('context userSheets', userSheets);

  // I TRIED ANOTHER WAY TO GATHER USER SHEETS BY BYPASSING ALL SHEETS. NOT REALLY WORKING.
  // const fetchUserSheets = useCallback(async () => {
  //   if (auth0Email) {
  //     const records = await base('sheets')
  //       .select({
  //         view: 'Grid view',
  //         filterByFormula: `{account} = '${auth0Email}'`,
  //       })
  //       .all();
  //     console.log('fetch userSheets', records);
  //     setUserSheets(records);
  //     return records;
  //   }
  // }, [auth0Email]);

  // *
  // *
  // SET CURRENTLY VIEWED JOB DATA
  const [currentSheets, setCurrentSheets] = useState([]);
  const [currentJob, setCurrentJob] = useState([]);

  const findCurrentSheets = (job) => {
    console.log('currentSheets before match', currentSheets);
    console.log('job received:', job);
    console.log('userSheets received:', userSheets);
    const jobSheetIds = job.fields.sheets;
    if (jobSheetIds && allSheets) {
      const matchingSheets = allSheets.filter((sheet) =>
        jobSheetIds.some((id) => id === sheet.id)
      );
      console.log('Matching Sheets', matchingSheets);
      setCurrentSheets(matchingSheets);
    } else {
      return setCurrentSheets([]);
    }
  };
  useEffect(() => {
    console.log('updated currentSheets', currentSheets);
  }, [allSheets, currentSheets]);

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
        findCurrentSheets,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
