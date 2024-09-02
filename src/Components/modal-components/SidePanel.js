import { useState, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';

const SidePanel = ({
	isOpen,
	onClose,
	children,
	title,
	closeButton = true,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [animation, setAnimation] = useState('');

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			setAnimation('animate-slide-in-right');
		} else {
			setAnimation('animate-slide-out-right');
			setTimeout(() => setIsVisible(false), 500);
		}
	}, [isOpen]);

	if (!isVisible) return null;

	const sidePanelContent = (
		<div className='z-50 fixed inset-0 bg-[#0f1214] bg-opacity-70 flex justify-end animate-fade-in'>
			{/* Side Panel container */}
			<div
				className={`w-full bg-base-300 p-6 shadow-sm max-w-[700px] ${animation}`}>
				{/* Title & close btn */}
				<div className='flex justify-between items-center pb-4'>
					<h2 className='text-xl font-semibold py-1'>{title}</h2>
					{closeButton ? (
						<button className='btn btn-sm btn-ghost' onClick={onClose}>
							<Cross1Icon />
						</button>
					) : (
						''
					)}
				</div>
				<div>{children}</div>
			</div>
		</div>
	);

	return createPortal(sidePanelContent, document.body);
};
export default SidePanel;
