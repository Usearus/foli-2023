import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { FiTrash } from "react-icons/fi";
import { Button } from "react-bootstrap";
import base from "../API/base";
// import { AirtableContext } from '../context/AirtableContext';

const JobsTableRow = (jobs) => {
  // const { allJobs, setAllJobs } = useContext(AirtableContext);

  const handleDeleteJobClick = (e) => {
    base("jobs").destroy(jobs.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted record", deletedRecord.id);
      // TRY MAKING A FETCH AIRTABLE FUNCTION AND CALL IT AFTER DELETEING THE RECORD
      // async : fetchAirtable() {
      //   const records = await base(table).select().all()
      //     .then( r => {return r});
      //   this.setState({records});
      // }
      // fetchAirtable();
    });
  };

  return (
    <tr key={jobs.fields.id}>
      <td>
        <Form.Check type="checkbox" />
      </td>
      <td>{jobs.fields.company}</td>
      <td>{jobs.fields.position}</td>
      <td>
        {jobs.fields.salary_min && jobs.fields.salary_max
          ? `$${jobs.fields.salary_min.toLocaleString()} - 
        ${jobs.fields.salary_max.toLocaleString()}`
          : "-"}
      </td>
      <td>{jobs.fields.location}</td>
      <td>
        <Badge pill bg="secondary">
          {jobs.fields.status}
        </Badge>
      </td>
      <td>{jobs.fields.edited}</td>
      <td>
        <Button variant="light" onClick={handleDeleteJobClick}>
          <FiTrash />
        </Button>
      </td>
    </tr>
  );
};

export default JobsTableRow;
