import React from 'react';
import SideBar from '../Components/SideBar';
import SheetList from '../Components/SheetList';
import TopBar from '../Components/TopBar';
import styled from 'styled-components';
import { AirtableContext } from '../context/AirtableContext';

export const SingleJobPage = () => {
  const { sheets, jobs } = React.useContext(AirtableContext);
  const thisUsersSheets = sheets;
  const selectedJob = jobs[0];
  console.log('selected job', selectedJob);

  return (
    <Wrapper>
      <TopBar className='top' job={selectedJob} />
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
  grid-template-rows: 75px auto;
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
