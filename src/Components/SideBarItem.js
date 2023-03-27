import { useContext } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import styled from 'styled-components';
import { supabase } from '../API/supabase';
import { AirtableContext } from '../context/AirtableContext';

const SideBarItem = ({ sheet }) => {
  const { fetchCurrentSheets, currentJob } = useContext(AirtableContext);

  const handleButtonClick = async () => {
    const visible = sheet.visible;
    await supabase
      .from('sheets')
      .update({
        visible: !visible,
      })
      .eq('id', sheet.id);
    fetchCurrentSheets(currentJob);
  };

  return (
    <Wrapper>
      {/* <Button size='sm' variant='light' className='parent-btn'> */}
      <div className='parent-btn'>
        <OverlayTrigger
          key='title'
          placement='top'
          delay={{ show: 1000, hide: 0 }}
          overlay={<Tooltip id={`tooltip-${sheet.id}`}>{sheet.title}</Tooltip>}
        >
          <span>{sheet.title}</span>
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
          {sheet.visible ? (
            <BiShow
              style={{
                minWidth: '16px',
                minHeight: '16px',
                cursor: 'pointer',
              }}
            />
          ) : (
            <BiHide
              style={{
                minWidth: '16px',
                minHeight: '16px',
                cursor: 'pointer',
              }}
            />
          )}
        </div>
      </div>
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
    border-radius: 0.25rem;
    font-size: 0.85rem;
    /* Padding is weird to offset the draggable container box */
    padding: 4px 7px;
    color: var(--grey-900);
  }

  .parent-btn:hover {
    display: flex;
    align-items: center;
    width: 100%;
    background: var(--grey-300);
  }

  .parent-btn:active {
    background: var(--grey-400);
  }
`;
