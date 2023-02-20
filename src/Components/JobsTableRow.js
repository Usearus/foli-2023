import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

const JobsTableRow = (jobs) => {
  return (
    <tr key={jobs.fields.id}>
      <td>
        <Form.Check type='checkbox' />
      </td>
      <td>{jobs.fields.company}</td>
      <td>{jobs.fields.role}</td>
      <td>
        ${jobs.fields.salary_min.toLocaleString()} - $
        {jobs.fields.salary_max.toLocaleString()}
      </td>
      <td>{jobs.fields.location}</td>
      <td>
        <Badge pill bg='secondary'>
          Bookmarked
        </Badge>
      </td>
      <td>08/15/2022</td>
    </tr>
  );
};

export default JobsTableRow;
