import { Modal } from 'react-bootstrap';
import TemplateCardGrid from './TemplateCardGrid';

const ModalTemplates = ({ show, closeTemplateModal }) => {
  return (

      <Modal
        size='md'
        fullscreen='sm-down'
        show={show}
        onHide={closeTemplateModal}
        scrollable
      >
          <Modal.Header closeButton style={{ background: 'var(--grey-100)' }}>
                <Modal.Title>Templates</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: 'var(--grey-100)' }}>
              <TemplateCardGrid closeTemplateModal={closeTemplateModal} />
          </Modal.Body>
          <Modal.Footer style={{ background: 'var(--grey-100)' }}></Modal.Footer>
      </Modal>
  );
};

export default ModalTemplates;