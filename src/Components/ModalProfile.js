import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import ModalEditPref from './ModalEditPref';
import { Badge } from 'react-bootstrap';

function ModalProfile() {
  const { user } = useAuth0();
  const { userProfile } = useContext(AirtableContext);
  const [showProfile, setShowProfile] = useState(false);
  const handleHideProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  return (
    <>
      <button style={{ border: 'none' }} onClick={handleShowProfile}>
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: '40px', borderRadius: '100px' }}
        />
      </button>

      <Modal fullscreen='md-down' show={showProfile} onHide={handleHideProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            {/* <div>
              <img
                src={user.picture}
                alt={user.name}
                style={{ borderRadius: '100px' }}
              />
            </div> */}
            <div>
              <div>
                <div className='container'>
                  <h4>Account</h4>

                  <div className='field'>
                    <h6>Name </h6>
                    <span className='text-secondary'>{user.name}</span>
                  </div>

                  <div className='field'>
                    <h6>Email </h6>
                    <span className='text-secondary'>{user.email}</span>
                  </div>
                </div>

                {userProfile && (
                  <div className='container'>
                    <h4>Job Preferences</h4>

                    <div className='field'>
                      <h6>Position </h6>
                      <span className='text-secondary'>
                        {userProfile.fields.position}
                      </span>
                    </div>

                    <div className='field'>
                      <h6>Locations</h6>
                      {userProfile.fields.location_preference &&
                        userProfile.fields.location_preference.map(
                          (location) => (
                            <Badge
                              key={location}
                              pill
                              bg='secondary'
                              className='me-2'
                              style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: 'auto',
                              }}
                            >
                              {location}
                            </Badge>
                          )
                        )}
                    </div>

                    <div className='field'>
                      <h6>Remote</h6>
                      <span className='text-secondary'>
                        {userProfile.fields.location_remote ? 'Yes' : 'No'}
                      </span>
                    </div>

                    <div className='field'>
                      <h6>Salary</h6>
                      <span className='text-secondary'>
                        ${userProfile.fields.salary_min.toLocaleString()}-
                        {userProfile.fields.salary_max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <ModalEditPref />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProfile;

const Wrapper = styled.div`
  */ img {
    width: 100px;
  }
  h4 {
    padding-bottom: 0.5rem;
  }
  h6 {
    margin-bottom: 0.25rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 40px;
  }
  .field {
    padding-bottom: 0.5rem;
  }
`;
