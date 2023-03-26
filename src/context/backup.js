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

// async function createUserProfile() {
//   if (auth0Email) {
//     const { data, error } = await supabase.from('profiles').insert({
//       email: auth0Email,
//     });
//     if (data) {
//       setUserProfile(data);
//       fetchUserProfile();
//       console.log('created userProfile is', data);
//     }
//     if (error) {
//       console.log(error);
//     }
//   }
// }

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

// async function createOnboardingJob() {
//   const { onboardingJob } = await supabase
//     .from('jobs')
//     .insert({
//       account: auth0Email,
//       company: 'Foli',
//       position: 'Tutorial',
//       salary_min: 45000,
//       salary_max: 55000,
//       location: 'Dallas, TX',
//       status: 'Interviewing',
//       edited: new Date().toLocaleDateString('en-US'),
//     })
//     .select();
//   console.log('onboardingJob.id', onboardingJob.id);
// }

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
    // console.log('onboardingJob.id', onboardingJob.id);
    return onboardingJob[0]; // return the created job object
  } catch (err) {
    console.error(err);
  }
};

// async function createOnboardingSheets(onboardingJob) {
//   const { onboardingSheets } = await supabase
//     .from('sheets')
//     .insert({
//       title: 'Foli Tutorial',
//       content: '<h3>Learn Foli</h3>',
//       account: auth0Email,
//       jobid: [onboardingJob.id],
//     })
//     .select();
//   console.log('onboardingSheets are', onboardingSheets);
//   fetchUserJobs();
// }

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
    fetchUserJobs();
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
