import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';

function AddJobModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth0();
  const { fetchUserJobs } = useContext(AirtableContext);

  const companyRef = useRef();
  const positionRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  const locationRef = useRef();
  // const remoteRef = useRef();
  const linkRef = useRef();

  const handleAddJobClick = () => {
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
            // remote: remoteRef.current.value,
            link: linkRef.current.value,
            status: 'Bookmarked',
            edited: new Date().toLocaleDateString('en-US'),
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
          fetchUserJobs();
        });
      }
    );
    handleClose();
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Job
      </Button>

      <Modal show={show} onHide={handleClose}>
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
            <Form.Group className='mb-3' controlId='position'>
              <Form.Label>Position</Form.Label>
              <Form.Control type='text' ref={positionRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='salary-min'>
              <Form.Label>Salary Minimum ($)</Form.Label>
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
            {/* <LocationAutocompleteBtn /> */}
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Start typing a city...'
                ref={locationRef}
              />
            </Form.Group>
            {/* <Form.Group className='mb-3' controlId='remote'>
              <Form.Check wlabel='Remote' ref={remoteRef} />
            </Form.Group> */}
            <Form.Group className='mb-3' controlId='link'>
              <Form.Label>Listing Link</Form.Label>
              <Form.Control
                type='text'
                placeholder='Start typing a location...'
                ref={linkRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddJobClick}>
            Add Job
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddJobModal;
