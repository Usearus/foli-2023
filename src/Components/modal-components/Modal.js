import { useState, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children, title }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [animation, setAnimation] = useState('');

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			setAnimation('animate-fade-in animate-scale-in');
		} else {
			setAnimation('animate-fade-out animate-scale-out');
			setTimeout(() => setIsVisible(false), 200); // Wait for the animation to complete
		}
	}, [isOpen]);

	if (!isVisible) return null;

	const modalContent = (
		<div className='z-50 fixed inset-0 bg-[#0f1214] bg-opacity-70 flex items-center justify-center animate-fade-in'>
			<div
				className={`bg-base-200 p-6 rounded-2xl shadow-sm w-full max-w-[95vw] lg:max-w-[600px] ${animation}`}>
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-semibold'>{title}</h2>
					<button className='btn btn-sm btn-ghost' onClick={onClose}>
						<Cross1Icon />
					</button>
				</div>
				<div className='mt-4'>{children}</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};
export default Modal;