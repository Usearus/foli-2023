import { useState, useContext, useRef } from 'react';
import { Button, Form, Dropdown, Stack, hr } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';
import MarkdownView from 'react-showdown';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from '../Components/ReactQuillEditor';
import ModalDeleteConfirmation from '../Components/ModalDeleteConfirmation';
import { FiMoreVertical } from 'react-icons/fi';
import { supabase } from '../API/supabase';

const Sheet = (sheet) => {
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(sheet.content);
    const { fetchCurrentSheets, currentJob } = useContext(DatabaseContext);
    const { setAlert } = useAlert();
    const [selectedEventKey, setSelectedEventKey] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const titleRef = useRef();
    const initialTitleValue = sheet.title ?? '';
    const initialVisibleValue = sheet.visible;
    const [characterCount, setCharacterCount] = useState(content.length);
    const titleMaxChar = 32;

    const handleUpdateContentClick = async () => {
        const { error } = await supabase
            .from('sheets')
            .update({
                content: content,
                title: titleRef.current.value,
            })
            .eq('id', sheet.id);
        setAlert('Sheet successfully updated!', 'success');
        fetchCurrentSheets(currentJob);
        setEditing(false);

        if (error) {
            setAlert('Something went wrong. Sheet not updated.', 'danger');
            console.log('error is', error);
            return;
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setContent(sheet.content);
        setEditing(false);
    };

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleTitleChange = (event) => {
        const newValue = event.target.value;
        setCharacterCount(newValue.length);
    };

    // Will handle any modal option selected
    const handleSelect = (eventKey) => {
        setSelectedEventKey(eventKey);
        if (eventKey === '1') {
            setShowDeleteModal(true);
            console.log('handleSelect called');
        }
    };

    // Will close any modal opened by the dropdown
    const handleCloseReset = () => {
        console.log('handleCloseReset called');
        setShowDeleteModal(false);
    };

    return (
        <Wrapper>
            {initialVisibleValue === false ? (
                <></>
            ) : (
                <>
                    <section className='sheet-content'>
                        <div>
                            <header className='sheet-title'>
                                {!editing ? (
                                    <Stack direction='horizontal'>
                                        <h6>{sheet.title}</h6>
                                        <Dropdown
                                            className='ms-auto fade-in'
                                            onSelect={handleSelect}
                                        >
                                            <Dropdown.Toggle
                                                id='dropdown'
                                                variant='link'
                                                style={{
                                                    color: 'var(--grey-800)',
                                                }}
                                            >
                                                <FiMoreVertical />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey='1'>
                                                    Delete Sheet
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {showDeleteModal && (
                                            <ModalDeleteConfirmation
                                                show={showDeleteModal}
                                                close={handleCloseReset}
                                                object={sheet}
                                                type='sheet'
                                            />
                                        )}
                                    </Stack>
                                ) : (
                                    <div>
                                        <Stack direction='horizontal' gap='2'>
                                            <Form>
                                                <Form.Group
                                                    className='title-field'
                                                    controlId='title'
                                                >
                                                    <Form.Control
                                                        type='text'
                                                        required
                                                        ref={titleRef}
                                                        defaultValue={
                                                            initialTitleValue
                                                        }
                                                        placeholder='Sheet title'
                                                        size='md'
                                                        maxLength={titleMaxChar}
                                                        onChange={
                                                            handleTitleChange
                                                        }
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <span className='character-count'>
                                                {characterCount}/{titleMaxChar}
                                            </span>
                                        </Stack>
                                    </div>
                                )}
                            </header>
                            <hr />
                        </div>
                        {!editing ? (
                            <>
                                <MarkdownView
                                    className='sheet-scroll markdown-content'
                                    markdown={sheet.content}
                                    style={{
                                        display: editing ? 'none' : 'block',
                                    }}
                                />
                                <div className='sheet-footer'>
                                    <Button
                                        variant='outline-secondary'
                                        className='fade-up'
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Form className='sheet-scroll'>
                                    <Form.Group controlId='content'>
                                        <ReactQuillEditor
                                            value={content}
                                            onChange={handleEditorChange}
                                        />
                                    </Form.Group>
                                </Form>
                                <div className='sheet-footer'>
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
                                        Save
                                    </Button>
                                </div>
                            </>
                        )}
                    </section>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .sheet-title {
        padding: 1rem 1rem 0.5rem 1rem;
    }

    .sheet-title h6 {
        margin-bottom: 0rem;
        font-weight: 600;
        margin: 0 1rem;
    }

    hr {
        margin: 0 1.5rem;
    }

    .sheet-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 28rem;
        height: 100%;
        background: var(--white);
        box-shadow: var(--shadow-1);
        transition: var(--transition);
        /* position: relative; */
    }

    .sheet-content:hover {
        box-shadow: var(--shadow-4);
    }

    .character-count {
        font-style: italic;
        font-size: small;
    }

    .sheet-scroll {
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 250px;
        width: 100%;
        height: 100%;
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

    .slide-in {
        transition: transform 0.3s ease-in-out;
        transform: translateX(100%);
    }

    .markdown-content {
        padding: 2rem;
        height: 100%;
        h1 {
            font-size: 1.8rem;
        }

        h2 {
            font-size: 1.25rem;
        }

        h3 {
            font-size: 1rem;
        }

        h4 {
            font-size: 1rem;
        }

        h5 {
            font-size: 1rem;
        }
        p {
            margin-bottom: 0;
        }

        ul li {
            padding-bottom: 1rem !important;

            list-style-type: circle !important;
        }
    }

    // React Quill Customization for SHEET Component only!

    .ql-container {
        border: none !important;
        /* overflow-y: auto !important; */
        padding: 0rem 1rem;
    }

    .ql-toolbar {
        border: none !important;
        padding: 1rem 1rem;
    }

    .fade-up {
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateY(10px);
    }

    :hover .fade-up {
        opacity: 1;
        transform: translateY(0);
    }

    :hover .fade-in {
        opacity: 1;
    }
`;

export default Sheet;
