import { useState, useRef, useContext } from 'react';
import { supabase } from '../../API/supabase';
import { useAuth0 } from '@auth0/auth0-react';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import ReactQuillEditor from '../atom-components/ReactQuillEditor';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalAddPage = ({ show, handleClose }) => {
	const { setAlert } = useAlert();
	const { user } = useAuth0();
	const { currentJob, currentPages, fetchCurrentPages } =
		useContext(DatabaseContext);
	const [validated, setValidated] = useState(false);
	const titleRef = useRef();
	const [content, setContent] = useState('');

	const handleEditorChange = (value) => {
		setContent(value);
	};

	const handleAddPageClick = async () => {
		if (currentJob) {
			await supabase.from('jobs').select().eq('id', currentJob.id);
			const { error } = await supabase.from('pages').insert({
				account: user.email,
				title: titleRef.current.value,
				content: content,
				jobid: currentJob.id,
				position: currentPages.length,
			});
			fetchCurrentPages(currentJob);
			handleClose();
			setAlert('Page successfully added!', 'success');
			if (error) {
				setAlert('There was an error adding the page.', 'error');
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
			handleAddPageClick();
		} else {
			setValidated(true);
		}
	};

	return (
		<Modal scrollable fullscreen='md-down' show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a new page</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					id='addPageForm'
					noValidate
					validated={validated}
					onSubmit={handleSubmit}>
					{/* Title */}
					<Form.Group className='mb-3' controlId='title'>
						<Form.Label>Page Title *</Form.Label>
						<Form.Control required type='text' autoFocus ref={titleRef} />
						<Form.Control.Feedback type='invalid'>
							Page title cannot be blank.
						</Form.Control.Feedback>
					</Form.Group>
					{/* Content */}
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
				<Button type='submit' variant='primary' form='addPageForm'>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddPage;
