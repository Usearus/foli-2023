// import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import { Navbar, Nav, Container } from 'react-bootstrap';

const TopBarSheets = () => {
    return (
        <Wrapper>
            <Navbar
                collapseOnSelect
                expand='md'
                style={{
                    padding: '8px 16px',
                    background: 'var(--grey-200)',
                    position: 'sticky',
                    top: '0',
                    zIndex: '1',
                }}
            >
                <Container fluid>
                    <h5>Sheets</h5>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <SideBar />
                        <Nav variant='pills' className='me-auto'></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Wrapper>
    );
};

export default TopBarSheets;

const Wrapper = styled.div`
    .top-bar-container {
        background: var(--grey-200);
        justify-content: space-between;
        border-bottom: 1px solid var(--grey-200);
        color: var(--grey-700);
        padding: 1rem;
    }
`;
