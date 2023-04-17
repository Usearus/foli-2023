import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import TemplateCardGrid from './TemplateCardGrid';
import { DatabaseContext } from '../context/DatabaseContext';
import { Button } from 'react-bootstrap';
import { supabase } from '../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../Custom Hooks/useAlert';
import styled from 'styled-components';

const ModalTemplates = ({ show, closeTemplateModal }) => {
  const { user } = useAuth0();
  const { setAlert } = useAlert();

  const {
    previewTemplate,
    activeTemplate,
    setActiveTemplate,
    setPreviewTemplate,
    currentJob,
    fetchCurrentSheets,
    currentSheets,
} = useContext(DatabaseContext);

const addSheet = async () => {
  await supabase
      .from('sheets')
      .select()
      .eq('id', currentJob.id);
  const { error } = await supabase.from('sheets').insert({
      account: user.email,
      title: activeTemplate.title,
      content: activeTemplate.content,
      jobid: currentJob.id,
      position: currentSheets.length,
  });
  // console.log(data, 'template added');
  fetchCurrentSheets(currentJob);
  setAlert('Sheet successfully added!', 'success');
  if (error) {
      setAlert('There was an error adding the template.', 'error');
      console.log(error);
      return;
  }
};

const handleCloseActive = () => {
  setActiveTemplate(null);
  setPreviewTemplate(false);
};

const handleCloseAndReset = () => {
  setActiveTemplate(null);
  setPreviewTemplate(false);
  closeTemplateModal();
};

const handleAddSheetClick = () => {
  addSheet();
  setActiveTemplate(null);
  setPreviewTemplate(false);
  closeTemplateModal();
};


  return (
      <Modal
        size='md'
        fullscreen='sm-down'
        show={show}
        onHide={handleCloseAndReset}
        scrollable
      >
          <Modal.Header closeButton style={{ background: 'var(--grey-100)' }}>
                <Modal.Title>Templates</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: 'var(--grey-100)' }}>
              <TemplateCardGrid />
          </Modal.Body>
              {!previewTemplate ? ( "" ) : (
          <Modal.Footer style={{ background: 'var(--grey-100)' }}>
            <Wrapper>
                <div className='sheet-footer' style={{}}>
                  <Button
                      variant='outline-secondary'
                      onClick={handleCloseActive}
                  >
                      Back to templates
                  </Button>
                  <Button
                      variant='primary'
                      onClick={handleAddSheetClick}
                      >
                      Add sheet
                  </Button>
              </div>
            </Wrapper>
          </Modal.Footer>
          )}
      </Modal>
  );
};

export default ModalTemplates;
const Wrapper = styled.div`

.sheet-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

`