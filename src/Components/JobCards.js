import { useContext, useState } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import { Form, Dropdown, Card, Button } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { supabase } from '../API/supabase';
import ModalEditJob from './ModalEditJob';

const JobsTableRow = (job) => {
    const { fetchUserJobs, fetchCurrentJob, fetchCurrentSheets } =
        useContext(DatabaseContext);

    const { setAlert } = useAlert();
    const navigate = useNavigate();

    const [selectedEventKey, setSelectedEventKey] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(job.status);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <Wrapper>
            <Card>
                <Card.Header as='h6'>
                    {job.company} - {job.position}
                </Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to
                        additional content.
                    </Card.Text>
                    <Button variant='primary'>Go somewhere</Button>
                </Card.Body>
            </Card>
            {showDeleteModal && (
                <ModalDeleteConfirmation
                    show={showDeleteModal}
                    // close={handleCloseReset}
                    object={job}
                    type='job'
                />
            )}

            {showEditModal && (
                <ModalEditJob
                    show={showEditModal}
                    // close={handleCloseReset}
                    job={job}
                />
            )}
        </Wrapper>
    );
};

export default JobsTableRow;

const Wrapper = styled.div`
    /* width: 80vw; */

    .select {
        cursor: pointer;
        min-width: 132px;
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
