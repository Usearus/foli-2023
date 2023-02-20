import { Stack, Button } from 'react-bootstrap';
import { BiShow } from 'react-icons/bi';

const SideBarItem = (sheets) => {
  return (
    <Stack direction='horizontal'>
      <span>{sheets.fields.title}</span>
      <Button
        className='ms-auto'
        variant='link'
        style={{ color: 'var(--grey-600)' }}
      >
        <BiShow />
      </Button>
    </Stack>
  );
};

export default SideBarItem;
