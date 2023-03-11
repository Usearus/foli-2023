import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h6>Page not found</h6>
      <LinkContainer to='/'>
        <Button variant='primary'>Back Home</Button>
      </LinkContainer>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: calc(100vh - 63px);
  font-size: larger;
`;
