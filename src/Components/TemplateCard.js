import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { BiFileBlank } from 'react-icons/bi';

const TemplateCard = ({ template, handleClick }) => {
  return (
    <Wrapper>
      <Card onClick={() => handleClick(template)}>
        <Card.Header className='text-muted header'>
          <BiFileBlank />
          {template.category}
        </Card.Header>
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

  .card {
    transition: var(--transition);
    width: 22rem;
    height: 11rem;
    border-radius: 0;
    border: 0;
    box-shadow: var(--shadow-1);
  }

  .card:hover {
    box-shadow: var(--shadow-4);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: small;
    background-color: var(--white);
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
    font-size: medium;
    text-align: left;
    font-weight: 600;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    color: black;
  }

  .tag-list .badge {
    color: var(--grey-600);
    border: 1px solid var(--grey-300);
    font-weight: 600;
    padding: 6px 8px;
  }

  .text {
    font-size: small;
    text-align: left;
  }
`;
