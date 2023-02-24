import React, { useState, useEffect } from 'react';
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
  // SET USER AIRTABLE DATA
  const [userProfile, setUserProfile] = useState(null);
  const [userJobs, setUserJobs] = useState(null);
  const [userSheets, setUserSheets] = useState(null);
  // SET CURRENTLY VIEWED JOB DATA
  const [currentSheets, setCurrentSheets] = useState([]);
  const [currentJob, setCurrentJob] = useState([]);

  // USEEFFECTS TO SET & UPDATE ALL AIRTABLE DATA
  const fetchAllSheets = () => {
    base('sheets')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllSheets(records);
        console.log('all sheets', records);
        fetchNextPage();
      });
  };

  const fetchAllJobs = () => {
    base('jobs')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setAllJobs(records);
        console.log('all jobs', records);
        fetchNextPage();
      });
  };

  const fetchAllProfiles = () => {
    base('profiles')
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

  // USEEFFECT TO FILTER AIRTABLE INFO BASED ON USER
  useEffect(
    function effectFindUserProfile() {
      const findUserProfile = (auth0Email, allProfiles) => {
        return allProfiles.find(
          (profile) => profile.fields.account === auth0Email
        );
      };

      if (auth0Email && allProfiles.length > 0) {
        const matchingProfile = findUserProfile(auth0Email, allProfiles);
        setUserProfile(matchingProfile);
      }
    },
    [auth0Email, allProfiles]
  );

  useEffect(
    function effectFindUserJobs() {
      const findUserJobs = (auth0Email, allJobs) => {
        return allJobs.filter((job) => job.fields.account === auth0Email);
      };
      if (auth0Email && allJobs.length > 0) {
        const matchingJobs = findUserJobs(auth0Email, allJobs);
        setUserJobs(matchingJobs);
      }
    },
    [auth0Email, allJobs]
  );

  useEffect(
    function effectFindUserSheets() {
      const findUserSheets = (auth0Email, allSheets) => {
        return allSheets.filter((sheet) => sheet.fields.account === auth0Email);
      };

      if (auth0Email && allSheets.length > 0) {
        const matchingSheets = findUserSheets(auth0Email, allSheets);
        setUserSheets(matchingSheets);
      }
    },
    [auth0Email, allSheets]
  );

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
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
