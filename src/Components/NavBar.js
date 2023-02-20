import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { RxAvatar } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand='lg' style={{ padding: 16 }}>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <span style={{ fontWeight: 600, fontSize: '1.5rem' }}>
              fol<i>i</i>
            </span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav variant='pills' className='me-auto'>
            <LinkContainer to='/jobs'>
              <Nav.Link>Jobs</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/singlejob'>
              <Nav.Link>Single Job</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/testing'>
              <Nav.Link>Testing</Nav.Link>
            </LinkContainer>
          </Nav>

          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-secondary'>Search</Button>

            <Nav>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <RxAvatar />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/settings'>
                <Nav.Link>
                  <FiSettings />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
