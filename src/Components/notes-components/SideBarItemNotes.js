import { useContext } from 'react';
import { supabase } from '../../API/supabase';
import { DatabaseContext } from '../../context/DatabaseContext';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import DeletePageIcon from '../modal-components/DeletePageIcon';

const SideBarItemNotes = ({ page }) => {
	const { fetchUserNotePages, setSelectedPageID } = useContext(DatabaseContext);

	const handleVisibilityClick = async () => {
		const visible = page.visible;
		await supabase
			.from('pages')
			.update({
				visible: !visible,
			})
			.eq('id', page.id);
		fetchUserNotePages();
	};

	const handleSideBarItemClick = () => {
		setSelectedPageID(page.id);
	};

	return (
		<ul className='py-0 menu menu-sm  rounded-lg w-full'>
			{/* 'group' class enables delete icon somehow*/}
			<li className='w-full group'>
				<div className='flex justify-between items-center pr-1 w-full'>
					<p
						onClick={handleSideBarItemClick}
						className='max-w-[75%] whitespace-nowrap overflow-hidden text-ellipsis'>
						{page.title}
					</p>
					<div className='flex gap-1'>
						{page.locked ? '' : <DeletePageIcon page={page} />}
						<div
							role='button'
							onClick={handleVisibilityClick}
							className='btn btn-xs btn-ghost'>
							{page.visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
						</div>
					</div>
				</div>
			</li>
		</ul>
	);
};

export default SideBarItemNotes;
