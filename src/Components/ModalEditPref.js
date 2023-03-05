import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { AirtableContext } from '../context/AirtableContext';
import { Badge } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import styled from 'styled-components';

function ModalEditPref() {
  const { userProfile, fetchUserProfile } = useContext(AirtableContext);
  const [showPref, setShowPref] = useState(false);
  const handleClosePref = () => setShowPref(false);
  const handleShowPref = () => setShowPref(true);

  const positionRef = useRef();
  const locationRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  const remoteRef = useRef();

  const [tempLocations, setTempLocations] = useState([
    ...userProfile.fields.location_preference,
  ]);

  const [locationInput, setLocationInput] = useState('');

  const initialValues = {
    position: userProfile?.fields?.position ?? '',
    salary_min: userProfile?.fields?.salary_min ?? '',
    salary_max: userProfile?.fields?.salary_max ?? '',
    location_preference: [...userProfile.fields.location_preference],
    location_remote: userProfile?.fields?.location_remote ?? false,
  };

  const handleSavePrefClick = () => {
    base('profiles').update(
      userProfile.id,
      {
        position: positionRef.current.value,
        salary_min: salary_minRef.current.value * 1,
        salary_max: salary_maxRef.current.value * 1,
        location_preference: tempLocations,
        location_remote: remoteRef.current.checked,
      },
      { typecast: true },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
        fetchUserProfile();
      }
    );
    handleClosePref();
  };

  const handleRemoveLocation = (location) => {
    const updatedLocations = tempLocations.filter((loc) => loc !== location);
    setTempLocations(updatedLocations);
    console.log('tempLocations removed & updated to', tempLocations);
  };

  const handleAddLocation = () => {
    const newLocation = locationInput.trim();
    if (newLocation !== '' && !tempLocations.includes(newLocation)) {
      setTempLocations([...tempLocations, newLocation]);
      setLocationInput('');
    }
  };

  const handleCancelClick = () => {
    positionRef.current.value = initialValues.position;
    salary_minRef.current.value = initialValues.salary_min;
    salary_maxRef.current.value = initialValues.salary_max;
    remoteRef.current.value = initialValues.location_remote;
    setTempLocations(initialValues.location_preference);
    setLocationInput('');
    handleClosePref();
  };

  // const handleEditClick = () => {
  //   handleShowPref();
  //   // handleHideProfile();
  // };
  return (
    <Wrapper>
      <Button variant='primary' onClick={handleShowPref}>
        Edit Preferences
      </Button>
      <Modal fullscreen='md-down' show={showPref} onHide={handleClosePref}>
        <Modal.Header closeButton>
          <Modal.Title>Edit job preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-4' controlId='title'>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type='text'
                autoFocus
                ref={positionRef}
                placeholder='Enter position you are appling to...'
                defaultValue={initialValues.position}
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='salary-min'>
              <Form.Label>Salary Minimum</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type='number'
                  placeholder='Enter a number...'
                  ref={salary_minRef}
                  defaultValue={initialValues.salary_min}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-4' controlId='salary-max'>
              <Form.Label>Salary Maximum</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type='number'
                  placeholder='Enter a number...'
                  ref={salary_maxRef}
                  defaultValue={initialValues.salary_max}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-4' controlId='location'>
              <Form.Label>Locations</Form.Label>
              <InputGroup className='mb-2'>
                <Form.Control
                  type='text'
                  placeholder='Add a location...'
                  ref={locationRef}
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
                <Button
                  variant='outline-secondary'
                  id='button-addon2'
                  onClick={handleAddLocation}
                  disabled={!locationInput}
                >
                  Add
                </Button>
              </InputGroup>
              {userProfile.fields.location_preference &&
                tempLocations.map((location) => (
                  <Badge
                    key={location}
                    pill
                    bg='secondary'
                    className='me-1'
                    style={{
                      width: 'auto',
                    }}
                  >
                    {location}
                    <span style={{ paddingLeft: '8px' }}>
                      <MdOutlineClose
                        onClick={() => handleRemoveLocation(location)}
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

            <Form.Group className='mb-4' controlId='remote'>
              <Form.Check
                label='Remote preferred'
                ref={remoteRef}
                defaultChecked={initialValues.location_remote}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSavePrefClick}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
}

export default ModalEditPref;

const Wrapper = styled.div`
  /* .salary-inputs {
    display: flex;
    justify-content: space-between;
  } */
  .MdOutlineClose:hover {
    cursor: pointer;
  }
`;
