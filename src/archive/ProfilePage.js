import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import EditPrefModal from '../Components/EditPrefModal';

function ProfilePage() {
  const { user } = useAuth0();
  const { userProfile } = React.useContext(AirtableContext);
  console.log('profile page profile', userProfile);
  console.log('profile fields', userProfile);

  return (
    <Wrapper>
      <div>
        <img
          src={user.picture}
          alt={user.name}
          style={{ borderRadius: '100px' }}
        />
      </div>
      <div className='container-col'>
        <div className='container'>
          <h3>Profile</h3>
          <h6>
            <strong>Name:</strong> {user.name}
          </h6>
          <h6>
            <strong>Title: </strong>
            {userProfile.fields.title}
          </h6>
          <h6>
            <strong>Email:</strong> {user.email}
          </h6>
        </div>
        <div className='container'>
          <h3>Preferences</h3>
          <h6>
            <strong>Location(s): </strong>
            {userProfile.fields.location_preference}
          </h6>
          <h6>
            <strong>Remote: </strong>
            {userProfile.fields.location_remote ? 'Yes' : 'No'}
          </h6>
          <h6>
            <strong>Salary: </strong>$
            {userProfile.fields.salary_min.toLocaleString()} -{' '}
            {userProfile.fields.salary_max.toLocaleString()}
          </h6>
          <EditPrefModal />
        </div>
      </div>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 63px);
  padding: 20px;
  gap: 2rem;
  img {
    width: 100px;
  }
  h3 {
    padding-bottom: 1rem;
  }
  .container-col {
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }
  .container-row {
    display: flex;
    flex-direction: row;
    gap: 0rem;
  }
`;
