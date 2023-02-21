import React from 'react';
import SideBar from '../Components/SideBar';
import SheetList from '../Components/SheetList';
import TopBarJob from '../Components/TopBarJob';
import styled from 'styled-components';
import { AirtableContext } from '../context/AirtableContext';

export const SingleJobPage = () => {
  const { sheets, selectedJob } = React.useContext(AirtableContext);
  const thisUsersSheets = sheets;

  return (
    <Wrapper>
      <TopBarJob className='top' job={selectedJob} />
      <SideBar className='sidebar' sheets={thisUsersSheets} />
      <SheetList className='right' sheets={thisUsersSheets} />
    </Wrapper>
  );
};

export default SingleJobPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'top top'
    'sidebar right';
  grid-template-columns: 250px 1fr;
  grid-template-rows: 71px auto;
  height: calc(100vh - 78px);
  overflow: hidden;

  .top {
    grid-area: top;
  }

  .sidebar {
    grid-area: sidebar;
  }

  .right {
    grid-area: right;
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    /* height: 100%; */
    padding: 2rem 2rem;
    overflow-x: scroll;
    background: var(--grey-200);
  }
`;
