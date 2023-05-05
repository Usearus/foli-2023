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
	const [userResume, setUserResume] = useState([]);

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
				const onboardingJob1 = await createOnboardingJob1();
				await createOnboardingPages1(onboardingJob1);
				const onboardingJob2 = await createOnboardingJob2();
				await createOnboardingPages2(onboardingJob2);
				fetchUserJobs();
				createUserResume();
				fetchUserResume();
			}
		}
	}
	// console.log(settingPageStack);
	// console.log('userProfile is', userProfile);

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

	async function createOnboardingPages1(onboardingJob1) {
		await supabase
			.from('pages')
			.insert({
				title: 'Foli Tutorial',
				content:
					'<h2><span style="font-size: 20px;">Start here</span></h2><p><br></p><p><span style="font-size: 14px;">Each document in </span><em style="font-size: 14px;">Foli</em><span style="font-size: 14px;"> is called a </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">page</strong><span style="font-size: 14px;">!</span></p><p><br></p><p><em style="font-size: 14px;">F﻿oli </em><span style="font-size: 14px;">lets you manage all documents, research, &amp; notes you need during your job search on one screen!</span></p><p><br></p><p><span style="font-size: 14px;">Follow these steps to learn how to use Foli:</span></p><p><br></p><ol><li><span style="font-size: 14px;">Press the</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">edit icon</strong><span style="font-size: 14px;"> on this page to enable editing this page.</span></li><li><span style="font-size: 14px;">Edit this page by</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">deleting this bullet point</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Make this page wider by </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">dragging the right edge</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Hide and show this page by finding this page on the pages sidebar and pressing the</span><strong style="font-size: 14px;"> </strong><strong style="color: rgb(153, 51, 255); font-size: 14px;">eye icon</strong><span style="font-size: 14px;">.</span></li><li><span style="font-size: 14px;">Click the</span><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">"add page"</strong><span style="color: rgb(153, 51, 255); font-size: 14px;"> </span><span style="font-size: 14px;">button and add a new page to this tutorial job.</span></li><li><strong style="color: rgb(153, 51, 255); font-size: 14px;">Scroll horizontally</strong><span style="font-size: 14px;"> to see all the pages visible on this page.</span></li><li><span style="font-size: 14px;">Finally, delete this page by clicking the </span><strong style="color: rgb(153, 51, 255); font-size: 14px;">three dots icon</strong><span style="font-size: 14px;"> at the top-right of the page or by visiting the pages sidebar.</span></li></ol>',
				account: auth0Email,
				jobid: onboardingJob1.id,
			})
			.select();
		fetchUserJobs();
	}

	async function createOnboardingPages2(onboardingJob2) {
		const { error } = await supabase
			.from('pages')
			.insert([
				{
					title: 'Job Description',
					locked: true,
					content: `<p><span style="color: rgba(0, 0, 0, 0.9);">Google’s hybrid workplace includes remote and in-office roles. By applying to this position, you will have an opportunity to share your preferred working location from the following:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">In-office locations: San Francisco, CA, USA; Boulder, CO, USA; Kirkland, WA, USA; New York, NY, USA; Sunnyvale, CA, USA.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">Remote location(s): United States.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">﻿Minimum qualifications:</span></p><ul><li><span style="color: rgba(0, 0, 0, 0.9);">Bachelor's degree in Design, Human-Computer Interaction, Computer Science, a related field, or equivalent practical experience.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">10 years of experience in product design or UX.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">5 years of experience leading design projects and managing people or teams.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">3 years of experience working with executive leaders.</span></li></ul><p><span style="color: rgba(0, 0, 0, 0.9);">Preferred qualifications:</span></p><ul><li><span style="color: rgba(0, 0, 0, 0.9);">Master's degree in Design, Human-Computer Interaction, Computer Science, or a related field.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">7 years of experience working in a complex, cross-functional organization.</span></li></ul><p><u style="color: rgba(0, 0, 0, 0.9);">About The Job</u></p><p><span style="color: rgba(0, 0, 0, 0.9);">At Google, we follow a simple but vital premise: "Focus on the user and all else will follow." Google’s UX leaders help define and drive the future of Google design. They create and clarify product strategy, conceptualize UX ecosystems in ways that mitigate complexity, and inspire teams to push the boundaries of what’s possible. They possess a clear vision of the future of user experience and have the courage to pursue forward-thinking design.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">Google User Experience (UX) is made up of multi-disciplinary teams of UX Designers, Researchers, Writers, Content Strategists, Program Managers, and Engineers: we care deeply about the people who use our products. You are a thoughtful team leader, manager, systems-level design thinker, and visionary - with strong instincts and outstanding intuition informed by user needs and insights. You'll be responsible for guiding the careers of your team members, working closely with each of them to help them realize their full potential.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">UX Design Managers are fierce advocates for the people who use our products as well as the members of their teams. They have a practiced eye for effective design, and are committed to creating elegantly simple user experiences from otherwise complex workflows.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">In this role, you’ll take the time to understand not just the execution side of UX, but also the business aspects of the products we build. You’ll collaborate with leaders of other UX, Engineering, and Product Management teams to create innovative experiences across all of Google’s products, leveraging your passion for brand, craft, and design quality.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">Google Cloud accelerates organizations’ ability to digitally transform their business with the best infrastructure, platform, industry solutions and expertise. We deliver enterprise-grade solutions that leverage Google’s cutting-edge technology – all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">The US base salary range for this full-time position is $199,000-$299,000 + bonus + equity + benefits. Our salary ranges are determined by role, level, and location. The range displayed on each job posting reflects the minimum and maximum target for new hire salaries for the position across all US locations. Within the range, individual pay is determined by work location and additional factors, including job-related skills, experience, and relevant education or training. Your recruiter can share more about the specific salary range for your preferred location during the hiring process.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.9);">Please note that the compensation details listed in US role postings reflect the base salary only, and do not include bonus, equity, or benefits. Learn more about benefits at Google .</span><span style="font-size: 14px;">﻿</span></p><p><br></p><p><u style="color: rgba(0, 0, 0, 0.9);">Responsibilities</u></p><p><br></p><ul><li><span style="color: rgba(0, 0, 0, 0.9);">Guide research and design processes, mentor and grow your team, and enable your team to deliver the best possible user experience.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">Collaborate with the Core UX team to shape and extend the core UI framework, content strategy, and standardize the core components.</span></li><li><span style="color: rgba(0, 0, 0, 0.9);">Drive alignment across teams, and drive effective steering and collaboration to collectively deliver experiences that delight and clearly adds value for the Gmail users.</span><span style="font-size: 14px;">﻿</span></li></ul><p><span style="color: rgba(0, 0, 0, 0.9);">Google is proud to be an equal opportunity workplace and is an affirmative action employer. We are committed to equal employment opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation, age, citizenship, marital status, disability, gender identity or Veteran status. We also consider qualified applicants regardless of criminal histories, consistent with legal requirements. See also Google's EEO Policy and EEO is the Law. If you have a disability or special need that requires accommodation, please let us know by completing our Accommodations for Applicants form .</span></p>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 0,
					width: 400,
				},
				{
					title: 'Resume',
					content: `<h1><span style="font-size: 32px;">John Doe</span></h1><p><strong style="font-size: 16px;">Senior Design Manager</strong></p><p><br></p><p><span style="font-size: 14px;">Email: johndoe@email.com</span></p><p><span style="font-size: 14px;">LinkedIn: linkedin.com/in/johndoe</span></p><p><span style="font-size: 14px;">Phone: (123) 456-7890</span></p><p><br></p><h2><span style="font-size: 20px;">Professional Summary</span></h2><p><em style="font-size: 14px;">As a senior design manager with 8+ years of experience in UX design, I have a proven track record of leading teams and developing successful product experiences. My expertise in product reach and adoption aligns well with Google's mission to bring innovation to its users.</em></p><p><br></p><h2><span style="font-size: 20px;">Work History</span></h2><p><strong style="font-size: 14px;">Senior UX Designer, ABC Company (Jan 2016 - Present)</strong></p><ul><li><span style="font-size: 14px;">Led cross-functional teams to deliver award-winning design projects for national and international clients, including Fortune 500 companies.</span></li><li><span style="font-size: 14px;">Managed the development of a new product that has a 90% user adoption rate within the first six months of launch.</span></li><li><span style="font-size: 14px;">Improved the user experience of website and mobile app products, resulting in a 25% increase in user engagement and a 15% increase in monthly active users.</span></li></ul><p><strong style="font-size: 14px;">Lead UX Designer, DEF Inc. (Jul 2013 - Dec 2015)</strong></p><ul><li><span style="font-size: 14px;">Directed UX and UI design for mobile and web products, resulting in a 75% increase in app downloads and a 20% increase in customer retention.</span></li><li><span style="font-size: 14px;">Created and oversaw the implementation of a new UX design system, which led to a 30% reduction in development time and a 50% reduction in dev bug reports.</span></li><li><span style="font-size: 14px;">Coordinated with executives and stakeholders to understand their vision and requirements for the product, and ensured that the designs met those expectations.</span></li></ul><p><strong style="font-size: 14px;">UX Designer, GHI Corporation (Apr 2011 - Jun 2013)</strong></p><ul><li><span style="font-size: 14px;">Developed wireframes, prototypes, and visual designs for web and mobile applications that resulted in a 40% decrease in user flow drop-offs.</span></li><li><span style="font-size: 14px;">Collaborated with product managers, developers, and stakeholders to define features, create user journeys, and improve user experiences.</span></li><li><span style="font-size: 14px;">Conducted user research and usability testing to gather feedback and insights that informed design decisions.</span></li></ul><p><br></p><h2>Education</h2><p><span style="font-size: 14px;">Bachelor of Fine Arts in Graphic Design, XYZ University (Aug 2007 - May 2011)</span></p><p><br></p><h2>Skills</h2><p><em style="font-size: 14px;">User Experience Design, Gmail Reach, Adoption, and Premium Experiences, Design Thinking, User Research, Interaction Design, Information Architecture, Usability Testing, Agile Methodology, Sketch, Adobe Creative Suite, HTML/CSS</em></p>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 1,
					width: 700,
				},
				{
					title: 'Cover Letter',
					content: `<p><span style="font-size: 14px;">Dear Hiring Manager,</span></p><p><br></p><p><span style="font-size: 14px;">I am excited to apply for the Senior Design Manager role for Gmail Reach, Adoption, and Premium Experiences. With over 10 years of experience in product design, I am confident in my ability to lead and inspire a team to deliver top-notch experiences for your users.</span></p><p><br></p><p><span style="font-size: 14px;">Throughout my career, I have focused on delivering customer-centric design solutions that balance user needs with business goals. With my expertise in user research and design thinking methodologies, I have successfully led cross-functional teams to deliver products that have positively impacted millions of users.</span></p><p><br></p><p><span style="font-size: 14px;">In my current role as a Design Manager at [current company], I have led the design for several successful products, including a mobile app that has received high praise from our users and increased engagement by 25%. I have also developed and implemented design systems and processes that have improved design efficiency and quality across the organization.</span></p><p><br></p><p><span style="font-size: 14px;">I am excited about the opportunity to join the Google team and contribute my skills to help deliver innovative and impactful experiences for Gmail users. Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further with you.</span></p><p><span style="font-size: 14px;">Sincerely,</span></p><p><span style="font-size: 14px;">[Your Name]</span></p>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 2,
					width: 500,
				},
				{
					title: 'Interview Questions',
					content: `<p><strong>Interview questions you may be asked based on the job description:</strong><span style="font-size: 14px;">﻿</span></p><p><br></p><ol><li>Can you tell us about your experience managing design teams?</li><li>How do you prioritize and manage your team's workload?</li><li>Can you walk us through your design process?</li><li>How do you balance user needs with business goals in your design work?</li><li>Can you give an example of a successful user adoption strategy you implemented in a previous role?</li><li>How do you stay updated on industry trends and incorporate them into your work?</li><li>Can you walk us through a time when you had to navigate conflicting stakeholder feedback during a project?</li><li>How do you collaborate with cross-functional teams, such as product and engineering, to ensure successful project outcomes?</li><li>Can you give an example of a design decision you made that had a significant impact on user engagement or satisfaction?</li><li>How do you manage and provide feedback to designers on your team?</li></ol>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 3,
					width: 400,
				},
				{
					title: 'Pre-Interview Notes',
					content: `<h2><span style="font-size: 20px;">Company and Role Information</span></h2><ul><li><span style="font-size: 14px;">Interviewer's name and job title:</span></li><li><span style="font-size: 14px;">Company Industry:</span></li><li><span style="font-size: 14px;">Primary responsibilities of the position:</span></li><li><span style="font-size: 14px;">Key qualifications and skills required for the position:</span></li><li><span style="font-size: 14px;">Company's recent achievements or notable projects:</span></li><li><span style="font-size: 14px;">List of potential questions the interviewer may ask:</span></li></ul><h2><br></h2><h2><span style="font-size: 20px;">Sample Questions to Ask</span></h2><p><br></p><ol><li><span style="font-size: 14px;">How would you describe the company culture?</span></li><li><span style="font-size: 14px;">What of the company's values is most important to you?</span></li><li><span style="font-size: 14px;">Can you describe a typical day in this role?</span></li><li><span style="font-size: 14px;">What are some of the biggest challenges facing the company right now?</span></li><li><span style="font-size: 14px;">How does the company measure success?</span></li><li><span style="font-size: 14px;">Can you share some of the key goals the company has set for the next year?</span></li><li><span style="font-size: 14px;">How does this position fit into the larger goals of the company?</span></li><li><span style="font-size: 14px;">Can you share any recent accomplishments or exciting projects the team has worked on?</span></li></ol><p><em style="font-size: 14px; color: rgb(55, 63, 71);">Note: Find more questions in the "Interview Questions List" template.</em></p>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 4,
					width: 330,
				},
				{
					title: 'Post-Interview Notes',
					content: `<h2><span style="font-size: 20px;">Interview Details</span></h2><ul><li><span style="font-size: 14px;">Date and time of the interview:</span></li><li><span style="font-size: 14px;">Interviewer's name and job title:</span></li><li><span style="font-size: 14px;">Interview format (e.g. phone, video, in-person):</span></li><li><span style="font-size: 14px;">Duration of the interview:</span></li></ul><h2><span style="font-size: 20px;">Interview Discussion</span></h2><ul><li><span style="font-size: 14px;">What topics were covered during the interview?</span></li><li><span style="font-size: 14px;">What were the interviewer's main points or concerns?</span></li><li><span style="font-size: 14px;">What were your main points or concerns?</span></li><li><span style="font-size: 14px;">Were there any challenges or concerns discussed during the interview?</span></li><li><span style="font-size: 14px;">What questions were asked during the interview?</span></li><li><span style="font-size: 14px;">What were your responses to the questions asked?</span></li><li><span style="font-size: 14px;">What information did you learn about the company or the position you did not know before?</span></li><li><span style="font-size: 14px;">What key takeaways did you have from the interview?</span></li></ul><h2><span style="font-size: 20px;">Follow-Up Actions</span></h2><ul><li><span style="font-size: 14px;">Did the interviewer request any follow-up information or tasks?</span></li><li><span style="font-size: 14px;">What tasks or actions must you complete before the next interview?</span></li><li><span style="font-size: 14px;">When can you expect to hear back from the company?</span></li><li><span style="font-size: 14px;">What are the next steps in the interview process?</span></li></ul><h2><span style="font-size: 20px;">Additional Notes</span></h2><ul><li><span style="font-size: 14px;">Were there any additional notes or observations you made during the interview that you want to remember?</span></li></ul>`,
					account: auth0Email,
					jobid: onboardingJob2.id,
					position: 5,
					width: 330,
				},
			])
			.select();
		fetchUserJobs();
		if (error) {
			console.log(error);
		}
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

	useEffect(() => {
		fetchUserProfile();
		fetchUserJobs();
		fetchUserPages();
		fetchUserResume();
		return () => {
			// Cleanup // TODO figure out how to fix this useEffect issue
		};
	}, [auth0Email]);

	// *
	// *
	// SET CURRENTLY VIEWED JOB DATA
	const [currentPages, setCurrentPages] = useState([]);
	const [currentJob, setCurrentJob] = useState([]);
	const [selectedPageID, setSelectedPageID] = useState(null); // used to select a page to scroll to on page list

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

	// Used for picking out a created job and animating it
	const [createdJobID, setCreatedJobID] = useState(null);

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
				selectedPageID,
				setSelectedPageID,
				//Jobs
				allJobs,
				userJobs,
				currentJob,
				setAllJobs,
				fetchAllJobs,
				fetchUserJobs,
				setCurrentJob,
				fetchCurrentJob,
				createdJobID,
				setCreatedJobID,
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
				// Resumes
				userResume,
				fetchUserResume,
				// Settings
				settingPageStack,
				setSettingPageStack,
			}}>
			{children}
		</DatabaseContext.Provider>
	);
};

export { DatabaseProvider, DatabaseContext };
