import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import TemplateSidebar from './TemplateSidebar';
import TemplateCardGrid from './TemplateCardGrid';

function ModalTemplates() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant='outline-secondary' onClick={() => setShow(true)}>
        Templates
      </Button>

      <Modal
        size='xl'
        fullscreen='lg-down'
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <TemplateSidebar />
            <TemplateCardGrid />
          </Wrapper>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTemplates;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
