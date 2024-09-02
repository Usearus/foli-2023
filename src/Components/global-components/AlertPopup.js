import useAlert from '../../Custom Hooks/useAlert';
import { useState, useEffect } from 'react';

const AlertPopup = () => {
	const { text, type } = useAlert();
	const [isVisible, setIsVisible] = useState(false);
	const [animation, setAnimation] = useState('');

	useEffect(() => {
		if (text) {
			setIsVisible(true);
			setAnimation('animate-slide-down');
		} else {
			setAnimation('animate-slide-up');
			setTimeout(() => setIsVisible(false), 300);
		}
	}, [text]);

	if (!text || !type || !isVisible) return null;

	const renderAlert = () => {
		switch (type) {
			case 'info':
				return (
					<div
						role='alert'
						className={`${animation} alert border border-info bg-base-300`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							className='h-6 w-6 shrink-0 stroke-current'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								className='text-info'
							/>
						</svg>
						<span>{text}</span>
					</div>
				);
			case 'success':
				return (
					<div
						role='alert'
						className={`${animation} alert border border-success bg-base-300`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								className='text-success'
							/>
						</svg>
						<span>{text}</span>
					</div>
				);
			case 'warning':
				return (
					<div
						role='alert'
						className={`${animation} alert border border-warning bg-base-300`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
								className='text-warning'
							/>
						</svg>
						<span>{text}</span>
					</div>
				);
			case 'error':
				return (
					<div
						role='alert'
						className={`${animation} alert border border-error bg-base-300`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
								className='text-error'
							/>
						</svg>
						<span>{text}</span>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className='absolute top-2 left-1/2 transform -translate-x-1/2 z-50'>
			{renderAlert()}
		</div>
	);
};

export default AlertPopup;
