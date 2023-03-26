import { useContext, useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddSheet from './ModalAddSheet';
import { AirtableContext } from '../context/AirtableContext';
import ModalTemplates from './ModalTemplates';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { supabase } from '../API/supabase';

const TopBarJob = ({ className }) => {
  const { setCurrentJob, fetchUserJobs, currentJob } =
    useContext(AirtableContext);
  const { setAlert } = useAlert();
  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [showAddSheetModal, setShowAddSheetModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  useEffect(() => {
    const jobFromStorage = localStorage.getItem('currentJob');
    setCurrentJob(JSON.parse(jobFromStorage));
  }, [setCurrentJob]);

  const [selectedStatus, setSelectedStatus] = useState(currentJob.status);

  const handleUpdateJobClick = async (e) => {
    setSelectedStatus(e.target.value);
    const { error } = await supabase
      .from('jobs')
      .update({
        status: e.target.value,
        edited: new Date().toLocaleDateString('en-US'),
      })
      .eq('id', currentJob.id);
    setAlert('Job successfully updated!', 'success');
    fetchUserJobs();

    if (error) {
      setAlert('Something went wrong. Job not updated.', 'danger');
      console.log('error is', error);
      return;
    }
  };

  const handleSelect = (eventKey) => {
    setSelectedEventKey(eventKey);
    if (eventKey === '1') {
      setShowAddSheetModal(true);
    }
    if (eventKey === '2') {
      setShowTemplateModal(true);
    }
  };

  const handleCloseReset = () => {
    setShowAddSheetModal(false);
    setShowTemplateModal(false);
  };

  return (
    <Wrapper className={className}>
      <Container fluid>
        <Stack direction='horizontal' gap={3} className='top-bar-container'>
          <div className='left-content'>
            <h5 className='truncate'>
              {currentJob
                ? `${currentJob.company} - ${currentJob.position}`
                : ''}
            </h5>

            <Form>
              <Form.Select
                size='sm'
                aria-label='Select job status'
                onChange={handleUpdateJobClick}
                value={selectedStatus}
                className={`select ${selectedStatus}`}
              >
                <option value='Bookmarked'>Bookmarked</option>
                <option value='Applied'>Applied</option>
                <option value='Interviewing'>Interviewing</option>
                <option value='Negotiating'>Negotiating</option>
                <option value='Accepted'>Accepted</option>
                <option value='Declined'>Declined</option>
                <option value='Rejected'>Rejected</option>
                <option value='Archived'>Archived</option>
              </Form.Select>
            </Form>
          </div>
          <div className='btns'>
            <DropdownButton
              title='Add Sheet'
              id='add-sheet-dropdown'
              onSelect={handleSelect}
            >
              <Dropdown.Item
                eventKey='1'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '.5rem 1rem',
                }}
              >
                <BiFileBlank style={{ marginRight: '.5rem' }} />
                Blank Sheet
              </Dropdown.Item>
              <Dropdown.Item
                eventKey='2'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '.5rem 1rem',
                }}
              >
                <GrTemplate style={{ marginRight: '.5rem' }} /> From Template
              </Dropdown.Item>
            </DropdownButton>
            {showAddSheetModal && (
              <ModalAddSheet
                show={showAddSheetModal}
                handleClose={handleCloseReset}
              />
            )}
            {showTemplateModal && (
              <ModalTemplates
                show={showTemplateModal}
                closeTemplateModal={handleCloseReset}
              />
            )}
          </div>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default TopBarJob;

const Wrapper = styled.div`
  position: sticky;
  z-index: 1;
  .btns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .truncate {
    font-weight: 600;
    max-width: 400px;
    white-space: nowrap; /* prevent the text from wrapping to a new line */
    overflow: hidden; /* hide any text that overflows the element */
    text-overflow: ellipsis;
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

  .select {
    cursor: pointer;
    min-width: 130px;
    border: 1px solid var(--grey-600);
    color: var(--grey-600);
    background-color: var(--grey-100);
    border-radius: 90px;
  }

  /* option {
    background-color: var(--white);
    color: var(--grey-900);
  }

  .Applied {
    background-color: var(--primary-50);
    color: var(--grey-800);
  }

  .Interviewing {
    background-color: var(--primary-100);
    color: var(--grey-800);
  }

  .Negotiating {
    background-color: var(--primary-200);
    color: var(--black);
  }

  .Accepted {
    background-color: var(--primary-300);
    color: var(--white);
  }

  .Rejected,
  .Declined,
  .Archived {
    background-color: var(--primary-800);
    color: var(--white);
  } */
`;
