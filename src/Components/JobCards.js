import { useContext, useState } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Stack } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { supabase } from '../API/supabase';

const JobsTableRow = (job) => {
    const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
        useContext(DatabaseContext);
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState(job.status);

    const handleEditJobClick = async (e) => {
        setSelectedStatus(e.target.value);
        const { error } = await supabase
            .from('jobs')
            .update({
                status: e.target.value,
                edited: new Date().toLocaleDateString('en-US'),
            })
            .eq('id', job.id);
        setAlert('Job successfully updated!', 'success');
        fetchUserJobs();
        if (error) {
            setAlert('Something went wrong. Job not updated.', 'danger');
            console.log('error is', error);
            return;
        }
    };

    const handleCardClick = async () => {
        await fetchCurrentJob(job);
        await fetchCurrentSheets(job);
        navigate(`/job/id:${job.id}`);
    };

    return (
        <Wrapper>
            <Card className='card-container'>
                <Card.Header onClick={handleCardClick}>
                    <h6>{job.company}</h6>
                </Card.Header>
                <Card.Body onClick={handleCardClick}>
                    <Card.Title>{job.position}</Card.Title>
                    <Card.Text>
                        <span>
                            {job.salary_min && job.salary_max
                                ? `$${job.salary_min.toLocaleString()} -
                            ${job.salary_max.toLocaleString()}`
                                : ''}
                        </span>
                        <br />
                        <span>{job.location ? job.location : ''}</span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Stack direction='horizontal ms-auto'>
                        <Form>
                            <Form.Select
                                size='sm'
                                aria-label='Select job status'
                                onChange={handleEditJobClick}
                                value={selectedStatus}
                                className={`select ${selectedStatus}`}
                            >
                                <option value='Bookmarked'>Bookmarked</option>
                                <option value='Applied'>Applied</option>
                                <option value='Interviewing'>
                                    Interviewing
                                </option>
                                <option value='Negotiating'>Negotiating</option>
                                <option value='Accepted'>Accepted</option>
                                <option value='Declined'>Declined</option>
                                <option value='Rejected'>Rejected</option>
                                <option value='Archived'>Archived</option>
                            </Form.Select>
                        </Form>
                        <div className='ms-auto edited-text'>
                            {new Date(job.edited).toLocaleDateString()}
                        </div>
                    </Stack>
                </Card.Footer>
            </Card>
        </Wrapper>
    );
};

export default JobsTableRow;

const Wrapper = styled.div`
    padding: 1rem;

    .card-header {
        background: var(--primary-50);
    }

    .card-footer {
        background: var(--white);
        border: 0;
        padding-bottom: 1rem;
        padding-top: 0;
    }

    .edited-text {
        /* font-style: italic; */
        font-size: small;
    }

    .select {
        cursor: pointer;
        min-width: 132px;
        max-width: 150px;
        border: 1px solid var(--grey-600);
        border-radius: 90px;
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
    }
`;
