import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditPrefModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const positionRef = useRef();
  const locationRef = useRef();
  const remoteRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();

  // const handleEditPreferencesClick = () => {
  //   base('jobs').create(
  //     [
  //       {
  //         fields: {
  //           account: user.email,
  //           company: companyRef.current.value,
  //           position: positionRef.current.value,
  //           salary_min: salary_minRef.current.value * 1,
  //           salary_max: salary_maxRef.current.value * 1,
  //           location: locationRef.current.value,
  //           // remote: remoteRef.current.value,
  //           link: linkRef.current.value,
  //           status: 'Bookmarked',
  //           edited: new Date().toLocaleDateString('en-US'),
  //         },
  //       },
  //     ],
  //     function (err, records) {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       records.forEach(function (record) {
  //         console.log(record.getId());
  //         fetchUserJobs();
  //       });
  //     }
  //   );
  //   handleClose();
  // };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Edit Preferences
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Position</Form.Label>
              <Form.Control type='text' autoFocus ref={positionRef} />
            </Form.Group>
            {/* Add badges under locations! */}
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Location(s)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Start typing a city...'
                ref={locationRef}
              />
            </Form.Group>

            {/* <Form.Group className='mb-3' controlId='remote'>
              <Form.Check wlabel='Remote' ref={remoteRef} />
            </Form.Group> */}

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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPrefModal;
