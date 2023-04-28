import { useState, useContext } from 'react';
import styled from 'styled-components';
import SideBar from './pages-sidebar-components/SideBar';
import {
	Navbar,
	Nav,
	Stack,
	Button,
	Offcanvas,
	OffcanvasHeader,
	OffcanvasTitle,
} from 'react-bootstrap';
import { DatabaseContext } from '../../context/DatabaseContext';
import { FiMoreVertical } from 'react-icons/fi';
import { LinkContainer } from 'react-router-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import DropdownStageSelect from '../atom-components/DropdownStageSelect';
import SideBarAssistant from './SideBarAssistant';
import DropdownAddPage from '../atom-components/DropdownAddPage';

const TopBarJobMobile = ({ className }) => {
	const { currentJob } = useContext(DatabaseContext);
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	// console.log('showOffcanvas is', showOffcanvas);
	return (
		<Wrapper className={className}>
			<Navbar
				collapseOnSelect
				expand='md'
				style={{
					padding: '8px 0px',
					background: 'var(--grey-200)',
					position: 'sticky',
					top: '0',
					zIndex: '1',
				}}
				// onToggle={() => setToggle(!toggle)}
			>
				<Stack direction='vertical'>
					<div className='first-row'>
						<LinkContainer to='/'>
							<Nav.Link active={false}>
								<Button
									variant='light'
									style={{
										background: 'var(--grey-200)',
										border: 0,
									}}>
									<IoMdArrowRoundBack />
								</Button>
							</Nav.Link>
						</LinkContainer>
						{currentJob ? (
							<Stack className='truncate-parent'>
								<h6
									style={{
										fontWeight: '600',
									}}>
									{currentJob.company}
								</h6>
								<div
									className='truncate'
									style={{ margin: '0', fontSize: '14px' }}>
									{currentJob.position}
								</div>
							</Stack>
						) : (
							''
						)}

						<div className='ms-auto'>
							<Navbar.Toggle
								as='div'
								aria-controls='responsive-navbar-nav'
								onClick={() => setShowOffcanvas(!showOffcanvas)}>
								<Button
									variant='light'
									style={{
										background: 'var(--grey-200)',
										border: 0,
									}}>
									<FiMoreVertical />
								</Button>
							</Navbar.Toggle>
						</div>
					</div>
					<div className='second-row'>
						<SideBarAssistant />
						<DropdownAddPage />
					</div>
					<Navbar.Offcanvas
						id='offcanvas-navbar-nav'
						placement='start'
						style={{
							background: 'var(--grey-200)',
							cursor: 'pointer',
						}}
						show={showOffcanvas}
						onHide={() => setShowOffcanvas(false)}>
						<OffcanvasHeader closeButton>
							<OffcanvasTitle id='title'>Details</OffcanvasTitle>
						</OffcanvasHeader>
						<Offcanvas.Body>
							{/* <hr /> */}
							<div className='dropdown-container'>
								<label style={{ fontWeight: '700' }}>Stage</label>
								<div style={{ paddingBottom: '1rem' }}>
									<DropdownStageSelect job={currentJob} />
								</div>
							</div>
							<SideBar
								setShowOffcanvas={setShowOffcanvas}
								showOffcanvas={showOffcanvas}
							/>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Stack>
			</Navbar>
		</Wrapper>
	);
};

export default TopBarJobMobile;

const Wrapper = styled.div`
	width: 100%;
	.navbar-toggler {
		border: 0;
	}

	.top-bar-container {
		background: var(--grey-200);
		justify-content: space-between;
		border-bottom: 1px solid var(--grey-200);
		color: var(--grey-700);
		/* padding: 1rem; */
	}

	hr {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.first-row {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
	}

	.second-row {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
	}

	.dropdown-container {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		/* width: 100%; */
		padding: 1rem;
	}

	.truncate {
		white-space: nowrap; /* prevent the text from wrapping to a new line */
		overflow: hidden; /* hide any text that overflows the element */
		text-overflow: ellipsis;
	}

	.truncate-parent {
		max-width: 250px;
	}
`;
