import React, { useState, useRef, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import base from '../API/base';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';

function AddSheetModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        });
      }
    );
  };

  const handleAddSheetClick = async () => {
    await addSheet();

    const updatedJob = allJobs.find((job) => job.id === currentJob.id);
    setCurrentJob(updatedJob);
  };

  // useEffect(() => {
  //   findCurrentSheets(currentJob);
  // }, [userSheets, currentJob]);

  // const handleAddSheetClick = (e) => {
  //   // console.log('101 before currentSheets', currentSheets);

  //   e.preventDefault();
  //   base('sheets').create(
  //     [
  //       {
  //         fields: {
  //           account: user.email,
  //           title: titleRef.current.value,
  //           content: contentRef.current.value,
  //           jobid: [currentJob.id],
  //         },
  //       },
  //     ],
  //     function (err, records) {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       records.forEach(function (record) {
  //         // console.log('added sheet', record.getId());
  //       });
  //       fetchAllSheets(() => {
  //         findCurrentSheets(currentJob);
  //       });
  //       handleClose();
  //     }
  //   );
  // };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add Sheet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add sheet to job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='title' autoFocus>
              <Form.Label>Sheet Title</Form.Label>
              <Form.Control type='text' ref={titleRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' rows={3} ref={contentRef} />
            </Form.Group>
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

export default AddSheetModal;
