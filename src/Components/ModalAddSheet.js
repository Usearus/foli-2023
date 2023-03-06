import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import ReactQuill from 'react-quill';
import useAlert from '../Custom Hooks/useAlert';

function ModalAddSheet() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setAlert } = useAlert();

  const { user } = useAuth0();
  const { currentJob, allJobs, setCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const titleRef = useRef();
  const contentRef = useRef();

  const addSheet = () => {
    base('sheets').create(
      [
        {
          fields: {
            account: user.email,
            title: titleRef.current.value,
            content: contentRef.current.value,
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
          handleClose();
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

  // const handleEditorChange = (value) => {
  //   setContent(value);
  // };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Sheet
      </Button>

      <Modal fullscreen='md-down' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add sheet to job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Sheet Title</Form.Label>
              <Form.Control type='text' autoFocus ref={titleRef} />
            </Form.Group>
            <Form className='sheet-scroll'>
              <Form.Label>Content</Form.Label>
              <Form.Group className='mb-3' controlId='content'>
                <ReactQuill
                  theme='snow'
                  // onChange={handleEditorChange}
                  ref={contentRef}
                />
              </Form.Group>
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
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

// render(<Example />);

export default ModalAddSheet;
