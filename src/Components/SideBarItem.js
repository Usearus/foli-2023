import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import styled from 'styled-components';

const SideBarItem = ({ sheet, hidden, toggleSheet }) => {
  const [showIcon, setShowIcon] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleButtonClick = () => {
    setShowIcon(!showIcon);
    toggleSheet();
    setIsRemoved(!isRemoved);
  };

  return (
    <Wrapper>
      <Button size='sm' variant='light' className='parent-btn'>
        <OverlayTrigger
          key='title'
          placement='top'
          delay={{ show: 1000, hide: 0 }}
          overlay={
            <Tooltip id={`tooltip-${sheet.id}`}>{sheet.fields.title}</Tooltip>
          }
        >
          <span>{sheet.fields.title}</span>
        </OverlayTrigger>
        <div
          className='ms-auto'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--grey-600)',
            minWidth: '24px',
            minHeight: '24px',
          }}
          onClick={handleButtonClick}
        >
          {hidden ? (
            <BiHide
              style={{
                minWidth: '16px',
                minHeight: '16px',
              }}
            />
          ) : (
            <BiShow
              style={{
                minWidth: '16px',
                minHeight: '16px',
              }}
            />
          )}
        </div>
      </Button>
    </Wrapper>
  );
};

export default SideBarItem;

const Wrapper = styled.div`
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 85%;
    text-align: left;
  }
  .parent-btn {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;
