import { useState, useContext, useEffect } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SideBarItemNotes from './SideBarItemNotes';
import { supabase } from '../../API/supabase';

const SideBarNotes = () => {
	const { userNotePages, setUserNotePages } = useContext(DatabaseContext);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const sortedPages = userNotePages.sort((a, b) => a.position - b.position);
		setUserNotePages(sortedPages);
	}, [setUserNotePages, userNotePages]);

	const updatePositionsOnDragEnd = async (result) => {
		if (!result.destination) {
			return;
		}

		const newCurrentNotePages = Array.from(userNotePages);
		const [reorderedItem] = newCurrentNotePages.splice(result.source.index, 1);
		newCurrentNotePages.splice(result.destination.index, 0, reorderedItem);

		newCurrentNotePages.forEach((page, index) => {
			page.position = index;
		});

		await Promise.all(
			newCurrentNotePages.map(async (page, index) => {
				await supabase
					.from('pages')
					.update({ position: index })
					.eq('id', page.id);
				console.log('userNotePages updated to', userNotePages);
			})
		);
		setUserNotePages(newCurrentNotePages);
	};

	return (
		<>
			<label className='pl-4 pb-2 font-bold'>Notes</label>

			<div className='scroll-container'>
				<DragDropContext
					onDragStart={() => {
						setIsDragging(true);
					}}
					onDragEnd={(result) => {
						setIsDragging(false);
						updatePositionsOnDragEnd(result);
					}}>
					<Droppable droppableId='pages'>
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className={`draggable-area ${isDragging ? 'dragging' : ''}`}>
								{userNotePages.map((page, index) => (
									<Draggable key={page.id} draggableId={page.id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<SideBarItemNotes page={page} />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	);
};

export default SideBarNotes;
