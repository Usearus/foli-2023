import { useState, useContext, useEffect } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '../../../API/supabase';

const SideBar = ({ className }) => {
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
		console.log(result);
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
				console.log('currentPages update', currentPages);
			})
		);
		setCurrentPages(newCurrentPages);
		localStorage.setItem('currentPages', JSON.stringify(newCurrentPages));
	};

	return (
		<Wrapper className={className}>
			<section className='sidebar-container'>
				<label>Pages</label>
				<div className='scroll-container'>
					<DragDropContext
						onDragStart={() => setIsDragging(true)}
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
										<Draggable
											key={page.id}
											draggableId={page.id}
											index={index}>
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
	}

	.scroll-container {
		height: 80%;
		max-height: 300px;
		overflow-y: auto;
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
			padding: 1rem 0rem 1rem 1rem;
		}
		.scroll-container {
			height: 80%;
			max-height: 600px;
			overflow-y: auto;
		}
	}
`;
