import { useContext, useState, useEffect } from 'react';
import SideBarNotes from '../Components/notes-components/SideBarNotes';
import NoteList from '../Components/notes-components/NoteList';
import TopBarNotes from '../Components/notes-components/TopBarNotes';
import { DatabaseContext } from '../context/DatabaseContext';
import Loader from '../Components/atom-components/Loader';

const NotesPage = () => {
	const { userNotePages } = useContext(DatabaseContext);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate loading
	useEffect(() => {
		// Assuming you have data loading or API calls here
		// Set the loading state to false once everything is loaded
		if (userNotePages) {
			setIsLoading(false);
		}
	}, [userNotePages]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-full w-full'>
				<Loader />
			</div>
		);
	}

	if (userNotePages.length > 0) {
		return (
			<div className='flex flex-col h-full text-base-content'>
				<div className='flex-grow grid grid-rows-[70px_auto] grid-cols-1 lg:grid-cols-[250px_auto]'>
					{/* Top area */}
					<TopBarNotes />

					{/* Bottom left area */}
					<div className='hidden lg:flex flex-col row-span-1 pt-4'>
						<SideBarNotes />
					</div>

					{/* Bottom right area */}
					<div className='row-span-1 col-span-1 pb-4 pt-0 px-0 overflow-hidden'>
						<NoteList />
					</div>
				</div>
			</div>
		);
	}

	if (userNotePages.length === 0) {
		return (
			<div className='flex flex-col h-full text-base-content'>
				<div className='flex-grow grid grid-rows-[70px_auto] grid-cols-1'>
					{/* Top area */}
					<TopBarNotes />

					{/* Bottom area */}
					<div className='row-span-1 col-span-1 p-4 flex justify-center items-center'>
						<h2 className='text-lg'>
							No notes added. Add your first note to get started.
						</h2>
					</div>
				</div>
			</div>
		);
	}
};

export default NotesPage;
