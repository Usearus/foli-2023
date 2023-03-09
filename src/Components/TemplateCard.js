import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { BiFileBlank } from 'react-icons/bi';

function TemplateCard({ template, handlePreview }) {
  const content = template.fields.content.slice(0, 100) + '...';

  return (
    <Wrapper onClick={handlePreview}>
      <Card>
        <Card.Header className='text-muted header'>
          <BiFileBlank />
          {template.fields.category}
        </Card.Header>
        <Card.Body className='body'>
          <Card.Title className='title'>{template.fields.title}</Card.Title>
          <Card.Text className='text'>{content}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted footer'>
          <div className='tag-list'>
            {template.fields.tags.map((tag) => (
              <Badge pill bg='light'>
                {tag}
              </Badge>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </Wrapper>
  );
}

export default TemplateCard;

const Wrapper = styled.div`
  cursor: pointer;
  .card {
    transition: var(--transition);
    width: 22rem;
    height: 13rem;
  }

  .card:hover {
    box-shadow: var(--shadow-3);
  }

  .card:hover .body .title {
    color: var(--bs-btn-bg);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: small;
  }

  .footer {
    background-color: white;
    border-color: var(--grey-200);
    /* border-top: 0; */
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title {
    font-size: medium;
    text-align: left;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    color: black;
  }

  .tag-list .badge {
    color: var(--grey-500);
    border: 1px solid var(--grey-400);
  }

  .text {
    font-size: small;
    text-align: left;
  }
`;
