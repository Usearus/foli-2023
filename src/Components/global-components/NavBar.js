import { useContext } from 'react';
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
// import useAlert from '../../Custom Hooks/useAlert';
// import { supabase } from '../../API/supabase';

const NavBar = () => {
	const { userProfile, adminProfile, fetchUserProfile } =
		useContext(DatabaseContext);
	// const { setAlert } = useAlert();

	// const handleSaveThemeClick = async () => {
	// 	if (userProfile.theme === 'light') {
	// 		const { error } = await supabase
	// 			.from('profiles')
	// 			.update({
	// 				theme: 'dark',
	// 			})
	// 			.eq('id', userProfile.id);
	// 		fetchUserProfile();
	// 		setAlert('Theme updated.', 'success');

	// 		if (error) {
	// 			setAlert('Something went wrong. Preferences not updated.', 'danger');
	// 			console.log('error is', error);
	// 			return;
	// 		}
	// 	}
	// 	if (userProfile.theme === 'dark') {
	// 		const { error } = await supabase
	// 			.from('profiles')
	// 			.update({
	// 				theme: 'light',
	// 			})
	// 			.eq('id', userProfile.id);
	// 		fetchUserProfile();
	// 		setAlert('Theme updated.', 'success');

	// 		if (error) {
	// 			setAlert('Something went wrong. Preferences not updated.', 'danger');
	// 			console.log('error is', error);
	// 			return;
	// 		}
	// 	}
	// };

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

								{adminProfile ? (
									<>
										<LinkContainer to='/resume'>
											<Nav.Link active={false}>Resume</Nav.Link>
										</LinkContainer>
										<LinkContainer to='/testing'>
											<Nav.Link active={false}>Admin</Nav.Link>
										</LinkContainer>
									</>
								) : null}
							</Nav>
							{/* <Button
								style={{ marginRight: '1rem' }}
								onClick={handleSaveThemeClick}>
								{userProfile.theme}
							</Button> */}
							<ModalProfile />
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		);
	}
};

export default NavBar;
