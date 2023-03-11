import { useState, useContext, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import useAlert from '../Custom Hooks/useAlert';
import { MdOutlineClose } from 'react-icons/md';
import { Badge, Form, Button, InputGroup, Stack, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import base from '../API/base';

const ModalProfile = () => {
  const { user } = useAuth0();
  const { userProfile, fetchUserProfile } = useContext(AirtableContext);
  const [showProfile, setShowProfile] = useState(false);
  const handleHideProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);
  const { setAlert } = useAlert();

  const [editing, setEditing] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [tempLocations, setTempLocations] = useState([]);

  const positionRef = useRef();
  const locationRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  const remoteRef = useRef();

  const initialValues = {
    position: userProfile?.fields?.position ?? '',
    salary_min: userProfile?.fields?.salary_min ?? '',
    salary_max: userProfile?.fields?.salary_max ?? '',
    location_remote: userProfile?.fields?.location_remote ?? false,
    location_preference: userProfile?.fields?.location_preference
      ? [...userProfile.fields.location_preference]
      : [],
  };

  if (!userProfile) {
    return <></>;
  }

  console.log('userProfile', userProfile);
  console.log('location_preferences', userProfile.fields.location_preference);
  console.log('initialValues', initialValues);
  console.log('tempLocations', tempLocations);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleAddLocation = () => {
    const newLocation = locationInput.trim();
    if (newLocation !== '' && !tempLocations.includes(newLocation)) {
      setTempLocations([...tempLocations, newLocation]);
      setLocationInput('');
      // Is this really needed?
      fetchUserProfile();
    }
  };

  const handleRemoveLocation = (location) => {
    const updatedLocations = tempLocations.filter((loc) => loc !== location);
    setTempLocations(updatedLocations);
    console.log('tempLocations removed & updated to', tempLocations);
  };

  const handleProfileClick = () => {
    handleShowProfile();
    if (initialValues.location_preference) {
      setTempLocations([...initialValues.location_preference]);
    }
  };

  const handleCancelClick = () => {
    positionRef.current.value = initialValues.position;
    salary_minRef.current.value = initialValues.salary_min;
    salary_maxRef.current.value = initialValues.salary_max;
    remoteRef.current.value = initialValues.location_remote;
    setTempLocations(initialValues.location_preference);
    setLocationInput('');
    setEditing(false);
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
          setAlert('Something went wrong. Preferences not updated.', 'danger');
          return;
        }
        console.log(record.getId());
        fetchUserProfile();
        setAlert('Preferences successfully updated!', 'success');
        setEditing(false);
      }
    );
  };

  if (userProfile) {
    return (
      <Wrapper>
        <button style={{ border: 'none' }} onClick={handleProfileClick}>
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: '40px', borderRadius: '100px' }}
          />
        </button>

        <Modal
          fullscreen='md-down'
          show={showProfile}
          onHide={handleHideProfile}
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <section style={{ paddingBottom: '2rem' }}>
                <h4 style={{ paddingBottom: '1rem' }}>Account</h4>
                <Form>
                  <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>User</Form.Label>
                    <Form.Control
                      type='text'
                      // ref={nameRef}
                      defaultValue={user.name}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='text'
                      // ref={emailRef}
                      defaultValue={user.email}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                </Form>
              </section>
              <section>
                <h4 style={{ paddingBottom: '1rem' }}>Preferences</h4>
                {!editing ? (
                  <>
                    <Form>
                      <Form.Group className='mb-3' controlId='position'>
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='No position added...'
                          ref={positionRef}
                          defaultValue={initialValues.position}
                          readOnly
                          plaintext
                        />
                      </Form.Group>
                      <Stack direction='horizontal' gap={4}>
                        <Form.Group className='mb-4' controlId='salary-min'>
                          <Form.Label>Salary Minimum ($)</Form.Label>
                          <Form.Control
                            type='number'
                            placeholder='Enter a number...'
                            ref={salary_minRef}
                            defaultValue={initialValues.salary_min}
                            readOnly
                            plaintext
                          />
                        </Form.Group>
                        <span style={{ paddingTop: '1rem' }}>-</span>
                        <Form.Group className='mb-4' controlId='salary-max'>
                          <Form.Label>Salary Maximum ($)</Form.Label>
                          <Form.Control
                            type='number'
                            placeholder='Enter a number...'
                            ref={salary_maxRef}
                            defaultValue={initialValues.salary_max}
                            readOnly
                            plaintext
                          />
                        </Form.Group>
                      </Stack>
                      <Form.Group className='mb-1' controlId='location'>
                        <Form.Label>Locations</Form.Label>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.25rem',
                            color: 'black',
                          }}
                        >
                          {userProfile.fields.location_preference &&
                            tempLocations.map((location) => (
                              <Badge
                                key={location}
                                pill
                                bg='light'
                                className='me-1'
                                style={{
                                  color: 'var(--grey-600)',
                                  border: '1px solid var(--grey-300)',
                                  fontWeight: '600',
                                  cursor: 'default',
                                  padding: '6px 8px',
                                }}
                              >
                                {location}
                              </Badge>
                            ))}
                        </div>
                      </Form.Group>

                      <Form.Group className='mb-4' controlId='remote'>
                        <Form.Check
                          label='Remote preferred'
                          ref={remoteRef}
                          defaultChecked={initialValues.location_remote}
                          disabled
                        />
                      </Form.Group>
                      <div style={{ marginBottom: '4.4rem' }}></div>
                    </Form>
                  </>
                ) : (
                  <>
                    <Form>
                      <Form.Group className='mb-3' controlId='position'>
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='No position added...'
                          ref={positionRef}
                          defaultValue={initialValues.position}
                        />
                      </Form.Group>
                      <Stack direction='horizontal' gap={4}>
                        <Form.Group className='mb-4' controlId='salary-min'>
                          <Form.Label>Salary Minimum ($)</Form.Label>
                          <Form.Control
                            type='number'
                            placeholder='Enter a number...'
                            ref={salary_minRef}
                            defaultValue={initialValues.salary_min}
                            // style={{ maxWidth: '120px' }}
                          />
                        </Form.Group>
                        <span style={{ paddingTop: '1rem' }}>-</span>
                        <Form.Group className='mb-4' controlId='salary-max'>
                          <Form.Label>Salary Maximum ($)</Form.Label>
                          <Form.Control
                            type='number'
                            placeholder='Enter a number...'
                            ref={salary_maxRef}
                            defaultValue={initialValues.salary_max}
                          />
                        </Form.Group>
                      </Stack>
                      <Form.Group className='mb-1' controlId='location'>
                        <Form.Label>Locations</Form.Label>
                        <InputGroup className='mb-1'>
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
                        <div
                          style={{
                            marginTop: '.5rem',
                            display: 'flex',
                          }}
                        >
                          {userProfile.fields.location_preference &&
                            tempLocations.map((location) => (
                              <Badge
                                key={location}
                                pill
                                bg='light'
                                className='me-1'
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: 'var(--grey-600)',
                                  border: '1px solid var(--grey-300)',
                                  fontWeight: '600',
                                  cursor: 'default',
                                }}
                              >
                                {location}
                                <span style={{ paddingLeft: '8px' }}>
                                  <MdOutlineClose
                                    onClick={() =>
                                      handleRemoveLocation(location)
                                    }
                                    style={{
                                      color: 'var(--grey-500)',
                                      width: '16px',
                                      height: '16px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                </span>
                              </Badge>
                            ))}
                        </div>
                      </Form.Group>

                      <Form.Group className='mb-4' controlId='remote'>
                        <Form.Check
                          label='Remote preferred'
                          ref={remoteRef}
                          defaultChecked={initialValues.location_remote}
                        />
                      </Form.Group>
                    </Form>
                  </>
                )}
              </section>
            </>
          </Modal.Body>
          <Modal.Footer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
              }}
            >
              {!editing ? (
                <Button variant='outline-secondary' onClick={handleEditClick}>
                  Edit
                </Button>
              ) : (
                <>
                  <Button variant='primary' onClick={handleSavePrefClick}>
                    Save
                  </Button>
                  <Button
                    variant='outline-secondary'
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    );
  }
};
export default ModalProfile;

const Wrapper = styled.div`
  */ img {
    width: 100px;
  }
`;

//  TRY 2

//   // if (userProfile) {
//   return (
//     <Wrapper>

//               {!editing ? (
//                 <>

//                 </>
//               ) : (
//                 <>
//                   <Form>

//                     <Form.Group className='mb-4' controlId='location'>
//                       <Form.Label>Locations</Form.Label>
//                       <InputGroup className='mb-2'>
//                         <Form.Control
//                           type='text'
//                           placeholder='Add a location...'
//                           ref={locationRef}
//                           value={locationInput}
//                           onChange={(e) => setLocationInput(e.target.value)}
//                         />
//                         <Button
//                           variant='outline-secondary'
//                           id='button-addon2'
//                           onClick={handleAddLocation}
//                           disabled={!locationInput}
//                         >
//                           Add
//                         </Button>
//                       </InputGroup>
//                       {userProfile.fields.location_preference &&
//                         tempLocations.map((location) => (
//                           <Badge
//                             key={location}
//                             pill
//                             bg='secondary'
//                             className='me-1'
//                           >
//                             {location}
//                             <span style={{ paddingLeft: '8px' }}>
//                               <MdOutlineClose
//                                 onClick={() => handleRemoveLocation(location)}
//                                 style={{
//                                   color: 'var(--grey-600)',
//                                   width: '16px',
//                                   height: '16px',
//                                   cursor: 'pointer',
//                                 }}
//                               />
//                             </span>
//                           </Badge>
//                         ))}
//                     </Form.Group>

//                     <Form.Group className='mb-4' controlId='remote'>
//                       <Form.Check
//                         label='Remote preferred'
//                         ref={remoteRef}
//                         defaultChecked={initialValues.location_remote}
//                       />
//                     </Form.Group>
//                   </Form>
//                   <div className='sheet-footer'>
// <Button variant='secondary' onClick={handleCancelClick}>
//   Cancel
// </Button>
// <Button variant='primary' onClick={handleSavePrefClick}>
//   Save Preferences
// </Button>
//                   </div>
//               )}
//                 </>
//             </div>
//           </>
//         </Modal.Body>
//         {/* <Modal.Footer></Modal.Footer> */}
//       </Modal>
//     </Wrapper>
//   );
// }
// export default ModalProfile;

// const Wrapper = styled.div`
//   */ img {
//     width: 100px;
//   }
//   h4 {
//     padding-bottom: 0.5rem;
//   }
//   h6 {
//     margin-bottom: 0.25rem;
//   }
//   .container {
//     display: flex;
//     flex-direction: column;
//     gap: 0.25rem;
//     padding-bottom: 40px;
//   }
//   .field {
//     padding-bottom: 0.5rem;
//   }
// `;

// TRY 1

// import React, { useState, useContext } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import styled from 'styled-components';
// import { useAuth0 } from '@auth0/auth0-react';
// import { AirtableContext } from '../context/AirtableContext';
// import ModalEditPref from './ModalEditPref';
// import { Badge } from 'react-bootstrap';

// function ModalProfile() {
//   const { user } = useAuth0();
//   const { userProfile } = useContext(AirtableContext);
//   const [showProfile, setShowProfile] = useState(false);
//   const handleHideProfile = () => setShowProfile(false);
//   const handleShowProfile = () => setShowProfile(true);

//   console.log('userProfile', userProfile);

//   return (
//     <>
//       <button style={{ border: 'none' }} onClick={handleShowProfile}>
//         <img
//           src={user.picture}
//           alt={user.name}
//           style={{ width: '40px', borderRadius: '100px' }}
//         />
//       </button>

//       <Modal fullscreen='md-down' show={showProfile} onHide={handleHideProfile}>
//         <Modal.Header closeButton>
//           <Modal.Title>Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Wrapper>
//             <div>
//               <div>
//                 <div className='container'>
//                   <h4>Account</h4>

//                   <div className='field'>
//                     <h6>Name </h6>
//                     <span className='text-secondary'>{user.name}</span>
//                   </div>

//                   <div className='field'>
//                     <h6>Email </h6>
//                     <span className='text-secondary'>{user.email}</span>
//                   </div>
//                 </div>

//                 {userProfile && (
//                   <div className='container'>
//                     <h4>Job Preferences</h4>

//                     <div className='field'>
//                       <h6>Desired position </h6>
//                       <span className='text-secondary'>
//                         {userProfile.fields.position || 'No position added yet'}
//                       </span>
//                     </div>

//                     <div className='field'>
//                       <h6>Locations</h6>
//                       {userProfile.fields.location_preference &&
//                       userProfile.fields.location_preference.length > 0 ? (
//                         userProfile.fields.location_preference.map(
//                           (location) => (
//                             <Badge
//                               key={location}
//                               pill
//                               bg='secondary'
//                               className='me-2'
//                               style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'flex-start',
//                                 width: 'auto',
//                               }}
//                             >
//                               {location}
//                             </Badge>
//                           )
//                         )
//                       ) : (
//                         <span>No location added yet</span>
//                       )}
//                     </div>

//                     <div className='field'>
//                       <h6>Remote</h6>
//                       <span className='text-secondary'>
//                         {userProfile.fields.location_remote ? 'Yes' : 'No'}
//                       </span>
//                     </div>

//                     <div className='field'>
//                       <h6>Salary</h6>
//                       <span className='text-secondary'>
//                         ${userProfile.fields.salary_min.toLocaleString()}-
//                         {userProfile.fields.salary_max.toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Wrapper>
//         </Modal.Body>
//         <Modal.Footer>
//           <ModalEditPref />
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default ModalProfile;

// const Wrapper = styled.div`
//   */ img {
//     width: 100px;
//   }
//   h4 {
//     padding-bottom: 0.5rem;
//   }
//   h6 {
//     margin-bottom: 0.25rem;
//   }
//   .container {
//     display: flex;
//     flex-direction: column;
//     gap: 0.25rem;
//     padding-bottom: 40px;
//   }
//   .field {
//     padding-bottom: 0.5rem;
//   }
// `;
