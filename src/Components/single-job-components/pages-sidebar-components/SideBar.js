import { useState, useContext, useEffect } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SideBarItem from './SideBarItem';
import { supabase } from '../../../API/supabase';

const SideBar = () => {
	const { currentPages, setCurrentPages } = useContext(DatabaseContext);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const pagesFromStorage = localStorage.getItem('currentPages');
		const sortedPages = JSON.parse(pagesFromStorage).sort(
			(a, b) => a.position - b.position
		);
		setCurrentPages(sortedPages);
	}, [setCurrentPages]);

	const updatePositionsOnDragEnd = async (result) => {
		// console.log(result);
		if (!result.destination) {
			return;
		}

		const newCurrentPages = Array.from(currentPages);
		const [reorderedItem] = newCurrentPages.splice(result.source.index, 1);
		newCurrentPages.splice(result.destination.index, 0, reorderedItem);

		newCurrentPages.forEach((page, index) => {
			page.position = index;
		});

		await Promise.all(
			newCurrentPages.map(async (page, index) => {
				await supabase
					.from('pages')
					.update({ position: index })
					.eq('id', page.id);
				// console.log('currentPages update', currentPages);
			})
		);
		setCurrentPages(newCurrentPages);
		localStorage.setItem('currentPages', JSON.stringify(newCurrentPages));
	};

	return (
		<>
			<label className='pl-4 pb-2 font-bold'>Pages</label>

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
								{currentPages.map((page, index) => (
									<Draggable key={page.id} draggableId={page.id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<SideBarItem page={page} />
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

export default SideBar;
