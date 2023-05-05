import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {
	Nav,
	Navbar,
	Button,
	Offcanvas,
	OffcanvasHeader,
	OffcanvasTitle,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ModalProfile from '../modal-components/ModalProfile';
import { DatabaseContext } from '../../context/DatabaseContext';
import { FiMenu } from 'react-icons/fi';
import SiteIcon from '../atom-components/SiteIcon';

const NavBar = () => {
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
					padding: '11px 11px 11px 16px',
					background: 'var(--grey-100)',
					borderBottom: '1px solid var(--grey-300)',
					position: 'sticky',
					top: '0',
					zIndex: '1',
				}}>
				<Container fluid>
					<LinkContainer to='/'>
						<Nav.Link active={false}>
							<SiteIcon />
						</Nav.Link>
					</LinkContainer>
					<Navbar.Toggle
						as='div'
						aria-controls='responsive-navbar-nav'
						style={{ border: 0 }}>
						<Button variant='light'>
							<FiMenu />
						</Button>
					</Navbar.Toggle>
					<Navbar.Offcanvas
						id='offcanvas-navbar-nav'
						placement='start'
						style={{
							background: 'var(--grey-100)',
							cursor: 'pointer',
						}}>
						<OffcanvasHeader closeButton>
							<OffcanvasTitle id='title'>
								<SiteIcon />
							</OffcanvasTitle>
						</OffcanvasHeader>
						<Offcanvas.Body>
							<Nav variant='pills' className='me-auto'>
								<LinkContainer to='/'>
									<Nav.Link active={false}>Jobs</Nav.Link>
								</LinkContainer>
								<LinkContainer to='/resume'>
									<Nav.Link active={false}>Resume</Nav.Link>
								</LinkContainer>

								{admin ? (
									<LinkContainer to='/testing'>
										<Nav.Link active={false}>Admin</Nav.Link>
									</LinkContainer>
								) : null}
							</Nav>

							<ModalProfile />
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		);
	}
};

export default NavBar;
