import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FiTrash } from 'react-icons/fi';

function ModalDeleteConfirmation({ type, deleteFunction }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='outline-secondary' onClick={handleShow}>
        <FiTrash />
      </Button>

      <Modal fullscreen='md-down' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <p>Are you sure you want to delete this {type}?</p>
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteFunction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
