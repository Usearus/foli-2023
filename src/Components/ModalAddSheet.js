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
    const [validated, setValidated] = useState(false);
    const titleRef = useRef();
    const [content, setContent] = useState('');

    const handleEditorChange = (value) => {
        setContent(value);
    };

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
                setAlert('There was an error adding the sheet.', 'error');
                console.log(error);
                return;
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(false);
            handleAddSheetClick();
        } else {
            setValidated(true);
        }
    };

    
    return (
        <Modal scrollable fullscreen='md-down' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form id='addSheetForm' noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Title */}
                <Form.Group className='mb-3' controlId='title'>
                    <Form.Label>Sheet Title *</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        autoFocus
                        ref={titleRef}
                    />
                    <Form.Control.Feedback type="invalid">
                        Sheet title cannot be blank.
                    </Form.Control.Feedback>
                </Form.Group>
                {/* Content */}
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
                <Button type="submit" variant='primary' form="addSheetForm">
                    Confirm
                </Button>
            </Modal.Footer>     
        </Modal>
    );
};

export default ModalAddSheet;
