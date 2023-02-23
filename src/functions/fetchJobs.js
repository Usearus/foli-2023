import airtableBase from '../API/base';

async function fetchJobs() {
  const base = airtableBase;
  const records = await base('jobs').select().all();

  const jobs = records.map((record) => ({
    id: record.id,
    account: record.get('account'),
    company: record.get('company'),
    role: record.get('role'),
    salary_min: record.get('salary_min'),
    salary_max: record.get('salary_max'),
    location: record.get('location'),
    link: record.get('link'),
    status: record.get('status'),
  }));

  return jobs;
}

export default fetchJobs;
