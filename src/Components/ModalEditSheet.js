import { Button, Modal, Form, Stack } from 'react-bootstrap';
import ReactQuillEditor from '../Components/ReactQuillEditor';

const ModalEditSheet = ({
    showEditSheetModal,
    handleCancelClick,
    sheet,
    content,
    setContent,
    titleRef,
    initialTitleValue,
    titleMaxChar,
    handleTitleChange,
    characterCount,
    handleUpdateContentClick,
    handleEditorChange,
}) => {
    return (
        <>
            <Modal
                fullscreen='md-down'
                show={showEditSheetModal}
                onHide={handleCancelClick}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit sheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <header>
                        <Stack direction='horizontal' gap='1'>
                            <Form>
                                <Form.Label>Sheet Title </Form.Label>
                                <Form.Group controlId='title' className='mb-3'>
                                    <Form.Control
                                        type='text'
                                        required
                                        ref={titleRef}
                                        defaultValue={initialTitleValue}
                                        placeholder='Add sheet title'
                                        size='md'
                                        maxLength={titleMaxChar}
                                        onChange={handleTitleChange}
                                        className='mb-1'
                                    />
                                    <Form.Text
                                        className='text-muted'
                                        style={{
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {characterCount}/{titleMaxChar}
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </Stack>
                    </header>
                    <Form>
                        <Form.Label>Content</Form.Label>
                        <Form.Group controlId='content'>
                            <ReactQuillEditor
                                value={content}
                                onChange={handleEditorChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='outline-secondary'
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='primary'
                        onClick={handleUpdateContentClick}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditSheet;
