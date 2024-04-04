import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const TemplateCard = ({ template, handleClick }) => {
	return (
		<Wrapper>
			<Card onClick={() => handleClick(template)}>
				{/* <Card.Header className='text-muted header'>
					<BiFileBlank />
					{template.category}
				</Card.Header> */}
				<Card.Body className='body'>
					<Card.Title className='title'>{template.title}</Card.Title>
					<Card.Text className='text'>{template.description}</Card.Text>
				</Card.Body>
			</Card>
		</Wrapper>
	);
};

export default TemplateCard;

const Wrapper = styled.div`
	cursor: pointer;
	padding-bottom: 1.5rem;

	.card {
		transition: var(--transition);
		height: 7rem;
		border-radius: 0;
		border: 1px solid var(--primary-100);
		box-shadow: var(--shadow-1);
	}

	.card:hover {
		box-shadow: var(--shadow-3);
		border: 1px solid var(--primary-400);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer {
		background-color: var(--white);
		border: 0;
	}

	.title {
		font-size: 0.85rem;
		text-align: left;
		margin: 0;
		font-weight: 700;
	}

	.text {
		font-size: small;
		text-align: left;
	}
`;
