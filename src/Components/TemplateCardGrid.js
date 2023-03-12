import { useContext } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';
import { Button } from 'react-bootstrap';
import MarkdownView from 'react-showdown';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../Custom Hooks/useAlert';
import base from '../API/base';

const TemplateCardGrid = ({ closeTemplateModal }) => {
  const {
    currentTemplates,
    previewTemplate,
    activeTemplate,
    setActiveTemplate,
    setPreviewTemplate,
    currentJob,
    fetchCurrentSheets,
  } = useContext(AirtableContext);

  const { user } = useAuth0();
  const { setAlert } = useAlert();

  const addSheet = () => {
    base('sheets').create(
      [
        {
          fields: {
            account: user.email,
            title: activeTemplate.fields.title,
            content: activeTemplate.fields.content,
            jobid: [currentJob.id],
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          // console.log('added sheet', record.getId());
          fetchCurrentSheets(currentJob);
          setAlert('Sheet successfully added!', 'success');
        });
      }
    );
  };

  const handleAddSheetClick = () => {
    addSheet();
    closeTemplateModal();
  };

  const handleClick = (template) => {
    console.log('template received ', typeof template);
    setActiveTemplate(template);
    setPreviewTemplate(true);
  };

  const handleCloseActive = () => {
    setActiveTemplate(null);
    setPreviewTemplate(false);
  };

  // console.log('previewTemplate ', previewTemplate);
  // console.log('template received ', activeTemplate);

  return (
    <Wrapper>
      {!previewTemplate ? (
        <div className='grid-container'>
          {currentTemplates
            .sort((a, b) => a.fields.category.localeCompare(b.fields.category))
            .map((template) => (
              <TemplateCard
                key={template.fields.id}
                template={template}
                handleClick={handleClick}
              />
            ))}
        </div>
      ) : (
        <div className='sheet-container'>
          <h4>{activeTemplate.fields.title}</h4>
          <div className='sheet-body'>
            <MarkdownView
              className='sheet-scroll sheet-content'
              markdown={activeTemplate.fields.content}
            />
            <div className='sheet-footer'>
              <Button variant='primary' onClick={handleAddSheetClick}>
                Add sheet
              </Button>
              <Button variant='outline-secondary' onClick={handleCloseActive}>
                Back to templates
              </Button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default TemplateCardGrid;

const Wrapper = styled.div`
  display: flex;
  .grid-container {
    margin: 0 1rem;
    overflow-x: scroll;
    height: 800px;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-content: flex-start;
  }
  .sheet-container {
    height: 800px;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .sheet-body {
    box-shadow: var(--shadow-4);
    background: var(--white);
  }
  .sheet-content {
    overflow-x: scroll;
    max-width: 500px;
    padding: 1rem 1rem 0 1rem;
    max-height: 650px;
  }
  .sheet-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
  }
`;
