import React, { useState, useEffect } from 'react';
import airtableBase from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
// import axios from "axios";

const AirtableContext = React.createContext();

const AirtableProvider = ({ children }) => {
  // AIRTABLE ONLY
  const base = airtableBase;
  const [sheets, setSheets] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    base('sheets')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setSheets(records);
        console.log('sheets', records);
        fetchNextPage();
      });
  }, [base]);

  useEffect(() => {
    base('jobs')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setJobs(records);
        console.log('jobs', records);
        fetchNextPage();
      });
  }, [base]);

  useEffect(() => {
    base('profiles')
      .select({ view: 'Grid view' })
      .eachPage(function page(records, fetchNextPage) {
        setProfiles(records);
        console.log('profiles', records);
        fetchNextPage();
      });
  }, [base]);

  console.log('test', profiles);

  // FIND AUTH0 EMAIL
  const { user } = useAuth0();
  const [auth0Email, setAuth0Email] = useState(null);

  useEffect(() => {
    if (user) {
      setAuth0Email(user.email);
    }
  }, [user]);

  // FIND AIRTABLE ROW WITH EMAIL THAT MATCHES AUTH0 EMAIL
  const findUserProfile = (auth0Email, profiles) => {
    return profiles.find((profile) => profile.fields.account === auth0Email);
  };

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (auth0Email && profiles.length > 0) {
      const matchingProfile = findUserProfile(auth0Email, profiles);
      setUserProfile(matchingProfile);
    }
  }, [auth0Email, profiles]);

  console.log('userProfile', userProfile);

  const selectedJob = jobs[0];

  return (
    <AirtableContext.Provider
      value={{ sheets, jobs, selectedJob, userProfile }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
