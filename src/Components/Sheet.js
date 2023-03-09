import { useState, useContext, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import MarkdownView from 'react-showdown';
import base from '../API/base';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from '../Components/ReactQuillEditor';
import ModalDeleteConfirmation from '../Components/ModalDeleteConfirmation';

const Sheet = (sheet) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(sheet.fields.content);
  const { fetchCurrentSheets, currentJob } = useContext(AirtableContext);
  const { setAlert } = useAlert();

  const titleRef = useRef();
  const initialTitleValue = sheet.fields?.title ?? '';
  const [characterCount, setCharacterCount] = useState(content.length);

  const handleUpdateContentClick = () => {
    base('sheets').update(
      sheet.id,
      {
        content: content,
        title: titleRef.current.value,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        // console.log('sheet updated', record.getId());
        setAlert('Sheet successfully updated!', 'success');
        fetchCurrentSheets(currentJob);
        setEditing(false);
      }
    );
  };

  const handleDeleteSheetClick = () => {
    base('sheets').destroy(sheet.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      // console.log('Deleted sheet', deletedRecord.id);
      setAlert('Sheet successfully deleted!', 'success');
      fetchCurrentSheets(currentJob);
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setContent(sheet.fields.content);
    setEditing(false);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (event) => {
    const newValue = event.target.value;
    setCharacterCount(newValue.length);
  };

  const titleMaxChar = 32;

  return (
    <Wrapper className='sheet-container'>
      <header
        className='sheet-title'
        style={{ marginBottom: editing ? '.75rem' : '.75rem' }}
      >
        {!editing ? (
          <h4>{sheet.fields.title}</h4>
        ) : (
          <div>
            <div>
              <Form>
                <Form.Group className='mb-3 title-field' controlId='title'>
                  <Form.Control
                    type='text'
                    required
                    ref={titleRef}
                    defaultValue={initialTitleValue}
                    placeholder='Sheet title'
                    size='md'
                    maxLength={titleMaxChar}
                    onChange={handleTitleChange}
                  />
                </Form.Group>
              </Form>
              {characterCount}/{titleMaxChar}
            </div>
            <ModalDeleteConfirmation
              className='delete-button'
              type='sheet'
              deleteFunction={handleDeleteSheetClick}
            />
          </div>
        )}
      </header>
      <section className='sheet-content'>
        {!editing ? (
          <>
            <MarkdownView
              className='sheet-scroll markdown-content'
              markdown={sheet.fields.content}
              style={{ display: editing ? 'none' : 'block' }}
            />
            <div className='sheet-footer'>
              <Button variant='outline-secondary' onClick={handleEditClick}>
                Edit
              </Button>
            </div>
          </>
        ) : (
          <>
            <Form className='sheet-scroll'>
              <Form.Group controlId='content'>
                <ReactQuillEditor
                  value={content}
                  onChange={handleEditorChange}
                />
              </Form.Group>
            </Form>
            <div className='sheet-footer'>
              <Button variant='primary' onClick={handleUpdateContentClick}>
                Save
              </Button>
              <Button variant='outline-secondary' onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sheet-title {
    height: 2rem;
  }

  .sheet-title div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: baseline;
    color: var(--grey-600);
    font-size: 0.85rem;
  }
  .title-field {
    width: 350px;
  }
  .sheet-content {
    display: flex;
    flex-direction: column;
    width: 30rem;
    max-height: 75vh;
    background: var(--white);
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    position: relative;
  }

  .sheet-content:hover {
    box-shadow: var(--shadow-4);
  }

  .markdown-content {
    padding: 1rem;
  }

  .sheet-scroll {
    overflow-y: scroll;
    min-height: 250px;
  }

  .sheet-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
  }

  .edited-text {
    font-style: italic;
    font-size: 0.8rem;
    color: var(--grey-400);
  }

  // React Quill Customization for SHEET Component only!

  .ql-container {
    border: none !important;
    overflow-y: auto !important;
  }

  .ql-toolbar {
    border: none !important;
  }
`;

export default Sheet;
