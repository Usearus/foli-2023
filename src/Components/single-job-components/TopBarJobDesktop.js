import { useContext, useEffect } from 'react';
import { Container, Stack, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { DatabaseContext } from '../../context/DatabaseContext';
import SideBarAssistant from './SideBarAssistant';
import DropdownAddPage from '../atom-components/DropdownAddPage';
import DropdownStageSelect from '../atom-components/DropdownStageSelect';
import TogglePageLayout from '../atom-components/TogglePageLayout';
import { BiLinkExternal } from 'react-icons/bi';

const TopBarJobDesktop = ({ className }) => {
	const { setCurrentJob, currentJob } = useContext(DatabaseContext);

	useEffect(() => {
		const jobFromStorage = localStorage.getItem('currentJob');
		setCurrentJob(JSON.parse(jobFromStorage));
	}, [setCurrentJob]);

	return (
		<Wrapper className={className}>
			<Container fluid>
				<Stack direction='horizontal' gap={3} className='top-bar-container'>
					<div className='left-content'>
						<div className='title-content'>
							{currentJob ? (
								<>
									<h5
										style={{ fontWeight: '600', color: 'var(--primary-700)' }}>
										{currentJob.company}{' '}
									</h5>
									<a
										className='truncate'
										style={{ margin: '0', cursor: 'pointer' }}
										onClick={() => {
											window.location.href = currentJob.link;
										}}>
										{currentJob.position}
									</a>
								</>
							) : (
								''
							)}
						</div>
						<DropdownStageSelect job={currentJob} />
					</div>
					<div className='right-content'>
						<TogglePageLayout />
						<SideBarAssistant />
						<DropdownAddPage />
					</div>
				</Stack>
			</Container>
		</Wrapper>
	);
};

export default TopBarJobDesktop;

const Wrapper = styled.div`
	position: sticky;
	z-index: 1;

	.horizontal-stack {
		flex-wrap: none;
	}

	.vertical-stack {
		flex-wrap: wrap;
		padding: 0.5rem 5rem 0.5rem 5rem;
	}

	.top-bar-container {
		background: var(--grey-200);
		justify-content: space-between;
		border-bottom: 1px solid var(--grey-200);
		color: var(--grey-700);
		padding: 1rem;
	}

	.left-content {
		display: flex;
		flex-direction: row;
		justify-content: stretch;
		align-items: center;
		gap: 1rem;
	}
	.title-content {
		max-width: 300px;
	}

	.truncate {
		white-space: nowrap; /* prevent the text from wrapping to a new line */
		overflow: hidden; /* hide any text that overflows the element */
		text-overflow: ellipsis;
	}

	/* Mobile */
	@media (max-width: 576px) {
		.truncate {
			display: none;
		}
	}

	.right-content {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
`;
