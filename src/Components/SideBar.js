import { useState, useContext, useEffect } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import SideBarItem from './SideBarItem';
import SideBarPositionItem from './SideBarPositionItem';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '../API/supabase';

const SideBar = ({ className }) => {
  const { currentSheets, setCurrentSheets } = useContext(AirtableContext);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const sheetsFromStorage = localStorage.getItem('currentSheets');
    const sortedSheets = JSON.parse(sheetsFromStorage).sort(
      (a, b) => a.position - b.position
    );
    setCurrentSheets(sortedSheets);
  }, [setCurrentSheets]);

  const updatePositionsOnDragEnd = async (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const newCurrentSheets = Array.from(currentSheets);
    const [reorderedItem] = newCurrentSheets.splice(result.source.index, 1);
    newCurrentSheets.splice(result.destination.index, 0, reorderedItem);

    newCurrentSheets.forEach((sheet, index) => {
      sheet.position = index;
    });

    await Promise.all(
      newCurrentSheets.map(async (sheet, index) => {
        const { data, error } = await supabase
          .from('sheets')
          .update({ position: index })
          .eq('id', sheet.id);
        console.log('currentSheets update', currentSheets);
      })
    );
    setCurrentSheets(newCurrentSheets);
    localStorage.setItem('currentSheets', JSON.stringify(newCurrentSheets));
  };

  return (
    <Wrapper className={className}>
      <section className='sidebar-container'>
        <label>Sheets</label>
        <SideBarPositionItem />
        <DragDropContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(result) => {
            setIsDragging(false);
            updatePositionsOnDragEnd(result);
          }}
        >
          <Droppable droppableId='sheets'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`draggable-area ${isDragging ? 'dragging' : ''}`}
              >
                {currentSheets.map((sheet, index) => (
                  <Draggable
                    key={sheet.id}
                    draggableId={sheet.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SideBarItem sheet={sheet} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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

  .draggable-area {
    border: 1px solid var(--grey-100);
  }
  .draggable-area.dragging {
    box-sizing: border-box;
    background-color: var(--grey-200);
    border: 1px solid var(--grey-400);
    border-radius: 4px;
  }
`;
