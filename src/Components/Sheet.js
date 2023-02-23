import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import MarkdownView from 'react-showdown';

const Sheet = (sheets) => {
  return (
    <Wrapper className='sheet-container'>
      <header className='sheet-title'>
        <h4>{sheets.fields.title}</h4>
      </header>
      <section className='sheet-content'>
        <MarkdownView
          className='sheet-scroll'
          markdown={sheets.fields.content}
        />
        <Button variant='secondary'>Edit</Button>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sheet-container {
  }

  .sheet-title {
    margin-bottom: 1rem;
    color: var(--grey-600);
  }

  .sheet-content {
    display: flex;
    flex-direction: column;
    width: 30rem;
    max-height: 75vh;
    background: var(--grey-50);
    box-shadow: var(--shadow-1);
    padding: 0.75rem;
    gap: 1rem;
    transition: var(--transition);
    color: var(--grey-900);
  }

  .sheet-content:hover {
    box-shadow: var(--shadow-4);
  }

  .sheet-scroll {
    overflow-y: scroll;
  }

  .sheet-footer {
    justify-content: space-between;
  }

  .edited-text {
    font-style: italic;
    font-size: 0.8rem;
    color: var(--grey-400);
  }
`;

export default Sheet;
