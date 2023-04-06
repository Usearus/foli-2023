import { useState, useRef, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DatabaseContext } from '../context/DatabaseContext';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { Button, Modal, Form, Stack } from 'react-bootstrap';
import { supabase } from '../API/supabase';

const ModalAddJob = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { setAlert } = useAlert();

    const { user } = useAuth0();
    const { fetchUserJobs } = useContext(DatabaseContext);

    const companyRef = useRef();
    const positionRef = useRef();
    const salary_minRef = useRef();
    const salary_maxRef = useRef();
    const locationRef = useRef();
    const remoteRef = useRef();
    const linkRef = useRef();

    const handleAddJobClick = async () => {
        let salary_min = salary_minRef.current.value.trim();
        let salary_max = salary_maxRef.current.value.trim();

        if (salary_min === '') {
            salary_min = null;
        } else {
            salary_min = parseInt(salary_min);
        }

        if (salary_max === '') {
            salary_max = null;
        } else {
            salary_max = parseInt(salary_max);
        }

        const { data, error } = await supabase
            .from('jobs')
            .insert({
                account: user.email,
                company: companyRef.current.value,
                position: positionRef.current.value,
                salary_min: salary_min,
                salary_max: salary_max,
                location: locationRef.current.value,
                remote: remoteRef.current.checked,
                link: linkRef.current.value,
                status: 'Bookmarked',
                edited: new Date().toLocaleDateString('en-US'),
            })
            .select();

        if (error) {
            setAlert('There was an error adding the job.', 'error');
            return;
        }

        fetchUserJobs();
        setAlert('Job successfully added!', 'success');
        const newJobId = data[0].id;
        // console.log('newJobId', newJobId);
        await supabase.from('sheets').insert({
            title: 'Job Description',
            content: '<p>Start by pasting in the job description.</p>',
            account: user.email,
            jobid: newJobId,
        });
        handleClose();
    };

    return (
        <Wrapper>
            <Button variant='primary' onClick={handleShow}>
                Add Job
            </Button>

            <Modal fullscreen='md-down' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add job to track</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='company'>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Google, Apple, etc.'
                                ref={companyRef}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3 ' controlId='position'>
                            <Form.Label>Position</Form.Label>
                            <Form.Control type='text' ref={positionRef} />
                        </Form.Group>
                        <Stack direction='horizontal' gap={4}>
                            <Form.Group className='mb-3' controlId='salary-min'>
                                <Form.Label className='test'>
                                    Salary Min ($)
                                </Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='40,000'
                                    ref={salary_minRef}
                                />
                            </Form.Group>
                            <span style={{ paddingTop: '1rem' }}>-</span>
                            <Form.Group className='mb-3' controlId='salary-max'>
                                <Form.Label>Salary Max ($)</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='60,000'
                                    ref={salary_maxRef}
                                />
                            </Form.Group>
                        </Stack>
                        {/* TODO  <LocationAutocompleteBtn /> */}
                        <Form.Group className='mb-1' controlId='location'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Start typing a city...'
                                ref={locationRef}
                            />
                        </Form.Group>
                        <Form.Group className='mb-1' controlId='remote'>
                            <Form.Check
                                label='Remote position'
                                ref={remoteRef}
                                defaultChecked={false}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='link'>
                            <Form.Label>Listing URL</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Add URL of job listing'
                                ref={linkRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='submit'
                        variant='outline-secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleAddJobClick}>
                        Add Job
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
};

export default ModalAddJob;

const Wrapper = styled.div`
    .editor {
        height: 250px;
        max-height: 500px;
        overflow-y: auto;
    }
`;
