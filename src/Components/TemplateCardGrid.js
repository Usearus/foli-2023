import React, { useContext } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';

export const TemplateCardGrid = () => {
  const { currentTemplates } = useContext(AirtableContext);

  return (
    <Wrapper>
      <section>
        {currentTemplates
          .sort((a, b) => a.fields.category.localeCompare(b.fields.category))
          .map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
      </section>
    </Wrapper>
  );
};

export default TemplateCardGrid;

const Wrapper = styled.div`
  section {
    overflow-x: scroll;
    height: 900px;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-content: flex-start;
  }
`;
