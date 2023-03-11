import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Wrapper>
      <Spinner animation='grow' />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default Loader;
