import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import { AirtableContext } from '../context/AirtableContext';
import styled from 'styled-components';

const SideBarPositionItem = () => {
  const { setPositionSheet, positionSheet } = useContext(AirtableContext);
  const [showIcon, setShowIcon] = useState(false);

  const handleButtonClick = () => {
    setShowIcon(!showIcon);
    setPositionSheet(!positionSheet);
  };

  return (
    <Wrapper>
      <Button size='sm' variant='light' className='parent-btn'>
        <span>Position Details</span>
        <Button
          className='ms-auto'
          variant='link'
          style={{ color: 'var(--grey-600)' }}
          onClick={handleButtonClick}
        >
          {showIcon ? <BiHide /> : <BiShow />}
        </Button>
      </Button>
    </Wrapper>
  );
};

export default SideBarPositionItem;

const Wrapper = styled.div`
  .parent-btn {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;
