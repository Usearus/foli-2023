import AddNoteBtn from '../modal-components/AddNoteBtn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const TopBarNotes = () => {
	return (
		<div className='p-4 row-span-1 col-span-1 lg:col-span-2 flex items-center justify-between z-10'>
			<div className='flex gap-2 items-center'>
				<a href='/' className='btn btn-ghost btn-sm md:hidden '>
					<ArrowLeftIcon />
				</a>
				<div>
					<p className='text-base md:text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
						Notebook
					</p>
					<p className='text-sm hidden md:block'>View job search notes.</p>
				</div>
			</div>
			<div className='flex items-center'>
				<AddNoteBtn />
			</div>
		</div>
	);
};

export default TopBarNotes;
