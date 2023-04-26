import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddJob from '../modal-components/ModalAddJob';

const TopBarTable = ({ className }) => {
	return (
		<Wrapper className={className}>
			<Container fluid>
				<Stack direction='horizontal' gap={3} className='top-bar-container'>
					<div className='ms-auto'>
						<ModalAddJob />
					</div>
				</Stack>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: sticky;
	top: 63px;
	z-index: 1;
	width: 100%;
	background: var(--grey-100);

	.top-bar-container {
		/* justify-content: space-between; */
		padding: 1rem;
	}
`;

export default TopBarTable;
