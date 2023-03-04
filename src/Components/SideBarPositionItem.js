import { useState, useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import { AirtableContext } from '../context/AirtableContext';

const SideBarPositionItem = () => {
  const { setPositionSheet, positionSheet } = useContext(AirtableContext);
  const [showIcon, setShowIcon] = useState(false);

  const handleButtonClick = () => {
    setShowIcon(!showIcon);
    setPositionSheet(!positionSheet);
  };

  return (
    <Stack direction='horizontal'>
      <span>Position Details</span>
      <Button
        className='ms-auto'
        variant='link'
        style={{ color: 'var(--grey-600)' }}
        onClick={handleButtonClick}
      >
        {showIcon ? <BiHide /> : <BiShow />}
      </Button>
    </Stack>
  );
};

export default SideBarPositionItem;
