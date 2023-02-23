import React, { useState, useEffect } from 'react';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';

const AirtableContext = React.createContext();

const AirtableProvider = ({ children }) => {
  // ..
  // ..
  // AIRTABLE ONLY
  const [allSheets, setAllSheets] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    base('sheets')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllSheets(records);
        console.log('all sheets', records);
        fetchNextPage();
      });
  }, []);

  useEffect(() => {
    base('jobs')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllJobs(records);
        console.log('all jobs', records);
        fetchNextPage();
      });
  }, []);

  useEffect(() => {
    base('profiles')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllProfiles(records);
        console.log('all profiles', records);
        fetchNextPage();
      });
  }, []);

  // ..
  // ..
  // ..
  // SET AUTH0 EMAIL
  const { user } = useAuth0();
  const [auth0Email, setAuth0Email] = useState(null);

  // USEEFFECT TO SET USER
  useEffect(() => {
    if (user) {
      setAuth0Email(user.email);
    }
  }, [user]);

  // ..
  // ..
  // ..
  // FIND USER AIRTABLE INFO BASED ON EMAIL
  const [userProfile, setUserProfile] = useState(null);
  const [userJobs, setUserJobs] = useState(null);
  const [userSheets, setUserSheets] = useState(null);

  // USEEFFECT TO FILTER AIRTABLE INFO BASED ON USER
  useEffect(() => {
    const findUserProfile = (auth0Email, allProfiles) => {
      return allProfiles.find(
        (profile) => profile.fields.account === auth0Email
      );
    };

    const findUserJobs = (auth0Email, allJobs) => {
      return allJobs.filter((job) => job.fields.account === auth0Email);
    };

    const findUserSheets = (auth0Email, allSheets) => {
      return allSheets.filter((sheet) => sheet.fields.account === auth0Email);
    };

    if (auth0Email && allProfiles.length > 0) {
      const matchingProfile = findUserProfile(auth0Email, allProfiles);
      setUserProfile(matchingProfile);
    }
    if (auth0Email && allJobs.length > 0) {
      const matchingJobs = findUserJobs(auth0Email, allJobs);
      setUserJobs(matchingJobs);
    }
    if (auth0Email && allSheets.length > 0) {
      const matchingSheets = findUserSheets(auth0Email, allSheets);
      setUserSheets(matchingSheets);
    }
  }, [auth0Email, allProfiles, allJobs, allSheets]);

  // **********************
  // THIS INCLUDES TEMP CURRENT JOB UNTIL WE CODE IN THE CONNECTOR
  // **********************
  const [currentSheets, setCurrentSheets] = useState([]);
  // const [currentJob, setCurrentJob] = useState([]);
  const currentJob = userJobs && userJobs.length > 0 ? userJobs[1] : null;

  // USEEFFECT TO SET CURRENT SHEETS BASED ON CURRENT JOB
  useEffect(() => {
    const findCurrentSheets = (currentJob, userSheets) => {
      const sheetIds = currentJob.fields.sheets;
      if (userSheets) {
        return userSheets.filter((sheet) =>
          sheetIds.some((id) => id === sheet.id)
        );
      } else {
        return [];
      }
    };
    if (currentJob) {
      const matchingSheets = findCurrentSheets(currentJob, userSheets);
      setCurrentSheets(matchingSheets);
    }
  }, [currentJob, userSheets]);

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
        setAllJobs,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
