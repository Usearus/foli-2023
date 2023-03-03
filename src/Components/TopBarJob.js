// import { BiCaretDown } from 'react-icons/bi';
import Badge from 'react-bootstrap/Badge';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddSheet from './ModalAddSheet';
import { AirtableContext } from '../context/AirtableContext';

export const TopBarJob = ({ className }) => {
  const { setCurrentJob, currentJob } = React.useContext(AirtableContext);

  React.useEffect(() => {
    const jobFromStorage = localStorage.getItem('currentJob');
    setCurrentJob(JSON.parse(jobFromStorage));
  }, [setCurrentJob]);

  return (
    <Wrapper className={className}>
      <Container fluid>
        <Stack direction='horizontal' gap={3} className='top-bar-container'>
          <div className='left-content'>
            <h4>
              {currentJob && currentJob.fields
                ? `${currentJob.fields.company} - ${currentJob.fields.position}`
                : ''}
            </h4>

            <Badge pill bg='secondary'>
              {currentJob && currentJob.fields
                ? `${currentJob.fields.status}`
                : ''}
            </Badge>
          </div>
          {/* <span className="img-center">
            <BiCaretDown />
          </span> */}
          <ModalAddSheet />
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default TopBarJob;

const Wrapper = styled.div`
  .left-content {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    gap: 1rem;
  }
  .top-bar-container {
    background: var(--grey-100);
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-300);
    color: var(--grey-700);
    padding: 1rem;
  }
`;
