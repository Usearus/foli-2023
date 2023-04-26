import styled from 'styled-components';
import { Badge } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';

const FoliBadge = ({ content, closeBtn, handleRemoveLocation, location }) => {
	return (
		<Wrapper>
			<Badge
				pill
				bg='light'
				style={{
					color: 'var(--primary-500)',
					fontWeight: '600',
					cursor: 'default',
					padding: '6px 8px',
					fontSize: '.75rem',
				}}>
				{content}
				{closeBtn && (
					<MdOutlineClose
						onClick={() => handleRemoveLocation(location)}
						style={{
							color: 'var(--primary-500)',
							width: '12px',
							height: '12px',
							cursor: 'pointer',
							marginLeft: '.5rem',
						}}
					/>
				)}
			</Badge>
		</Wrapper>
	);
};

const Wrapper = styled.span`
	margin-right: 0.5rem;
`;

export default FoliBadge;
