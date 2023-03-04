import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MarkdownView from 'react-showdown';
import base from '../API/base';
import { FiTrash } from 'react-icons/fi';

const Sheet = (sheets) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(sheets.fields.content);
  const { fetchCurrentSheets, currentJob } = useContext(AirtableContext);

  const handleUpdateContentClick = () => {
    base('sheets').update(
      sheets.id,
      {
        content: content,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        // console.log('sheet updated', record.getId());
        fetchCurrentSheets(currentJob);
        setEditing(false);
      }
    );
  };

  const handleDeleteSheetClick = (e) => {
    e.stopPropagation();
    base('sheets').destroy(sheets.id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      // console.log('Deleted sheet', deletedRecord.id);
      fetchCurrentSheets(currentJob);
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setContent(sheets.fields.content);
    setEditing(false);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  return (
    <Wrapper className='sheet-container'>
      <header className='sheet-title'>
        <h4>{sheets.fields.title}</h4>
        <Button
          variant='light'
          onClick={handleDeleteSheetClick}
          className='delete-button'
        >
          <FiTrash />
        </Button>
      </header>
      <section className='sheet-content'>
        {editing ? (
          <>
            <Form className='sheet-scroll'>
              <Form.Group controlId='content'>
                <ReactQuill
                  theme='snow'
                  value={content}
                  onChange={handleEditorChange}
                />
              </Form.Group>
            </Form>
            <div className='sheet-footer'>
              <Button variant='primary' onClick={handleUpdateContentClick}>
                Save
              </Button>
              <Button variant='secondary' onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <MarkdownView
              className='sheet-scroll markdown-content'
              markdown={sheets.fields.content}
              style={{ display: editing ? 'none' : 'block' }}
            />
            <div className='sheet-footer'>
              <Button variant='secondary' onClick={handleEditClick}>
                Edit
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: var(--grey-800);
    height: 2rem;
  }
  .sheet-content:hover > .delete-button {
    display: block;
  }

  .delete-button {
    display: block;
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

  .sheet-content .ql-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--grey-50);
  }

  .sheet-content .ql-container {
    overflow-y: auto;
    /* height: calc(75vh - 41px); subtract toolbar height from max-height */
  }

  .sheet-content:hover {
    box-shadow: var(--shadow-4);
  }

  .markdown-content {
    padding: 1rem;
  }
  .sheet-scroll {
    overflow-y: scroll;
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

  .ql-container {
    border: none;
  }
`;

export default Sheet;
