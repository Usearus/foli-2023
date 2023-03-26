import { createContext, useState, useEffect } from 'react';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from '../API/supabase';

const AirtableContext = createContext();

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
  const [allTemplates, setAllTemplates] = useState([]);

  // FETCH ALL AIRTABLE DATA

  // const fetchAllSheets = async () => {
  //   await base('sheets')
  //     .select({ view: 'Grid view' })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setAllSheets(records);
  //       // console.log('all sheets', records);
  //       fetchNextPage();
  //     });
  // };

  // const fetchAllJobs = async () => {
  //   await base('jobs')
  //     .select({ view: 'Grid view' })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setAllJobs(records);
  //       // console.log('all jobs', records);
  //       fetchNextPage();
  //     });
  // };

  // const fetchAllProfiles = async () => {
  //   await base('profiles')
  //     .select({ view: 'Grid view' })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setAllProfiles(records);
  //       // console.log('all profiles', records);
  //       fetchNextPage();
  //     });
  // };

  // const fetchAllTemplates = async () => {
  //   await base('templates')
  //     .select({ view: 'Grid view' })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setAllTemplates(records);
  //       setCurrentTemplates(records);
  //       // console.log('all templates', records);
  //       fetchNextPage();
  //     });
  // };

  async function fetchAllSheets() {
    const { data, error } = await supabase.from('sheets').select('*');
    // console.log('allSheets are', data);
    setAllSheets(data);
    if (error) {
      console.log(error);
    }
  }

  async function fetchAllJobs() {
    const { data, error } = await supabase.from('jobs').select('*');
    // console.log('allJobs are', data);
    setAllJobs(data);
    if (error) {
      console.log(error);
    }
  }

  async function fetchAllProfiles() {
    const { data, error } = await supabase.from('profiles').select('*');
    // console.log('allProfiles are', data);
    setAllProfiles(data);
    if (error) {
      console.log(error);
    }
  }

  async function fetchAllTemplates() {
    const { data, error } = await supabase.from('templates').select('*');
    // console.log('allTemplates are', data);
    setAllTemplates(data);
    setCurrentTemplates(data);
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSheets();
    fetchAllJobs();
    fetchAllProfiles();
    fetchAllTemplates();
  }, []);

  // *
  // *
  // SET USER AIRTABLE DATA
  const [userProfile, setUserProfile] = useState(null);
  const [userJobs, setUserJobs] = useState(null);
  const [userSheets, setUserSheets] = useState(null);

  // FIND ALL USER AIRTABLE DATA
  // const fetchUserProfile = async () => {
  //   if (auth0Email) {
  //     const [record] = await base('profiles')
  //       .select({
  //         maxRecords: 1,
  //         filterByFormula: `{account} = '${auth0Email}'`,
  //       })
  //       .firstPage();
  //     if (record) {
  //       setUserProfile(record);
  //     } else {
  //       createUserProfile();
  //       const onboardingJob = await createOnboardingJob();
  //       const onboardingSheets = await createOnboardingSheets(onboardingJob.id);
  //     }
  //   }
  // };

  // const fetchUserJobs = async () => {
  //   if (auth0Email) {
  //     await base('jobs')
  //       .select({
  //         view: 'Grid view',
  //         filterByFormula: `{account} = '${auth0Email}'`,
  //       })
  //       .eachPage(function page(records, fetchNextPage) {
  //         setUserJobs(records);
  //         // console.log('userJobs are', records);
  //         fetchNextPage();
  //       });
  //   }
  // };

  // const fetchUserSheets = async () => {
  //   if (auth0Email) {
  //     await base('sheets')
  //       .select({
  //         view: 'Grid view',
  //         filterByFormula: `{account} = '${auth0Email}'`,
  //       })
  //       .eachPage(function page(records, fetchNextPage) {
  //         setUserSheets(records);
  //         // console.log('userSheets are', records);
  //         fetchNextPage();
  //       });
  //   }
  // };

  async function fetchUserProfile() {
    if (auth0Email) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .filter('email', 'eq', auth0Email)
        .single();
      if (data) {
        setUserProfile(data);
        // console.log('userProfile is', data);
      } else {
        createUserProfile();
        const onboardingJob = await createOnboardingJob();
        const onboardingSheets = await createOnboardingSheets(onboardingJob.id);
      }
    }
  }

  // TODO
  const createUserProfile = async () => {
    if (auth0Email) {
      const newRecord = { account: auth0Email };
      const createdRecord = await base('profiles').create(newRecord);
      if (createdRecord) {
        setUserProfile(createdRecord);
        // setNewUser(true);
        fetchUserProfile();
      }
      // console.log('new userProfile created', createdRecord.id);
    }
  };

  // TODO

  const createOnboardingJob = async () => {
    try {
      const onboardingJob = await base('jobs').create([
        {
          fields: {
            account: user.email,
            company: 'Foli',
            position: 'Tutorial',
            salary_min: 45000,
            salary_max: 55000,
            location: 'Dallas, TX',
            status: 'Interviewing',
            edited: new Date().toLocaleDateString('en-US'),
          },
        },
      ]);
      console.log('onboardingJob.id', onboardingJob.id);
      return onboardingJob[0]; // return the created job object
    } catch (err) {
      console.error(err);
    }
  };

  // TODO
  const createOnboardingSheets = async (onboardingJobId) => {
    try {
      const onboardingSheets = await base('sheets').create([
        {
          fields: {
            title: 'Foli Tutorial',
            content: '<h3>Learn Foli</h3>',
            account: user.email,
            jobid: [onboardingJobId],
          },
        },
        // {
        //   fields: {
        //     title: 'Sheet 2',
        //     content: '<h2>Sheet 2 Content</h2>',
        //     account: user.email,
        //     jobid: [onboardingJobId],
        //   },
        // },
      ]);

      for (const sheet of onboardingSheets) {
        console.log(sheet.getId());
      }

      fetchUserJobs(); // call fetchUserJobs() after creating the sheets
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchUserJobs() {
    if (auth0Email) {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .filter('account', 'eq', auth0Email);
      if (data) {
        setUserJobs(data);
        // console.log('userJobs are', data);
      }
    }
  }

  async function fetchUserSheets() {
    if (auth0Email) {
      const { data } = await supabase
        .from('sheets')
        .select('*')
        .filter('account', 'eq', auth0Email);
      if (data) {
        setUserSheets(data);
        // console.log('userSheets are', data);
      }
    }
  }

  useEffect(() => {
    fetchUserProfile();
    fetchUserJobs();
    fetchUserSheets();

    return () => {
      // Cleanup // TODO figure out how to fix this useEffect issue
    };
  }, [auth0Email]);

  // *
  // *
  // SET CURRENTLY VIEWED JOB DATA
  const [currentSheets, setCurrentSheets] = useState([]);
  const [currentJob, setCurrentJob] = useState([]);
  // Needed to conditionally show position sheet by visibility toggle
  const [positionSheet, setPositionSheet] = useState(true);

  // const fetchCurrentJob = async (job) => {
  //   console.log('job received for fetch:', job);
  //   const jobId = job.fields.jobid;
  //   if (jobId) {
  //     // This is array destructuring and I can assign first item of array to the variable
  //     const [record] = await base('jobs')
  //       .select({
  //         maxRecords: 1,
  //         filterByFormula: `{jobid} = '${jobId}'`,
  //       })
  //       .firstPage();
  //     setCurrentJob(record);
  //     console.log('currentJob is', record);
  //     localStorage.setItem('currentJob', JSON.stringify(record));
  //   }
  // };

  // const fetchCurrentSheets = async (job) => {
  //   // console.log('job received:', job);
  //   const jobJobId = job.fields.jobid;
  //   if (jobJobId) {
  //     await base('sheets')
  //       .select({
  //         view: 'Grid view',
  //         filterByFormula: `{jobid} = '${jobJobId}'`,
  //       })
  //       .eachPage(function page(records, fetchNextPage) {
  //         setCurrentSheets(records);
  //         fetchNextPage();
  //         console.log('currentSheets are', records);
  //         localStorage.setItem('currentSheets', JSON.stringify(records));
  //       });
  //   }
  // };

  async function fetchCurrentJob(job) {
    // console.log('job received for fetch:', job);
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .filter('id', 'eq', job.id)
      .single();
    if (data) {
      setCurrentJob(data);
      // console.log('currentJob is', data);
      localStorage.setItem('currentJob', JSON.stringify(data));
      console.log('currentJob is', data);
    }
  }

  async function fetchCurrentSheets(job) {
    // console.log('job received for fetch:', job);
    const { data } = await supabase
      .from('sheets')
      .select('*')
      .filter('jobid', 'eq', job.id);
    if (data) {
      setCurrentSheets(data);
      // console.log('currentSheets are', data);
      localStorage.setItem('currentSheets', JSON.stringify(data));
    }
  }

  // *
  // *
  // SET CURRENTLY VIEWED TEMPLATE DATA
  const [currentTemplates, setCurrentTemplates] = useState(allTemplates);
  const [previewTemplate, setPreviewTemplate] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);

  // const fetchTemplatesByCategory = async (category) => {
  //   // console.log('category received:', category);
  //   await base('templates')
  //     .select({
  //       view: 'Grid view',
  //       filterByFormula: `{category} = '${category}'`,
  //     })
  //     .eachPage(function page(records, fetchNextPage) {
  //       setCurrentTemplates(records);
  //       fetchNextPage();
  //       console.log('currentTemplates are', records);
  //     });
  // };

  async function fetchTemplatesByCategory(category) {
    // console.log('category received:', category);
    const { data } = await supabase
      .from('templates')
      .select('*')
      .filter('category', 'eq', category);
    if (data) {
      setCurrentTemplates(data);
      // console.log('currentTemplates are', data);
    }
  }

  return (
    <AirtableContext.Provider
      value={{
        //Sheets
        allSheets,
        userSheets,
        currentSheets,
        positionSheet,
        fetchAllSheets,
        setCurrentSheets,
        fetchCurrentSheets,
        setPositionSheet,
        //Jobs
        allJobs,
        userJobs,
        currentJob,
        setAllJobs,
        fetchAllJobs,
        fetchUserJobs,
        setCurrentJob,
        fetchCurrentJob,
        //Profiles
        allProfiles,
        userProfile,
        fetchUserProfile,
        //Templates
        currentTemplates,
        allTemplates,
        setAllTemplates,
        fetchTemplatesByCategory,
        setCurrentTemplates,
        fetchAllTemplates,
        activeTemplate,
        previewTemplate,
        setPreviewTemplate,
        setActiveTemplate,
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export { AirtableProvider, AirtableContext };
