import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';

function EditPrefModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth0();
  const { userProfile, fetchUserProfile } = useContext(AirtableContext);
  console.log('profile is', userProfile.id);
  const positionRef = useRef();
  const locationRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  // const remoteRef = useRef();

  console.log('user', user);
  console.log('userProfile', userProfile);

  const handleEditPrefClick = () => {
    base('profiles').update(
      userProfile.id,
      {
        position: positionRef.current.value,
        salary_min: salary_minRef.current.value * 1,
        salary_max: salary_maxRef.current.value * 1,
        location_preference: locationRef.current.value,
        // location_remote: remoteRef.current.value,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
        fetchUserProfile();
      }
    );
    handleClose();
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Edit Preferences
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit job preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type='text'
                autoFocus
                ref={positionRef}
                placeholder='Enter position you are appling to...'
                defaultValue={
                  userProfile && userProfile.fields.position
                    ? `${userProfile.fields.position}`
                    : ''
                }
              />
            </Form.Group>
            {/* Add badges under locations! */}
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Location(s)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add a location...'
                ref={locationRef}
              />
              {userProfile.fields.location_preference &&
                userProfile.fields.location_preference.map((location) => (
                  <Badge
                    key={location}
                    pill
                    bg='secondary'
                    className='me-2'
                    style={{
                      marginTop: '8px',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      width: 'auto',
                    }}
                  >
                    {location}
                    <span style={{ paddingLeft: '8px' }}>
                      <MdOutlineClose
                        style={{
                          color: '#ffffff',
                          width: '16px',
                          height: '16px',
                        }}
                      />
                    </span>
                  </Badge>
                ))}
            </Form.Group>

            {/* <Form.Group className='mb-3' controlId='remote'>
              <Form.Check wlabel='Remote' ref={remoteRef} />
            </Form.Group> */}

            <Form.Group className='mb-3' controlId='salary-min'>
              <Form.Label>Salary Minimum ($)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter a number...'
                ref={salary_minRef}
                defaultValue={
                  userProfile && userProfile.fields.salary_min
                    ? `${userProfile.fields.salary_min}`
                    : ''
                }
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='salary-max'>
              <Form.Label>Salary Maximum ($)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter a number...'
                ref={salary_maxRef}
                defaultValue={
                  userProfile && userProfile.fields.salary_max
                    ? `${userProfile.fields.salary_max}`
                    : ''
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleEditPrefClick}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPrefModal;
