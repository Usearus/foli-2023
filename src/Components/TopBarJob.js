// import { BiCaretDown } from 'react-icons/bi';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import AddSheetModal from './AddSheetModal';

export const TopBarJob = ({ className, job }) => {
  return (
    <Wrapper className={className}>
      <Container fluid>
        <Stack direction='horizontal' gap={3} className='top-bar-container'>
          <h4>
            {job.fields.company} - {job.fields.position}
          </h4>
          {/* <span className="img-center">
            <BiCaretDown />
          </span> */}
          <AddSheetModal />
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

export default TopBarJob;
