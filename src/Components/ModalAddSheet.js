import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
// import ReactQuill from 'react-quill';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from './ReactQuillEditor';

function ModalAddSheet() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setAlert } = useAlert();

  const { user } = useAuth0();
  const { currentJob, allJobs, setCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const [content, setContent] = useState('');
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleCloseReset = () => {
    setContent('');
    handleClose();
  };

  const titleRef = useRef();

  const addSheet = () => {
    base('sheets').create(
      [
        {
          fields: {
            account: user.email,
            title: titleRef.current.value,
            content: content,
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
          handleCloseReset();
          setAlert('Sheet successfully added!', 'success');
        });
      }
    );
  };

  const handleAddSheetClick = async () => {
    await addSheet();
    const updatedJob = allJobs.find((job) => job.id === currentJob.id);
    setCurrentJob(updatedJob);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Sheet
      </Button>

      <Modal fullscreen='md-down' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3 ' controlId='title'>
              <Form.Label>Sheet Title</Form.Label>
              <Form.Control type='text' autoFocus required ref={titleRef} />
            </Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Group className='mb-3' controlId='content'>
              <ReactQuillEditor value={content} onChange={handleEditorChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleCloseReset}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddSheetClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddSheet;
