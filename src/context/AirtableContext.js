import React, { useState, useEffect } from 'react';
import airtableBase from '../API/base';
// import axios from "axios";

const AirtableContext = React.createContext();

const AirtableProvider = ({ children }) => {
  const base = airtableBase;
  const [sheets, setSheets] = useState([]);
  const [jobs, setJobs] = useState([]);
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

  return (
    <AirtableContext.Provider value={{ sheets, jobs }}>
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
