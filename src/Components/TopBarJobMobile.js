import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import { Navbar, Nav, Container, Stack, Form } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';
import { supabase } from '../API/supabase';
import useAlert from '../Custom Hooks/useAlert';

const TopBarJobMobile = ({ className }) => {
    const { currentJob, fetchUserJobs } = useContext(DatabaseContext);
    const { setAlert } = useAlert();

    const [selectedStatus, setSelectedStatus] = useState(currentJob.status);

    const handleUpdateStatusClick = async (e) => {
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

    return (
        <Wrapper className={className}>
            <Container fluid>
                <Navbar
                    collapseOnSelect
                    expand='md'
                    style={{
                        padding: '8px 16px',
                        background: 'var(--grey-200)',
                        position: 'sticky',
                        top: '0',
                        zIndex: '1',
                    }}
                >
                    <Container fluid>
                        <Stack>
                            <h5>
                                {currentJob
                                    ? `${currentJob.company} - ${currentJob.position}`
                                    : ''}
                            </h5>
                            <Form>
                                <Form.Select
                                    size='sm'
                                    aria-label='Select job status'
                                    onChange={handleUpdateStatusClick}
                                    value={selectedStatus}
                                    className={`select ${selectedStatus}`}
                                >
                                    <option value='Bookmarked'>
                                        Bookmarked
                                    </option>
                                    <option value='Applied'>Applied</option>
                                    <option value='Interviewing'>
                                        Interviewing
                                    </option>
                                    <option value='Negotiating'>
                                        Negotiating
                                    </option>
                                    <option value='Accepted'>Accepted</option>
                                    <option value='Declined'>Declined</option>
                                    <option value='Rejected'>Rejected</option>
                                    <option value='Archived'>Archived</option>
                                </Form.Select>
                            </Form>
                        </Stack>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <SideBar />
                            <Nav variant='pills' className='me-auto'></Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </Wrapper>
    );
};

export default TopBarJobMobile;

const Wrapper = styled.div`
    width: 100%;
    .top-bar-container {
        background: var(--grey-200);
        justify-content: space-between;
        border-bottom: 1px solid var(--grey-200);
        color: var(--grey-700);
        padding: 1rem;
    }

    .select {
        cursor: pointer;
        max-width: 140px;
        border: 1px solid var(--grey-600);
        color: var(--grey-600);
        background-color: var(--grey-100);
        border-radius: 90px;
        margin-top: 0.5rem;
    }
`;
