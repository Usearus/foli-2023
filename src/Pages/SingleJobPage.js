import { useState, useContext } from 'react';
import SideBar from '../Components/SideBar';
import PageList from '../Components/PageList';
import TopBarJobDesktop from '../Components/TopBarJobDesktop';
import styled from 'styled-components';
import TopBarJobMobile from '../Components/TopBarJobMobile';
import { Stack, DropdownButton, Dropdown } from 'react-bootstrap';
import ModalAddPage from '../Components/ModalAddPage';
import ModalTemplates from '../Components/ModalTemplates';
import { BiFileBlank } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { DatabaseContext } from '../context/DatabaseContext';


const SingleJobPage = () => {
    const [showAddPageModal, setShowAddPageModal] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [selectedEventKey, setSelectedEventKey] = useState(null);
    const { currentPages, settingPageStack } = useContext(DatabaseContext);

    const stackClassName = 
        settingPageStack === 'horizontal' ? 'horizontal-stack-page-list' : 
        settingPageStack === 'vertical' ? 'vertical-stack-page-list' : 
        '';

    const handleSelect = (eventKey) => {
        setSelectedEventKey(eventKey);
        if (eventKey === '1') {
            setShowAddPageModal(true);
        }
        if (eventKey === '2') {
            setShowTemplateModal(true);
        }
    };

    const handleCloseReset = () => {
        setShowAddPageModal(false);
        setShowTemplateModal(false);
    };

    if (currentPages.length === 0) {
        return (
            <>
                
                <Wrapper>
                <Stack className='top'>
                    <div className='mobile-only'>
                        <TopBarJobMobile />
                    </div>
                    <TopBarJobDesktop className='desktop-only' />
                    <div className='empty-state'>
                        <h5>
                            No pages added yet. Add your first page to get started.
                        </h5>
                    </div>
                </Stack>
                <div className='add-page-fab mobile-only'>
                    <DropdownButton
                        title='Add Page'
                        id='add-page-dropdown'
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
                            Blank page
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
                            template
                        </Dropdown.Item>
                    </DropdownButton>
                    {showAddPageModal && (
                        <ModalAddPage
                            show={showAddPageModal}
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
            
                
                
        
                
            </>
        );
    }

    if (currentPages.length > 0) {
        return (
            <Wrapper>
                <Stack className='top'>
                    <div className='mobile-only'>
                        <TopBarJobMobile />
                    </div>
                    <TopBarJobDesktop className='desktop-only' />
                </Stack>
                <SideBar className='sidebar desktop-only' />
                <PageList className={`right ${stackClassName}`} />
                <div className='add-page-fab mobile-only'>
                    <DropdownButton
                        title='Add page'
                        id='add-page-dropdown'
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
                            Blank page
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
                            template
                        </Dropdown.Item>
                    </DropdownButton>
                    {showAddPageModal && (
                        <ModalAddPage
                            show={showAddPageModal}
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
    }
};

export default SingleJobPage;

const Wrapper = styled.div`
    /* Mobile */
    display: grid;
    grid-template-areas:
        'top'
        'right';
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto;

    /* This keeps the height to 100% whenever the navbar disappears on mobile. */
    height: 100dvh;

    overflow: hidden;
    position: relative;
    background: var(--grey-200);
    
    .add-page-fab {
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
    .empty-state{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }
    
    .right {
        grid-area: right;
        display: flex;
        gap: 0.5rem;
        height: 100%;
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        background: var(--grey-200);
    }

/* On Mobile we always want flex-wrap to none */
.vertical-stack-page-list{
    flex-wrap: none;

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

        .right {
        scroll-snap-type: none;
        }

        .horizontal-stack-page-list{
        flex-wrap: none;
        }

        .vertical-stack-page-list{
        flex-wrap: wrap;
        padding: .5rem 5rem .5rem 5rem;
        }
    }
`;
