import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Wrapper>
        <h1>Welcome to Foli</h1>
        <Button variant='primary' onClick={() => loginWithRedirect()}>
          Log In / Sign Up
        </Button>
      </Wrapper>
    );
  }
  return <Navigate to='/' />;
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
`;
