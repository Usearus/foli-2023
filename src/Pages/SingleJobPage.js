import React from 'react';
import SideBar from '../Components/SideBar';
import SheetList from '../Components/SheetList';
import TopBarJob from '../Components/TopBarJob';
import styled from 'styled-components';

const SingleJobPage = () => {
  return (
    <Wrapper>
      <TopBarJob className='top' />
      <SideBar className='sidebar' />
      <SheetList className='right' />
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
