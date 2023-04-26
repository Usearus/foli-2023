import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
	return (
		<Wrapper>
			<Spinner animation='grow' />
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default Loader;
