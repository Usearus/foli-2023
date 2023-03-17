import { useContext } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { AirtableContext } from '../context/AirtableContext';
import useAlert from '../Custom Hooks/useAlert';
import base from '../API/base';

const ModalDeleteConfirmation = ({ show, close, type, job }) => {
  const { setAlert } = useAlert();
  const { fetchUserJobs } = useContext(AirtableContext);

  const handleDeleteJobClick = (e) => {
    base('jobs').destroy(job.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        setAlert('Something went wrong. Job not deleted.', 'Danger');
        return;
      }
      // console.log('Deleted record', deletedRecord.id);
      setAlert('Job successfully deleted!', 'success');
      fetchUserJobs();
    });
  };

  return (
    <>
      <Modal fullscreen='md-down' show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <p>Are you sure you want to delete this {type}?</p>
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={close}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDeleteJobClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteConfirmation;

const Wrapper = styled.div`
  h4 {
    padding-bottom: 0.5rem;
  }
  h6 {
    margin-bottom: 0.25rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 40px;
  }
  .field {
    padding-bottom: 0.5rem;
  }
`;
