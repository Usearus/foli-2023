import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import ModalAddJob from './ModalAddJob';

const TopBarTable = ({ className }) => {
    return (
        <Wrapper className={className}>
            <Container fluid>
                <Stack
                    direction='horizontal'
                    gap={3}
                    className='top-bar-container'
                >
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

    .top-bar-container {
        background: var(--white);
        justify-content: space-between;
        color: var(--grey-700);
        padding: 1rem;
    }
`;

export default TopBarTable;
