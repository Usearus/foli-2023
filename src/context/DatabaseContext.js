import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from '../API/supabase';
import {
	createOnboardingPages1,
	createOnboardingPages2,
} from './OnboardingPages';
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
				// console.log(user.email);
			}
		},
		[user]
	);

	// ALL DATA
	const [allPages, setAllPages] = useState([]);
	const [allJobs, setAllJobs] = useState([]);
	const [allProfiles, setAllProfiles] = useState([]);
	const [allTemplates, setAllTemplates] = useState([]);
	const [allQuestions, setAllQuestions] = useState([]);

	// FETCH ALL DATA

	async function fetchAllPages() {
		const { data, error } = await supabase.from('pages').select('*');
		// console.log('allPages are', data);
		setAllPages(data);
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
		if (error) {
			console.log(error);
		}
	}

	async function fetchAllQuestions() {
		const { data, error } = await supabase.from('questions').select('*');
		// console.log('allQuestions are', data);
		setAllQuestions(data);
		if (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchAllPages();
		fetchAllJobs();
		fetchAllProfiles();
		fetchAllTemplates();
		fetchAllQuestions();
	}, []);

	// *
	// *
	// SET USER DATA
	const [userProfile, setUserProfile] = useState([]);
	const [userJobs, setUserJobs] = useState([]);
	const [userJobsArchived, setUserJobsArchived] = useState([]);
	const [userJobPages, setUserJobPages] = useState([]);
	const [userNotePages, setUserNotePages] = useState([]);
	const [userResume, setUserResume] = useState([]);
	const [userSnippets, setUserSnippets] = useState([]);
	const [userTheme, setUserTheme] = useState([]);

	// SET ADMIN DATA
	const [adminProfile, setAdminProfile] = useState(false);
	useEffect(() => {
		if (userProfile && userProfile.email === 'adamdenais@gmail.com') {
			setAdminProfile(true);
		}
	}, [userProfile]);

	async function fetchUserProfile() {
		if (auth0Email) {
			const { data } = await supabase
				.from('profiles')
				.select('*')
				.filter('email', 'eq', auth0Email)
				.single();
			if (data) {
				setUserProfile(data);
				// THIS IS PROBABLY MAKING THE THEME REFRESH> NEED TO FIGURE OUT HOW TO DO ONLY ONCE.
				const theme = data.theme || 'customLight';
				setUserTheme(theme);
				document.documentElement.setAttribute('data-theme', data.theme);
				// console.log('userProfile is', data);
				// console.log('user theme is', data.theme);
			} else {
				createUserProfile();
				const onboardingJob1 = await createOnboardingJob1();
				await createOnboardingPages1(auth0Email, onboardingJob1);
				const onboardingJob2 = await createOnboardingJob2();
				await createOnboardingPages2(auth0Email, onboardingJob2);
				createUserResume();
				fetchUserResume();
				fetchUserJobs();
				fetchUserJobsArchived();
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
			setUserTheme('customLight');
			// document.documentElement.setAttribute('data-theme', data.theme);
		}
	}

	async function createUserResume() {
		if (auth0Email) {
			const { data, error } = await supabase.from('resumes').insert({
				account: auth0Email,
			});
			if (data) {
				setUserResume(data);
				console.log('created userResume is', data);
			}
			if (error) {
				console.log(error);
			}
			fetchUserResume();
		}
	}

	async function createOnboardingJob1() {
		const {
			data: [onboardingJob1],
		} = await supabase
			.from('jobs')
			.insert({
				account: auth0Email,
				company: 'Foli Tutorial',
				position: 'Start by opening this tutorial job',
				salary_min: 45000,
				salary_max: 55000,
				location: 'Dallas, TX',
				status: 'Interviewing',
				edited: new Date().toLocaleDateString('en-US'),
			})
			.select();
		return onboardingJob1;
	}

	async function createOnboardingJob2() {
		const {
			data: [onboardingJob2],
		} = await supabase
			.from('jobs')
			.insert({
				account: auth0Email,
				company: 'Google (example job)',
				position: 'Senior Design Manager',
				salary_min: 100000,
				salary_max: 199000,
				location: 'San Francisco, CA',
				status: 'Applied',
				edited: new Date().toLocaleDateString('en-US'),
			})
			.select();
		return onboardingJob2;
	}

	async function fetchUserJobs() {
		if (auth0Email) {
			const { data } = await supabase
				.from('jobs')
				.select('*')
				.filter('account', 'eq', auth0Email)
				.not('status', 'eq', 'Closed');
			if (data) {
				setUserJobs(data);
				// console.log('userJobs are', data);
			}
		}
	}

	async function fetchUserJobsArchived() {
		if (auth0Email) {
			const { data } = await supabase
				.from('jobs')
				.select('*')
				.filter('account', 'eq', auth0Email)
				.filter('status', 'eq', 'Closed');
			if (data) {
				setUserJobsArchived(data);
				// console.log('userJobsArchived are', data);
			}
		}
	}

	async function fetchUserJobPages() {
		if (auth0Email) {
			const { data } = await supabase
				.from('pages')
				.select('*')
				.filter('account', 'eq', auth0Email)
				.filter('isNote', 'eq', false);
			if (data) {
				setUserJobPages(data);
				// console.log('userJobPages are', data);
			}
		}
	}

	async function fetchUserNotePages() {
		if (auth0Email) {
			const { data } = await supabase
				.from('pages')
				.select('*')
				.filter('account', 'eq', auth0Email)
				.filter('isNote', 'eq', true);
			if (data) {
				setUserNotePages(data);
				// console.log('userNotePages are', data);
			}
		}
	}

	async function fetchUserResume() {
		if (auth0Email) {
			const { data } = await supabase
				.from('resumes')
				.select('*')
				.filter('account', 'eq', auth0Email)
				.single();
			if (data) {
				setUserResume(data);
				// console.log('userResume is', data);
			}
		}
	}

	async function fetchUserSnippets() {
		if (auth0Email) {
			const { data } = await supabase
				.from('snippets')
				.select('*')
				.filter('account', 'eq', auth0Email);
			if (data) {
				setUserSnippets(data);
				// console.log('userSnippets are', data);
			}
		}
	}

	useEffect(() => {
		fetchUserProfile();
		fetchUserJobs();
		fetchUserJobsArchived();
		fetchUserNotePages();
		fetchUserJobPages();
		fetchUserResume();
		fetchUserSnippets();
		// console.log(localStorage);
		// console.log(currentJob);
		return () => {
			// Cleanup // TODO figure out how to fix this useEffect issue
		};
	}, [auth0Email]);

	// *
	// *
	// SET CURRENTLY VIEWED JOB DATA
	const [currentJobPages, setCurrentJobPages] = useState([]);
	const [currentJob, setCurrentJob] = useState([]);
	const [selectedPageID, setSelectedPageID] = useState(null); // used to select a page to scroll to on page list

	// Initialize currentJob from localStorage
	useEffect(() => {
		const savedJob = localStorage.getItem('currentJob');
		if (savedJob) {
			setCurrentJob(JSON.parse(savedJob));
		}

		const savedPages = localStorage.getItem('currentJobPages');
		if (savedPages) {
			setCurrentJobPages(JSON.parse(savedPages));
		}
	}, []);

	async function fetchCurrentJob(job) {
		// Fetch the job data from Supabase based on the job ID
		const { data, error } = await supabase
			.from('jobs')
			.select('*')
			.filter('id', 'eq', job.id)
			.single();

		if (error) {
			console.error('Error fetching current job:', error);
			return;
		}

		if (data) {
			// Set the current job data to the state
			setCurrentJob(data);

			// Store the current job data in localStorage
			localStorage.setItem('currentJob', JSON.stringify(data));

			// Log the data to verify
			// console.log('currentJob is', data);
			// console.log(
			// 	'localStorage for currentJob',
			// 	JSON.parse(localStorage.getItem('currentJob'))
			// );
		}
	}

	async function fetchCurrentJobPages(job) {
		// console.log('job received for fetch:', job);
		const { data } = await supabase
			.from('pages')
			.select('*')
			.filter('jobid', 'eq', job.id);
		if (data) {
			// console.log('currentJobPages are', data);
			localStorage.setItem('currentJobPages', JSON.stringify(data));
			const sortedJobPages = [...data].sort((a, b) => a.position - b.position);
			setCurrentJobPages(sortedJobPages);
		}
	}

	// *
	// *
	// SET CURRENTLY VIEWED TEMPLATE DATA
	const [previewTemplate, setPreviewTemplate] = useState(false);
	const [activeTemplate, setActiveTemplate] = useState(null);

	// Used for picking out a created job and animating it
	const [createdJobID, setCreatedJobID] = useState(null);

	return (
		<DatabaseContext.Provider
			value={{
				//Admin
				adminProfile,
				//Pages
				allPages,
				fetchAllPages,
				userJobPages,
				userNotePages,
				setUserNotePages,
				fetchUserNotePages,
				currentJobPages,
				setCurrentJobPages,
				fetchCurrentJobPages,
				selectedPageID,
				setSelectedPageID,
				//Jobs
				allJobs,
				userJobs,
				userJobsArchived,
				currentJob,
				setAllJobs,
				fetchAllJobs,
				fetchUserJobs,
				fetchUserJobsArchived,
				setCurrentJob,
				fetchCurrentJob,
				createdJobID,
				setCreatedJobID,
				//Profiles
				allProfiles,
				userProfile,
				fetchUserProfile,
				userTheme,
				setUserTheme,
				//Templates\
				allTemplates,
				setAllTemplates,
				fetchAllTemplates,
				activeTemplate,
				previewTemplate,
				setPreviewTemplate,
				setActiveTemplate,
				// Resumes
				userResume,
				fetchUserResume,
				// Snippets
				userSnippets,
				fetchUserSnippets,
				// Questions
				allQuestions,
				fetchAllQuestions,
			}}>
			{children}
		</DatabaseContext.Provider>
	);
};

export { DatabaseProvider, DatabaseContext };
