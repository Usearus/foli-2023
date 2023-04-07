import { useState, useContext, useEffect } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import SideBarItem from './SideBarItem';
import SideBarPositionItem from './SideBarPositionItem';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '../API/supabase';

const SideBar = ({ className }) => {
    const { currentSheets, setCurrentSheets } = useContext(DatabaseContext);
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
                await supabase
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
                                className={`draggable-area ${
                                    isDragging ? 'dragging' : ''
                                }`}
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
        padding: 1rem 0;
        height: 100%;
        background: var(--grey-200);
        color: var(--grey-800);
        width: 100%;
        /* border-right: 1px solid var(--grey-300); */
    }

    .draggable-area {
        border: 1px solid var(--grey-200);
    }

    .draggable-area.dragging {
        box-sizing: border-box;
        background-color: var(--grey-200);
        border: 1px solid var(--grey-400);
        border-radius: 4px;
    }
    label {
        font-weight: 700;
    }
    // Desktop
    @media (min-width: 576px) {
        .sidebar-container {
            padding: 1rem 1rem;
        }
        .top-bar {
            display: flex;
        }
    }
`;
