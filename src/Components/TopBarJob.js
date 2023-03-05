// import { BiCaretDown } from 'react-icons/bi';
import Badge from 'react-bootstrap/Badge';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddSheet from './ModalAddSheet';
import { AirtableContext } from '../context/AirtableContext';
import ModalTemplates from './ModalTemplates';
// import { Form } from 'react-bootstrap';

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
            {/* <Form.Select aria-label='Default select example'>
              <option value='1'>Bookmarked</option>
              <option value='2'>Applied</option>
              <option value='3'>Interviewing</option>
            </Form.Select> */}

            <Badge pill bg='secondary'>
              {currentJob && currentJob.fields
                ? `${currentJob.fields.status}`
                : ''}
            </Badge>
          </div>
          {/* <span className="img-center">
            <BiCaretDown />
          </span> */}
          <div className='btns'>
            <ModalTemplates />
            <ModalAddSheet />
          </div>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default TopBarJob;

const Wrapper = styled.div`
  .btns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .left-content {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: baseline;
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
