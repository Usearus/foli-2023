import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import { CiSearch } from 'react-icons/ci';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileModal from './ProfileModal';

function NavBar() {
  const { logout } = useAuth0();

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      style={{
        padding: '8px 16px',
        background: 'var(--grey-100)',
        borderBottom: '1px solid var(--grey-300)',
      }}
    >
      <Container fluid>
        <Navbar.Brand>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            fol<i>i</i>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav variant='pills' className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Jobs</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/testing'>
              <Nav.Link>Testing</Nav.Link>
            </LinkContainer>
          </Nav>

          {/* hiding search bar until I can add it */}
          {/*<Form className='d-flex' style={{ marginRight: '8px' }}>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            /> 
            <Button variant='light'>
              <CiSearch />
            </Button>
          </Form>*/}

          <ProfileModal />

          <Nav>
            <Button
              variant='light'
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
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

export default NavBar;
