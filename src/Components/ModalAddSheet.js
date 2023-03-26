import { useState, useRef, useContext } from 'react';
import { supabase } from '../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import { AirtableContext } from '../context/AirtableContext';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from './ReactQuillEditor';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalAddSheet = ({ show, handleClose }) => {
  const { setAlert } = useAlert();
  const { user } = useAuth0();
  const { currentJob, allJobs, setCurrentJob, fetchCurrentSheets } =
    useContext(AirtableContext);

  const [content, setContent] = useState('');
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const titleRef = useRef();

  // const addSheet = () => {
  //   base('sheets').create(
  //     [
  //       {
  //         fields: {
  //           account: user.email,
  //           title: titleRef.current.value,
  //           content: content,
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
  //         fetchCurrentSheets(currentJob);
  //         handleClose();
  //         setAlert('Sheet successfully added!', 'success');
  //       });
  //     }
  //   );
  // };
  console.log('currentJob', currentJob);

  const addSheet = async () => {
    if (currentJob) {
      const { data } = await supabase
        .from('jobs')
        .select()
        .eq('id', currentJob.id);
      const { error } = await supabase.from('sheets').insert({
        account: user.email,
        title: titleRef.current.value,
        content: content,
        jobid: currentJob.id,
      });
      console.log(data, 'data');
      fetchCurrentSheets(currentJob);
      handleClose();
      setAlert('Sheet successfully added!', 'success');
      if (error) {
        setAlert('There was an error adding the job.', 'error');
        console.log(error);
        return;
      }
    }
  };

  const handleAddSheetClick = () => {
    addSheet();
    // const updatedJob = allJobs.find((job) => job.id === currentJob.id);
    // setCurrentJob(updatedJob);
  };

  return (
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
        <Button variant='outline-secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleAddSheetClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddSheet;
