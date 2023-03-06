import { useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddJob from './ModalAddJob';
import { AirtableContext } from '../context/AirtableContext';

export const TopBarTable = ({ className }) => {
  const {
    checkedCount,
    setCheckedCount,
    batchActionsVisible,
    setBatchActionsVisible,
  } = useContext(AirtableContext);

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
  .top-bar-container {
    background: var(--grey-100);
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-300);
    color: var(--grey-700);
    padding: 1rem;
  }
`;

export default TopBarTable;
