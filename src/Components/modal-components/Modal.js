import { useState, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children, title, closeButton = true }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [animation, setAnimation] = useState('');

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			setAnimation('animate-fade-in animate-scale-in');
		} else {
			setAnimation('animate-fade-out animate-scale-out');
			setTimeout(() => setIsVisible(false), 200);
		}
	}, [isOpen]);

	if (!isVisible) return null;

	const modalContent = (
		// Overlay div
		<div className='z-50 fixed inset-0 bg-[#0f1214] bg-opacity-70 flex items-center justify-center animate-fade-in'>
			{/* Modal container */}
			<div
				className={`bg-base-300 p-6 rounded-2xl shadow-sm w-full max-w-[95vw] md:max-w-[600px] ${animation}`}>
				{/* Title & close btn */}
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-semibold py-1'>{title}</h2>
					{closeButton ? (
						<button className='btn btn-sm btn-ghost' onClick={onClose}>
							<Cross1Icon />
						</button>
					) : (
						''
					)}
				</div>
				{/* Children content */}
				<div className='mt-4 max-h-[75vh] overflow-y-autoauto'>{children}</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};
export default Modal;
