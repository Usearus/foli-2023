import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import foliImage from '../assets/foli-wireframe.png';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Wrapper>
        <div className='left-container'>
          <h1>
            Welcome to{' '}
            <span>
              fol<i>i</i>
            </span>
          </h1>
          <p>
            We are currently in alpha. Expected unpolished design and frequent
            bugs. Feedback & suggestions welcomed!
          </p>
          <Button variant='primary' onClick={() => loginWithRedirect()}>
            Log In / Sign Up
          </Button>
        </div>
        <div className='right-container'>
          <div className='header-image'>
            <h2>
              <span>Simplify</span> your job search to one screen
            </h2>
            <img src={foliImage} alt='foliImage' />
          </div>
        </div>
      </Wrapper>
    );
  }
  return <Navigate to='/' />;
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .left-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    min-width: 600px;
    height: 100vh;
    padding: 3rem;
  }

  .right-container {
    background: #b3b3fd;
    height: 100vh;
    width: 100%;
    padding-left: 5rem;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    display: none;
  }

  @media (min-width: 1200px) {
    .right-container {
      display: flex;
    }
  }

  .header-image {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  span {
    font-weight: 700;
    color: #4f12b2;
  }

  p {
    max-width: 500px;
    text-align: center;
  }

  img {
    max-width: 100%;
    max-height: 80vh;
  }
`;
