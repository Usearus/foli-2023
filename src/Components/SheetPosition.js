import { useState, useContext, useRef } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { AirtableContext } from '../context/AirtableContext';
import { BiCopy } from 'react-icons/bi';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { supabase } from '../API/supabase';

const SheetPosition = () => {
  const [editing, setEditing] = useState(false);
  const {
    currentJob,
    fetchCurrentSheets,
    fetchCurrentJob,
    fetchUserJobs,
    positionSheet,
  } = useContext(AirtableContext);
  const { setAlert } = useAlert();

  const companyRef = useRef();
  const positionRef = useRef();
  const salary_minRef = useRef();
  const salary_maxRef = useRef();
  const locationRef = useRef();
  const remoteRef = useRef();
  const linkRef = useRef();

  const initialValues = {
    company: currentJob?.company ?? '',
    position: currentJob?.position ?? '',
    salary_min: currentJob?.salary_min ?? '',
    salary_max: currentJob?.salary_max ?? '',
    location: currentJob?.location ?? '',
    remote: currentJob?.remote ?? false,
    link: currentJob?.link ?? '',
  };

  const handleUpdateJobClick = async () => {
    const { error } = await supabase
      .from('jobs')
      .update({
        company: companyRef.current.value,
        position: positionRef.current.value,
        salary_min: salary_minRef.current.value * 1,
        salary_max: salary_maxRef.current.value * 1,
        location: locationRef.current.value,
        remote: remoteRef.current.checked,
        link: linkRef.current.value,
        status: 'Bookmarked',
        edited: new Date().toLocaleDateString('en-US'),
      })
      .eq('id', currentJob.id);
    setAlert('Job successfully updated!', 'success');
    fetchCurrentSheets(currentJob);
    fetchCurrentJob(currentJob);
    fetchUserJobs(currentJob);
    setEditing(false);

    if (error) {
      setAlert('Something went wrong. Sheet not updated.', 'danger');
      console.log('error is', error);
      return;
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    positionRef.current.value = initialValues.position;
    salary_minRef.current.value = initialValues.salary_min;
    salary_maxRef.current.value = initialValues.salary_max;
    remoteRef.current.value = initialValues.remote;
    locationRef.current.value = initialValues.location;
    linkRef.current.value = initialValues.link;
    setEditing(false);
  };

  const handleCopyLinkClick = () => {
    navigator.clipboard
      .writeText(linkRef.current.value)
      .then(() => {
        setAlert('Link copied to clickboard', 'success');
      })
      .catch(() => {
        setAlert('Failed to copy link to clipboard', 'warning');
      });
  };

  if (positionSheet) {
    return (
      <>
        <Wrapper className='sheet-container'>
          <header className='sheet-title'>
            <h5>Position Details</h5>
          </header>
          <section className='sheet-content'>
            {!editing ? (
              <>
                <Form>
                  <Form.Group className='mb-3' controlId='company'>
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Google, Apple, etc.'
                      ref={companyRef}
                      defaultValue={initialValues.company}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='position'>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type='text'
                      ref={positionRef}
                      defaultValue={initialValues.position}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='salary-range'>
                    <Form.Label>Salary Range</Form.Label>
                    <div style={{ padding: '7px 0' }}>
                      ${initialValues.salary_min.toLocaleString()} -{' '}
                      {initialValues.salary_max.toLocaleString()}
                    </div>
                  </Form.Group>
                  <Form.Group className='mb-1' controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='No location added'
                      ref={locationRef}
                      defaultValue={initialValues.location}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                  <Form.Group className='mb-1' controlId='remote'>
                    <Form.Check
                      label='Remote preferred'
                      ref={remoteRef}
                      defaultChecked={initialValues.remote}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='link'>
                    <Form.Label>Listing URL</Form.Label>
                    <Stack
                      direction='horizontal'
                      gap='2'
                      className='link-element'
                    >
                      <Form.Control
                        type='text'
                        placeholder='Paste in URL'
                        ref={linkRef}
                        defaultValue={initialValues.link}
                        readOnly
                        plaintext
                      />
                      <Button variant='outline-secondary fade-in'>
                        <BiCopy onClick={handleCopyLinkClick} />
                      </Button>
                    </Stack>
                  </Form.Group>
                </Form>
                <div className='sheet-footer'>
                  <Button
                    variant='outline-secondary fade-up'
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Form>
                  <Form.Group className='mb-3' controlId='company'>
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Google, Apple, etc.'
                      ref={companyRef}
                      defaultValue={initialValues.company}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='position'>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type='text'
                      ref={positionRef}
                      defaultValue={initialValues.position}
                    />
                  </Form.Group>
                  <Stack direction='horizontal' gap={4}>
                    <Form.Group className='mb-3' controlId='salary-min'>
                      <Form.Label>Salary Min ($)</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='40,000'
                        ref={salary_minRef}
                        defaultValue={initialValues.salary_min}
                      />
                    </Form.Group>
                    <span style={{ paddingTop: '1rem' }}>-</span>
                    <Form.Group className='mb-3' controlId='salary-max'>
                      <Form.Label>Salary Max ($)</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='60,000'
                        ref={salary_maxRef}
                        defaultValue={initialValues.salary_max}
                      />
                    </Form.Group>
                  </Stack>
                  <Form.Group className='mb-1' controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Start typing a city...'
                      ref={locationRef}
                      defaultValue={initialValues.location}
                    />
                  </Form.Group>
                  <Form.Group className='mb-1' controlId='remote'>
                    <Form.Check
                      label='Remote preferred'
                      ref={remoteRef}
                      defaultChecked={initialValues.remote}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='link'>
                    <Form.Label>Listing URL</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Add website location of job listing'
                      ref={linkRef}
                      defaultValue={initialValues.link}
                    />
                  </Form.Group>
                </Form>
                <div className='sheet-footer'>
                  <Button variant='primary' onClick={handleUpdateJobClick}>
                    Save
                  </Button>
                  <Button
                    variant='outline-secondary'
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </section>
        </Wrapper>
      </>
    );
  }
};
export default SheetPosition;

const Wrapper = styled.div`
  margin-right: 1rem;
  Form {
    padding: 1rem;
  }

  .fade-in {
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .link-element:hover .fade-in {
    opacity: 1;
  }

  .fade-up {
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(10px);
  }

  :hover .fade-up {
    opacity: 1;
    transform: translateY(0);
  }

  .sheet-title {
    height: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .sheet-content {
    display: flex;
    flex-direction: column;
    width: 20rem;
    max-height: 75vh;
    background: var(--white);
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    position: relative;
  }

  .sheet-content:hover {
    box-shadow: var(--shadow-4);
  }

  .sheet-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
  }
`;
