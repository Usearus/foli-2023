import { useState, useRef, useEffect } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import DeletePageBtn from './DeletePageBtn';

const PageDropdown = ({ page }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', closeDropdown);
		} else {
			document.removeEventListener('mousedown', closeDropdown);
		}

		return () => {
			document.removeEventListener('mousedown', closeDropdown);
		};
	}, [isOpen]);

	return (
		<div className='relative' ref={dropdownRef}>
			<button className='btn btn-ghost btn-sm' onClick={toggleDropdown}>
				<DotsVerticalIcon />
			</button>
			{isOpen && (
				<div
					className={
						'absolute mt-2 right-0 bg-base-100 shadow-lg rounded-2xl w-52 z-10 animate-scale-in'
					}
					style={{ transformOrigin: 'top right', transform: 'scale(1)' }}>
					<div className='py-2 px-2'>
						<ul>
							<li className='py-2 px-3 hover:bg-neutral bg-base-100 rounded-md text-sm cursor-pointer'>
								<DeletePageBtn page={page} />
							</li>
							<li className='py-2 px-3 hover:bg-neutral bg-base-100 rounded-md text-sm cursor-pointer'>
								Settings
							</li>
							<li className='py-2 px-3 hover:bg-neutral bg-base-100 rounded-md text-sm cursor-pointer'>
								Settings
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default PageDropdown;
