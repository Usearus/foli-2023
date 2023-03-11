import React, { useState, useContext } from 'react';

import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';

export const TemplateCardGrid = () => {
  const { currentTemplates } = useContext(AirtableContext);
  const [previewTemplate, setPreviewTemplate] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);

  const handlePreview = () => {
    setPreviewTemplate(true);
  };
  const handleClick = (template) => {
    console.log('template received ', template);
    setActiveTemplate(template);
    setPreviewTemplate(false);
  };

  return (
    <Wrapper>
      <section>
        {!previewTemplate ? (
          currentTemplates
            .sort((a, b) => a.fields.category.localeCompare(b.fields.category))
            .map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                handlePreview={handlePreview}
                onClick={() => handleClick(template)}
              />
            ))
        ) : (
          <>
            {activeTemplate && (
              <>
                <section className='title'>
                  {activeTemplate.fields.title}
                </section>
                <div className='content'>{activeTemplate.fields.content}</div>
              </>
            )}
          </>
        )}
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
    padding: 0 20px;
  }
`;
