import React, { useContext, useEffect } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import SideBarItem from './SideBarItem';
import SideBarPositionItem from './SideBarPositionItem';
import styled from 'styled-components';

export const SideBar = ({ className }) => {
  const { currentSheets, setCurrentSheets } = useContext(AirtableContext);

  useEffect(() => {
    const sheetsFromStorage = localStorage.getItem('currentSheets');
    setCurrentSheets(JSON.parse(sheetsFromStorage));
  }, [setCurrentSheets]);

  const toggleSheet = (id) => {
    const index = currentSheets.findIndex((sheet) => sheet.id === id); // Find the index of the sheet with the given id
    currentSheets[index].hidden = !currentSheets[index].hidden; // If the sheet is already hidden, show it, and vice versa
    setCurrentSheets([...currentSheets]);
  };

  return (
    <Wrapper className={className}>
      <section className='sidebar-container'>
        <span className='sidebar-title'>Sheets</span>
        <SideBarPositionItem />
        {currentSheets.map((sheet) => (
          <SideBarItem
            key={sheet.id}
            sheet={sheet}
            hidden={currentSheets.find((s) => s.id === sheet.id).hidden}
            toggleSheet={() => toggleSheet(sheet.id)}
          />
        ))}
      </section>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  .sidebar-container {
    padding: 1.5rem 1rem;
    height: 100%;
    background: var(--grey-100);
    color: var(--grey-800);
    border-right: 1px solid var(--grey-300);
  }

  .sidebar-title {
    display: flex;
    padding: 0rem 0rem 1rem 0rem;

    font-size: 1.5rem;
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
