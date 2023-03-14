import { useState, useRef, useContext } from 'react';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalAddJob = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setAlert } = useAlert();

  const { user } = useAuth0();
  const { fetchUserJobs } = useContext(AirtableContext);

  const companyRef = useRef();
  const positionRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  const locationRef = useRef();
  const remoteRef = useRef();
  const linkRef = useRef();

  const handleAddJobClick = async () => {
    base('jobs').create(
      [
        {
          fields: {
            account: user.email,
            company: companyRef.current.value,
            position: positionRef.current.value,
            salary_min: salary_minRef.current.value * 1,
            salary_max: salary_maxRef.current.value * 1,
            location: locationRef.current.value,
            remote: remoteRef.current.checked,
            link: linkRef.current.value,
            status: 'Bookmarked',
            edited: new Date().toLocaleDateString('en-US'),
          },
        },
      ],
      async function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        const record = records[0];
        console.log(record.getId());
        fetchUserJobs();
        setAlert('Job successfully added!', 'success');
        const jobDescriptionSheet = await createJobDescriptionSheet(
          record.getId()
        );
      }
    );
    handleClose();
  };

  const createJobDescriptionSheet = async (recordId) => {
    try {
      const jobDescriptionSheet = await base('sheets').create([
        {
          fields: {
            title: 'Job Description',
            content: '<p>Start by pasting in the job description.</p>',
            account: user.email,
            jobid: [recordId],
          },
        },
      ]);

      for (const sheet of jobDescriptionSheet) {
        console.log(sheet.getId());
      }

      // fetchUserJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Button variant='primary' onClick={handleShow}>
        Add Job
      </Button>

      <Modal fullscreen='md-down' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add job to track</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='company'>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type='text'
                placeholder='Google, Apple, etc.'
                autoFocus
                ref={companyRef}
              />
            </Form.Group>
            <Form.Group className='mb-3 ' controlId='position'>
              <Form.Label>Position</Form.Label>
              <Form.Control type='text' ref={positionRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='salary-min'>
              <Form.Label className='test'>Salary Minimum ($)</Form.Label>
              <Form.Control
                type='number'
                placeholder='40,000'
                ref={salary_minRef}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='salary-max'>
              <Form.Label>Salary Maximum ($)</Form.Label>
              <Form.Control
                type='number'
                placeholder='60,000'
                ref={salary_maxRef}
              />
            </Form.Group>
            {/* TODO  <LocationAutocompleteBtn /> */}
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Start typing a city...'
                ref={locationRef}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='remote'>
              <Form.Check
                label='Remote position'
                ref={remoteRef}
                defaultChecked={false}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='link'>
              <Form.Label>Listing URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add URL of job listing'
                ref={linkRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            variant='outline-secondary'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant='primary' onClick={handleAddJobClick}>
            Add Job
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
};

export default ModalAddJob;

const Wrapper = styled.div`
  .editor {
    height: 250px;
    max-height: 500px;
    overflow-y: auto;
  }
`;
