import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import TemplateSidebar from './TemplateSidebar';
import TemplateCardGrid from './TemplateCardGrid';

const ModalTemplates = ({ show, closeTemplateModal }) => {
  return (
    <>
      <Modal
        size='xl'
        fullscreen='lg-down'
        show={show}
        onHide={closeTemplateModal}
      >
        <Modal.Header closeButton style={{ background: 'var(--grey-100)' }}>
          <Modal.Title>Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'var(--grey-100)' }}>
          <Wrapper>
            <TemplateSidebar />
            <TemplateCardGrid closeTemplateModal={closeTemplateModal} />
          </Wrapper>
        </Modal.Body>
        <Modal.Footer style={{ background: 'var(--grey-100)' }}></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTemplates;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
