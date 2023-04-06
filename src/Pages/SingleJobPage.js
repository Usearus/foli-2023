import SideBar from '../Components/SideBar';
import SheetList from '../Components/SheetList';
import TopBarJob from '../Components/TopBarJob';
import styled from 'styled-components';
import TopBarSheets from '../Components/TopBarSheets';
import { Stack } from 'react-bootstrap';

const SingleJobPage = () => {
    return (
        <Wrapper>
            <Stack className='top'>
                <TopBarJob />
                {/* <div className='sheets-topbar'>
                    <TopBarSheets />
                </div> */}
            </Stack>
            <SideBar className='sidebar sheets-sidebar' />
            <SheetList className='right' />
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

    .sheets-sidebar {
        display: none;
    }
    .sheets-topbar {
        display: none;
    }

    /* Desktop */
    @media (min-width: 768px) {
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

        .sheets-sidebar {
            display: flex;
        }

        .sheets-topbar {
            display: none;
        }
    }
`;
