import { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';

const SideBarItem = ({ sheet, hidden, toggleSheet }) => {
  const [showIcon, setShowIcon] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleButtonClick = () => {
    setShowIcon(!showIcon);
    toggleSheet();
    setIsRemoved(!isRemoved);
  };

  return (
    <Stack direction='horizontal'>
      <span>{sheet.fields.title}</span>
      <Button
        className='ms-auto'
        variant='link'
        style={{ color: 'var(--grey-600)' }}
        onClick={handleButtonClick}
      >
        {hidden ? <BiHide /> : <BiShow />}
      </Button>
    </Stack>
  );
};

export default SideBarItem;
