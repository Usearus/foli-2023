import styled from 'styled-components';
// import Spinner from 'react-bootstrap/Spinner';
import foliLoadingImage from '../../assets/Foli-Loading.gif';

const Loader = () => {
	return (
		<Wrapper>
			<div className='img-container'>
				<img
					src={foliLoadingImage}
					alt='foliLoadingImage'
					style={{ width: '150px' }}
				/>
			</div>
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
