import React, { useContext, useEffect, useState } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const TemplateSidebar = () => {
  const { allTemplates, fetchAllTemplates, fetchTemplatesByCategory } =
    useContext(AirtableContext);

  const categoryCounts = allTemplates.reduce((counts, template) => {
    const category = template.fields.category;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});

  const uniqueCategories = Object.keys(categoryCounts).sort();

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchAllTemplates();
  }, []);

  const templateCategoryList = uniqueCategories.map((category) => {
    const count = categoryCounts[category];
    const isActive = category === activeCategory;

    return (
      <Button
        key={category}
        style={{ textAlign: 'left' }}
        className={isActive ? 'category active' : 'category'}
        variant={isActive ? 'primary' : 'light'}
        onClick={() => {
          fetchTemplatesByCategory(category);
          setActiveCategory(category);
        }}
      >
        {category} ({count})
      </Button>
    );
  });

  return (
    <Wrapper>
      <h6 className='sidebar-title'>Categories</h6>
      <div className='category-list'>
        <Button
          style={{ textAlign: 'left' }}
          className={activeCategory === null ? 'category active' : 'category'}
          variant={activeCategory === null ? 'primary' : 'light'}
          onClick={() => {
            fetchAllTemplates();
            setActiveCategory(null);
          }}
        >
          All ({allTemplates.length})
        </Button>
        {templateCategoryList}
      </div>
    </Wrapper>
  );
};

export default TemplateSidebar;

const Wrapper = styled.div`
  min-width: 220px;
  .category {
    /* font-size: small; */
  }
  .category-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-self: flex-start;
  }

  .sidebar-title {
    display: flex;
  }

  .sidebar-item {
    background: var(--grey-200);
    color: var(--grey-600);
    transition: var(--transition);
  }

  .sidebar-item:hover {
    background: var(--grey-300);
    border-radius: 0.5rem;
  }
`;
