import { useState, useContext, useRef } from 'react';
import { Button, Form, Dropdown, Stack } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';
import MarkdownView from 'react-showdown';
import useAlert from '../Custom Hooks/useAlert';
import ReactQuillEditor from '../Components/ReactQuillEditor';
import ModalDeleteConfirmation from '../Components/ModalDeleteConfirmation';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';

import { supabase } from '../API/supabase';
import { Resizable } from 're-resizable';

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

    const [sheetWidth, setSheetWidth] = useState(sheet.width);

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

    const handleUpdateWidthClick = async (newSheetWidth) => {
        setSheetWidth(newSheetWidth);
        const { error } = await supabase
            .from('sheets')
            .update({
                width: newSheetWidth,
            })
            .eq('id', sheet.id);

        if (error) {
            setAlert(
                'Something went wrong. Sheet width not updated.',
                'danger'
            );
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
                    <Resizable
                        className='sheet-content shadow-on sheets-desktop desktop-only'
                        minWidth='300px'
                        maxWidth='700px'
                        size={{
                            height: '100%',
                            width: sheetWidth,
                        }}
                        onResizeStop={(e, direction, ref, d) => {
                            const newSheetWidth = sheetWidth + d.width;
                            handleUpdateWidthClick(newSheetWidth);
                        }}
                        enable={{
                            top: false,
                            right: true,
                            bottom: false,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false,
                        }}
                    >
                        <header className='sheet-title'>
                            {!editing ? (
                                <Stack direction='horizontal'>
                                    <h6>{sheet.title}</h6>
                                    <Stack
                                        direction='horizontal'
                                        className='ms-auto'
                                    >
                                        <Dropdown
                                            className='fade-in'
                                            onSelect={handleSelect}
                                        >
                                            <Button
                                                variant='light'
                                                style={{
                                                    background: 'var(--white)',
                                                    border: 0,
                                                }}
                                                onClick={handleEditClick}
                                            >
                                                <AiFillEdit />
                                            </Button>

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
                                    </Stack>
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
                                    <Stack direction='horizontal' gap='1'>
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
                                                    placeholder='Add sheet title'
                                                    size='md'
                                                    maxLength={titleMaxChar}
                                                    onChange={handleTitleChange}
                                                />
                                            </Form.Group>
                                        </Form>
                                        <div className='character-count'>
                                            {characterCount}/{titleMaxChar}
                                        </div>
                                        <Button
                                            variant='outline-secondary'
                                            className='ms-auto'
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
                                    </Stack>
                                </div>
                            )}
                        </header>
                        <hr />

                        {!editing ? (
                            <MarkdownView
                                className='sheet-scroll markdown-content'
                                markdown={sheet.content}
                            />
                        ) : (
                            <Form className='sheet-scroll'>
                                <Form.Group controlId='content'>
                                    <ReactQuillEditor
                                        value={content}
                                        onChange={handleEditorChange}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Resizable>

                    <div className='sheet-content sheets-mobile mobile-only'>
                        <header className='sheet-title'>
                            {!editing ? (
                                <Stack direction='horizontal'>
                                    <h6>{sheet.title}</h6>
                                    <Stack
                                        direction='horizontal'
                                        className='ms-auto'
                                    >
                                        <Button
                                            variant='light'
                                            style={{
                                                background: 'var(--white)',
                                                border: 0,
                                            }}
                                            onClick={handleEditClick}
                                        >
                                            <AiFillEdit />
                                        </Button>
                                        <Dropdown onSelect={handleSelect}>
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
                                    </Stack>

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
                                    <Stack direction='horizontal' gap='1'>
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
                                                    placeholder='Add sheet title'
                                                    size='md'
                                                    maxLength={titleMaxChar}
                                                    onChange={handleTitleChange}
                                                />
                                            </Form.Group>
                                        </Form>
                                        <span className='character-count'>
                                            {characterCount}/{titleMaxChar}
                                        </span>
                                        <Button
                                            variant='outline-secondary'
                                            className='ms-auto'
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
                                    </Stack>
                                </div>
                            )}
                        </header>
                        <hr />

                        {!editing ? (
                            <MarkdownView
                                className='sheet-scroll markdown-content'
                                markdown={sheet.content}
                            />
                        ) : (
                            <Form className='sheet-scroll'>
                                <Form.Group controlId='content'>
                                    <ReactQuillEditor
                                        value={content}
                                        onChange={handleEditorChange}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </div>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
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
        height: 100%;
        background: var(--white);
    }

    .character-count {
        font-style: italic;
        font-size: small;
    }

    .sheet-scroll {
        overflow-y: scroll;
        width: 98%;
        height: 100%;
    }

    .markdown-content {
        padding: 1rem 2rem;
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

    .shadow-on {
        box-shadow: var(--shadow-1);
        transition: box-shadow 1s ease;
    }

    :hover .shadow-on {
        box-shadow: 0px 5px 10px var(--grey-500);
    }

    .sheets-mobile {
        display: none;
    }

    // Mobile
    @media (max-width: 576px) {
        .sheets-mobile {
            display: flex;
            width: 90vw;
            scroll-snap-type: x mandatory;
        }
        .sheets-desktop {
            display: none;
        }
    }
`;

export default Sheet;
