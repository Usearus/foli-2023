import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import ModalProfile from './ModalProfile';
import { DatabaseContext } from '../context/DatabaseContext';
import { FiMenu } from 'react-icons/fi';

const NavBar = () => {
    const { logout } = useAuth0();
    const [admin, setAdmin] = useState(false);
    const { userProfile } = useContext(DatabaseContext);

    useEffect(() => {
        if (userProfile && userProfile.email === 'adamdenais@gmail.com') {
            setAdmin(true);
        }
    }, [userProfile]);

    if (userProfile) {
        return (
            <Navbar
                variant='light'
                collapseOnSelect
                expand='sm'
                style={{
                    padding: '8px 16px',
                    background: 'var(--grey-100)',
                    borderBottom: '1px solid var(--grey-300)',
                    position: 'sticky',
                    top: '0',
                    zIndex: '1',
                }}
            >
                <Container fluid>
                    <LinkContainer to='/'>
                        <Nav.Link active={false}>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                        paddingRight: '.25rem',
                                    }}
                                >
                                    fol<i>i</i>
                                </span>
                                <span>
                                    <Badge
                                        pill
                                        bg='dark'
                                        style={{
                                            fontSize: '.6rem',
                                            marginRight: '1rem',
                                        }}
                                    >
                                        alpha
                                    </Badge>
                                </span>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                    <Navbar.Toggle
                        as='div'
                        aria-controls='responsive-navbar-nav'
                        style={{ border: 0 }}
                    >
                        <Button variant='light'>
                            <FiMenu />
                        </Button>
                    </Navbar.Toggle>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav variant='pills' className='me-auto'>
                            <LinkContainer to='/'>
                                <Nav.Link active={false}>Jobs</Nav.Link>
                            </LinkContainer>

                            {admin ? (
                                <LinkContainer to='/testing'>
                                    <Nav.Link active={false}>Admin</Nav.Link>
                                </LinkContainer>
                            ) : null}
                        </Nav>

                        <ModalProfile />

                        <Nav>
                            <Button
                                variant='light'
                                onClick={() =>
                                    logout({
                                        logoutParams: {
                                            returnTo: window.location.origin,
                                        },
                                    })
                                }
                            >
                                Log Out
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
};

export default NavBar;
