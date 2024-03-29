import { useContext } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { DatabaseContext } from '../../context/DatabaseContext';
import useAlert from '../../Custom Hooks/useAlert';
import { supabase } from '../../API/supabase';

const ModalDeleteConfirmation = ({ show, close, type, object }) => {
	const { setAlert } = useAlert();
	const { fetchUserJobs, fetchCurrentPages, currentJob, fetchUserSnippets } =
		useContext(DatabaseContext);

	const handleDelete = async (e) => {
		if (type === 'job') {
			const { error } = await supabase
				.from('jobs')
				.delete()
				.eq('id', object.id);
			if (error) {
				console.error(error);
				setAlert('Something went wrong. Job not deleted.', 'Danger');
				return;
			}
			setAlert('Job successfully deleted!', 'success');
			fetchUserJobs();
		}
		if (type === 'page') {
			const { error } = await supabase
				.from('pages')
				.delete()
				.eq('id', object.id);
			if (error) {
				console.error(error);
				setAlert('Something went wrong. Page not deleted.', 'Danger');
				return;
			}
			setAlert('Page successfully deleted!', 'success');
			fetchCurrentPages(currentJob);
		}

		if (type === 'snippet') {
			const { error } = await supabase
				.from('snippets')
				.delete()
				.eq('id', object.id);
			if (error) {
				console.error(error);
				setAlert('Something went wrong. Snippet not deleted.', 'Danger');
				return;
			}
			setAlert('Snippet successfully deleted!', 'success');
			fetchUserSnippets();
		}
	};

	return (
		<>
			<Modal fullscreen='md-down' show={show} onHide={close}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Wrapper>
						<p>Are you sure you want to delete this {type}?</p>
					</Wrapper>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-secondary' onClick={close}>
						Cancel
					</Button>
					<Button variant='danger' onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalDeleteConfirmation;

const Wrapper = styled.div`
	h4 {
		padding-bottom: 0.5rem;
	}
	h6 {
		margin-bottom: 0.25rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-bottom: 40px;
	}
	.field {
		padding-bottom: 0.5rem;
	}
`;
