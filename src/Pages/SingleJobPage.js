import { useState } from 'react';
import SideBar from '../Components/SideBar';
import SheetList from '../Components/SheetList';
import TopBarJobDesktop from '../Components/TopBarJobDesktop';
import styled from 'styled-components';
import TopBarJobMobile from '../Components/TopBarJobMobile';
import { Stack, DropdownButton, Dropdown } from 'react-bootstrap';
import ModalAddSheet from '../Components/ModalAddSheet';
import ModalTemplates from '../Components/ModalTemplates';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';

const SingleJobPage = () => {
    const [showAddSheetModal, setShowAddSheetModal] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [selectedEventKey, setSelectedEventKey] = useState(null);

    const handleSelect = (eventKey) => {
        setSelectedEventKey(eventKey);
        if (eventKey === '1') {
            setShowAddSheetModal(true);
        }
        if (eventKey === '2') {
            setShowTemplateModal(true);
        }
    };

    const handleCloseReset = () => {
        setShowAddSheetModal(false);
        setShowTemplateModal(false);
    };

    return (
        <Wrapper>
            <Stack className='top'>
                <div className='mobile-only'>
                    <TopBarJobMobile />
                </div>
                <TopBarJobDesktop className='desktop-only' />
            </Stack>
            <SideBar className='sidebar desktop-only' />
            <SheetList className='right' />
            <div className='add-sheet-fab mobile-only'>
                <DropdownButton
                    title='Add Sheet'
                    id='add-sheet-dropdown'
                    onSelect={handleSelect}
                >
                    <Dropdown.Item
                        eventKey='1'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '.5rem 1rem',
                        }}
                    >
                        <BiFileBlank style={{ marginRight: '.5rem' }} />
                        Blank Sheet
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey='2'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '.5rem 1rem',
                        }}
                    >
                        <GrTemplate style={{ marginRight: '.5rem' }} /> From
                        Template
                    </Dropdown.Item>
                </DropdownButton>
                {showAddSheetModal && (
                    <ModalAddSheet
                        show={showAddSheetModal}
                        handleClose={handleCloseReset}
                    />
                )}
                {showTemplateModal && (
                    <ModalTemplates
                        show={showTemplateModal}
                        closeTemplateModal={handleCloseReset}
                    />
                )}
            </div>
        </Wrapper>
    );
};

export default SingleJobPage;

const Wrapper = styled.div`
    /* Mobile */
    display: grid;
    grid-template-areas:
        'top'
        'right';
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: calc(100vh - 63px);
    overflow: hidden;
    position: relative;

    .add-sheet-fab {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }

    .dropdown-toggle {
        border-radius: 99px;
        padding: 9px 16px;
    }
    .top {
        grid-area: top;
    }

    .right {
        grid-area: right;
        display: flex;
        gap: 0.25rem;
        align-items: stretch;
        height: 100%;
        padding: 1rem 1rem;
        overflow-x: scroll;
        background: var(--grey-200);
    }

    /* Desktop */
    @media (min-width: 576px) {
        display: grid;
        grid-template-areas:
            'top top'
            'sidebar right';
        grid-template-columns: 250px 1fr;
        grid-template-rows: 71px auto;
        height: calc(100vh - 63px);
        overflow: hidden;

        .sidebar {
            grid-area: sidebar;
        }

        .dropdown-toggle {
            border-radius: 0.37rem;
            padding: 6px 12px;
        }
    }
`;
