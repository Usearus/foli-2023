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
	const [allPages, setAllPages] = useState([]);
	const [allJobs, setAllJobs] = useState([]);
	const [allProfiles, setAllProfiles] = useState([]);
	const [allTemplates, setAllTemplates] = useState([]);

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
		setCurrentTemplates(data);
		if (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchAllPages();
		fetchAllJobs();
		fetchAllProfiles();
		fetchAllTemplates();
	}, []);

	// *
	// *
	// SET USER DATA
	const [userProfile, setUserProfile] = useState([]);
	const [userJobs, setUserJobs] = useState([]);
	const [userPages, setUserPages] = useState([]);
	const [settingPageStack, setSettingPageStack] = useState('');

	async function fetchUserProfile() {
		if (auth0Email) {
			const { data } = await supabase
				.from('profiles')
				.select('*')
				.filter('email', 'eq', auth0Email)
				.single();
			if (data) {
				setUserProfile(data);
				setSettingPageStack(data.page_stack);
				// console.log('userProfile is', data);
			} else {
				createUserProfile();
				const onboardingJob = await createOnboardingJob();
				await createOnboardingPages(onboardingJob);
				fetchUserJobs();
			}
		}
	}
	console.log(settingPageStack);

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
				company: 'Foli Tutorial',
				position: 'Start by opening this tutorial job',
				salary_min: 45000,
				salary_max: 55000,
				location: 'Dallas, TX',
				status: 'Interviewing',
				edited: new Date().toLocaleDateString('en-US'),
			})
			.select();
		return onboardingJob;
	}

	async function createOnboardingPages(onboardingJob) {
		await supabase
			.from('pages')
			.insert([
				{
					title: 'Foli Tutorial',
					content:
						'<h2><span style="font-size: 20px;">Start here</span></h2><p><br></p><p><span style="font-size: 14px;">Each document in </span><em style="font-size: 14px;">Foli</em><span style="font-size: 14px;"> is called a </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">page</strong><span style="font-size: 14px;">!</span></p><p><br></p><p><em style="font-size: 14px;">F﻿oli </em><span style="font-size: 14px;">lets you manage all documents, research, &amp; notes you need during your job search on one page!</span></p><p><br></p><p><span style="font-size: 14px;">Follow these steps to learn how to use Foli:</span></p><p><br></p><ol><li><span style="font-size: 14px;">Press the</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">edit icon</strong><span style="font-size: 14px;"> on this page to enable editing this page.</span></li><li><span style="font-size: 14px;">Edit this page by</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">deleting this bullet point</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Make this page wider by </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">dragging the right edge</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Hide and show this page by finding this page on the pages sidebar and pressing the</span><strong style="font-size: 14px;"> </strong><strong style="color: rgb(153, 51, 255); font-size: 14px;">eye icon</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Click the</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">"add page"</strong><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><span style="font-size: 14px;">button and add a new page to this tutorial job.</span></li><li><strong style="color: rgb(153, 51, 255); font-size: 14px;">Scroll horizontally</strong><span style="font-size: 14px;"> to see all the pages visible on this page.</span></li><li><span style="font-size: 14px;">Finally, delete this page by clicking the </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">three dots icon</strong><span style="font-size: 14px;"> at the top-right of the page or by visiting the pages sidebar.</span></li></ol>',
					account: auth0Email,
					jobid: onboardingJob.id,
				},
				// {
				//     title: 'Foli Tutorial 2',
				//     content: '<h3>Learn Foli</h3>',
				//     account: auth0Email,
				//     jobid: onboardingJob.id,
				// },
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

	async function fetchUserPages() {
		if (auth0Email) {
			const { data } = await supabase
				.from('pages')
				.select('*')
				.filter('account', 'eq', auth0Email);
			if (data) {
				setUserPages(data);
				// console.log('userPages are', data);
			}
		}
	}

	useEffect(() => {
		fetchUserProfile();
		fetchUserJobs();
		fetchUserPages();
		return () => {
			// Cleanup // TODO figure out how to fix this useEffect issue
		};
	}, [auth0Email]);

	// *
	// *
	// SET CURRENTLY VIEWED JOB DATA
	const [currentPages, setCurrentPages] = useState([]);
	const [currentJob, setCurrentJob] = useState([]);

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
			// console.log('currentJob is', data);
		}
	}

	async function fetchCurrentPages(job) {
		// console.log('job received for fetch:', job);
		const { data } = await supabase
			.from('pages')
			.select('*')
			.filter('jobid', 'eq', job.id);
		if (data) {
			// console.log('currentPages are', data);
			localStorage.setItem('currentPages', JSON.stringify(data));
			const sortedPages = [...data].sort((a, b) => a.position - b.position);
			setCurrentPages(sortedPages);
		}
	}

	// *
	// *
	// SET CURRENTLY VIEWED TEMPLATE DATA
	const [currentTemplates, setCurrentTemplates] = useState(allTemplates);
	const [previewTemplate, setPreviewTemplate] = useState(false);
	const [activeTemplate, setActiveTemplate] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState('All');

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
				//Pages
				allPages,
				userPages,
				currentPages,
				fetchAllPages,
				setCurrentPages,
				fetchCurrentPages,
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
				selectedCategory,
				setSelectedCategory,
				// Settings
				settingPageStack,
				setSettingPageStack,
			}}>
			{children}
		</DatabaseContext.Provider>
	);
};

export { DatabaseProvider, DatabaseContext };
