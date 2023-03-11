import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddJob from './ModalAddJob';

export const TopBarTable = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Container fluid>
        <Stack direction='horizontal' gap={3} className='top-bar-container'>
          <div className=' ms-auto'>
            <ModalAddJob />
          </div>
        </Stack>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 63px;
  z-index: 1;
  .top-bar-container {
    background: var(--grey-100);
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-300);
    color: var(--grey-700);
    padding: 1rem;
  }
`;

export default TopBarTable;
