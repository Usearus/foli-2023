import { useState, useRef, useContext } from 'react';
import { supabase } from '../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import { DatabaseContext } from '../context/DatabaseContext';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from './ReactQuillEditor';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalAddSheet = ({ show, handleClose }) => {
    const { setAlert } = useAlert();
    const { user } = useAuth0();
    const { currentJob, currentSheets, fetchCurrentSheets } =
        useContext(DatabaseContext);

    const [content, setContent] = useState('');
    const handleEditorChange = (value) => {
        setContent(value);
    };

    const titleRef = useRef();

    const handleAddSheetClick = async () => {
        if (currentJob) {
            await supabase.from('jobs').select().eq('id', currentJob.id);
            const { error } = await supabase.from('sheets').insert({
                account: user.email,
                title: titleRef.current.value,
                content: content,
                jobid: currentJob.id,
                position: currentSheets.length,
            });
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

    return (
        <Modal scrollable fullscreen='md-down' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3 ' controlId='title'>
                        <Form.Label>Sheet Title</Form.Label>
                        <Form.Control
                            type='text'
                            autoFocus
                            required
                            ref={titleRef}
                        />
                    </Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Group className='mb-3' controlId='content'>
                        <ReactQuillEditor
                            value={content}
                            onChange={handleEditorChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleAddSheetClick}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddSheet;
