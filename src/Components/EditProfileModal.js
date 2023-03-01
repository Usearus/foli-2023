import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import EditPrefModal from '../Components/EditPrefModal';

function EditProfileModal() {
  const { user } = useAuth0();
  const { userProfile } = useContext(AirtableContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button style={{ border: 'none' }} onClick={handleShow}>
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: '40px', borderRadius: '100px' }}
        />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <div>
              <img
                src={user.picture}
                alt={user.name}
                style={{ borderRadius: '100px' }}
              />
            </div>
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
                    <h4>Preferences</h4>

                    <div className='field'>
                      <h6>Position </h6>
                      <span className='text-secondary'>
                        {userProfile.fields.position}
                      </span>
                    </div>

                    <div className='field'>
                      <h6>Location(s) </h6>
                      <span className='text-secondary'>
                        {userProfile.fields.location_preference}
                      </span>
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
          <EditPrefModal />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfileModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* padding: 20px; */
  gap: 2rem;
  img {
    width: 100px;
  }
  h4 {
    padding-bottom: 0.5rem;
  }
  h6 {
    margin-bottom: 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 20px;
  }
  .field {
    padding-bottom: 0.5rem;
  }
`;
