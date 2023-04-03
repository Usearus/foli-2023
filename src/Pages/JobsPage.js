import { useState, useContext, useRef, useEffect } from 'react';
import JobsTable from '../Components/JobTable';
import { DatabaseContext } from '../context/DatabaseContext';
import useAlert from '../Custom Hooks/useAlert';
import { MdOutlineClose } from 'react-icons/md';
import TopBarTable from '../Components/TopBarTable';
import Loader from '../Components/Loader';
import { Badge, Form, Button, InputGroup, Stack, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { supabase } from '../API/supabase';

const JobsPage = () => {
    const { userJobs, userProfile, fetchUserProfile } =
        useContext(DatabaseContext);
    const { setAlert } = useAlert();

    const [locationInput, setLocationInput] = useState('');
    const [tempLocations, setTempLocations] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(undefined);

    const positionRef = useRef();
    const locationRef = useRef();
    const salary_minRef = useRef();
    const salary_maxRef = useRef();
    const remoteRef = useRef();

    // RUNS INITIAL ONBOARDING FOR USERS
    useEffect(() => {
        if (userProfile && userProfile.onboarded === false) {
            setShowModal(true);
            setIsOnboarded(false);
        }
        setIsOnboarded(true);
    }, [userProfile]);

    const handleSubmit = () => {
        handleAddPref();
        setShowModal(false);
        setIsOnboarded(true);
    };

    const handleAddLocation = () => {
        const newLocation = locationInput.trim();
        if (newLocation !== '' && !tempLocations.includes(newLocation)) {
            setTempLocations([...tempLocations, newLocation]);
            setLocationInput('');
        }
    };

    const handleRemoveLocation = (location) => {
        const updatedLocations = tempLocations.filter(
            (loc) => loc !== location
        );
        setTempLocations(updatedLocations);
        console.log('tempLocations removed & updated to', tempLocations);
    };

    const handleAddPref = async () => {
        const { error } = await supabase
            .from('profiles')
            .update({
                position: positionRef.current.value,
                salary_min: salary_minRef.current.value * 1,
                salary_max: salary_maxRef.current.value * 1,
                location_preference: tempLocations,
                location_remote: remoteRef.current.checked,
                onboarded: true,
            })
            .eq('id', userProfile.id);
        fetchUserProfile();

        if (error) {
            setAlert(
                'Something went wrong. Preferences not updated.',
                'danger'
            );
            console.log('error is', error);
            return;
        }
    };

    if (isOnboarded === false) {
        return (
            <Modal
                show={showModal}
                backdrop='static'
                keyboard={false}
                animation={false}
                centered
                style={{ background: '#b3b3fd' }}
                // fullscreen='lg-down'
            >
                <Modal.Header>
                    <Modal.Title>
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                cursor: 'default',
                                paddingRight: '.25rem',
                            }}
                        >
                            fol<i>i</i>
                        </span>
                        <span>
                            <Badge
                                pill
                                bg='dark'
                                style={{
                                    fontSize: '.6rem',
                                    marginRight: '1rem',
                                }}
                            >
                                beta
                            </Badge>
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 style={{ paddingBottom: '2rem', paddingTop: '1rem' }}>
                        Tell us more about your job search
                    </h2>
                    <p>
                        Your response helps tailor your experience. This can be
                        updated in your preferences anytime.
                    </p>
                    <Form>
                        <Form.Group className='mb-4' controlId='position'>
                            <Form.Label>
                                What position are you looking for?
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Add a position'
                                ref={positionRef}
                                defaultValue=''
                            />
                        </Form.Group>
                        <Stack direction='horizontal' gap={4}>
                            <Form.Group className='mb-4' controlId='salary-min'>
                                <Form.Label>Salary Range Goal ($)</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Minimum'
                                    ref={salary_minRef}
                                    defaultValue=''
                                    // style={{ maxWidth: '120px' }}
                                />
                            </Form.Group>
                            <span style={{ paddingTop: '.5rem' }}>-</span>
                            <Form.Group className='mb-4' controlId='salary-max'>
                                <Form.Control
                                    type='number'
                                    placeholder='Maximum'
                                    ref={salary_maxRef}
                                    defaultValue=''
                                    style={{ marginTop: '1.75rem' }}
                                />
                            </Form.Group>
                        </Stack>
                        <Form.Group className='mb-2' controlId='location'>
                            <Form.Label>
                                What locations(s) are in your job search?
                            </Form.Label>
                            <InputGroup className='mb-2'>
                                <Form.Control
                                    type='text'
                                    placeholder='Add a location...'
                                    ref={locationRef}
                                    value={locationInput}
                                    onChange={(e) =>
                                        setLocationInput(e.target.value)
                                    }
                                />
                                <Button
                                    variant='outline-secondary'
                                    id='button-addon2'
                                    onClick={handleAddLocation}
                                    disabled={!locationInput}
                                >
                                    Add
                                </Button>
                            </InputGroup>
                            <div
                                style={{
                                    marginTop: '.5rem',
                                    display: 'flex',
                                }}
                            >
                                {tempLocations.map((location) => (
                                    <Badge
                                        key={location}
                                        pill
                                        bg='light'
                                        className='me-1'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: 'var(--grey-600)',
                                            border: '1px solid var(--grey-300)',
                                            fontWeight: '600',
                                            cursor: 'default',
                                        }}
                                    >
                                        {location}
                                        <span style={{ paddingLeft: '8px' }}>
                                            <MdOutlineClose
                                                onClick={() =>
                                                    handleRemoveLocation(
                                                        location
                                                    )
                                                }
                                                style={{
                                                    color: 'var(--grey-500)',
                                                    width: '16px',
                                                    height: '16px',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </span>
                                    </Badge>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className='mb-4' controlId='remote'>
                            <Form.Check
                                label='Remote preferred'
                                ref={remoteRef}
                                defaultChecked={false}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (!userProfile) {
        return <></>;
    }

    if (isOnboarded === true && userJobs && userJobs.length === 0) {
        return (
            <>
                <TopBarTable />
                <Wrapper>
                    <h5>
                        No jobs are being tracked. Add your first job to get
                        started.
                    </h5>
                </Wrapper>
            </>
        );
    }

    if (isOnboarded === true && userJobs && userJobs.length > 0) {
        return (
            <>
                <TopBarTable />
                <JobsTable jobs={userJobs} />
            </>
        );
    }
    return (
        <>
            <Loader />
        </>
    );
};
export default JobsPage;

const Wrapper = styled.div`
    display: flex;
    padding: 4rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
