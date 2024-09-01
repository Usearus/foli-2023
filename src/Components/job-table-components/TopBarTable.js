import AddJobBtn from '../modal-components/AddJobBtn';

const TopBarTable = () => {
	return (
		<div className='px-4 py-3 row-span-1 col-span-1 lg:col-span-2 flex items-center justify-between z-10'>
			<div>
				<p className='text-base md:text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
					Jobs
				</p>
				<p className='text-sm hidden md:block'>
					View jobs within your job search.
				</p>
			</div>

			<div className='flex items-center'>
				<AddJobBtn />
			</div>
		</div>
	);
};

export default TopBarTable;
