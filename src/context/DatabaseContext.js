import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from '../API/supabase';

const DatabaseContext = createContext();

const DatabaseProvider = ({ children }) => {
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

    // ALL DATA
    const [allSheets, setAllSheets] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const [allTemplates, setAllTemplates] = useState([]);

    // FETCH ALL DATA

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
    // SET USER DATA
    const [userProfile, setUserProfile] = useState(null);
    const [userJobs, setUserJobs] = useState(null);
    const [userSheets, setUserSheets] = useState(null);

    // FIND ALL USER DATA
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
                await createOnboardingSheets(onboardingJob);
                fetchUserJobs();
            }
        }
    }

    async function createUserProfile() {
        if (auth0Email) {
            const { data, error } = await supabase.from('profiles').insert({
                email: auth0Email,
            });
            if (data) {
                setUserProfile(data);
                console.log('created userProfile is', data);
            }
            if (error) {
                console.log(error);
            }
            fetchUserProfile();
        }
    }

    async function createOnboardingJob() {
        const {
            data: [onboardingJob],
        } = await supabase
            .from('jobs')
            .insert({
                account: auth0Email,
                company: 'Foli',
                position: 'Tutorial',
                salary_min: 45000,
                salary_max: 55000,
                location: 'Dallas, TX',
                status: 'Interviewing',
                edited: new Date().toLocaleDateString('en-US'),
            })
            .select();
        return onboardingJob;
    }

    async function createOnboardingSheets(onboardingJob) {
        await supabase
            .from('sheets')
            .insert([
                {
                    title: 'Foli Tutorial',
                    content: '<h3>Learn Foli</h3>',
                    account: auth0Email,
                    jobid: onboardingJob.id,
                },
                {
                    title: 'Foli Tutorial 2',
                    content: '<h3>Learn Foli</h3>',
                    account: auth0Email,
                    jobid: onboardingJob.id,
                },
            ])
            .select();
        fetchUserJobs();
    }

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
            console.log('currentSheets are', data);
            localStorage.setItem('currentSheets', JSON.stringify(data));
            const sortedSheets = [...data].sort(
                (a, b) => a.position - b.position
            );
            setCurrentSheets(sortedSheets);
        }
    }

    // *
    // *
    // SET CURRENTLY VIEWED TEMPLATE DATA
    const [currentTemplates, setCurrentTemplates] = useState(allTemplates);
    const [previewTemplate, setPreviewTemplate] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState(null);

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
        <DatabaseContext.Provider
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
        </DatabaseContext.Provider>
    );
};

export { DatabaseProvider, DatabaseContext };
