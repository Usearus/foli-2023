import { useContext } from 'react';
import SideBar from '../Components/single-job-components/pages-sidebar-components/SideBar';
import PageList from '../Components/single-job-components/PageList';
import TopBarJobDesktop from '../Components/single-job-components/TopBarJobDesktop';
import styled from 'styled-components';
import TopBarJobMobile from '../Components/single-job-components/TopBarJobMobile';
import { Stack } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';

const SingleJobPage = () => {
	const { currentPages, settingPageStack } = useContext(DatabaseContext);

	const stackClassName =
		settingPageStack === 'horizontal'
			? 'horizontal-stack-page-list'
			: settingPageStack === 'vertical'
			? 'vertical-stack-page-list'
			: '';

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
							<h5>No pages added yet. Add your first page to get started.</h5>
						</div>
					</Stack>
					{/* <div className='add-page-fab mobile-only'>
						<DropdownAddPage />
					</div> */}
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
	grid-template-rows: 120px auto;

	/* This keeps the height to 100% whenever the navbar disappears on mobile. */
	height: 100dvh;

	overflow: hidden;
	position: relative;
	background: var(--grey-200);

	.top {
		grid-area: top;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.right {
		grid-area: right;
		display: flex;
		gap: 1rem;
		height: 100%;
		width: 100%;
		padding: 0.5rem 0.5rem 0.5rem 0.5rem;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		background: var(--grey-200);
	}

	/* On Mobile we always want flex-wrap to none */
	.vertical-stack-page-list {
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
			padding: 3rem 30rem 2rem 2rem;
		}

		.horizontal-stack-page-list {
			flex-wrap: none;
		}

		.vertical-stack-page-list {
			flex-wrap: wrap;
			padding: 3rem 3rem 0.5rem 3rem;
			justify-content: center;
		}
	}
`;
