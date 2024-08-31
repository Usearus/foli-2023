import { useState, useEffect, useContext } from 'react';
import { DatabaseContext } from './../../context/DatabaseContext';
import { supabase } from '../../API/supabase';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import useAlert from '../../Custom Hooks/useAlert';
import Loader from './Loader';

const ThemeToggle = () => {
	const { userTheme, userProfile, setUserTheme } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const handleThemeUpdate = async () => {
		const oppositeTheme =
			userTheme === 'customLight' ? 'customDark' : 'customLight';

		// Update the user's theme in Supabase
		const { error } = await supabase
			.from('profiles')
			.update({ theme: oppositeTheme })
			.eq('id', userProfile.id);

		if (error) {
			console.log('Error updating theme:', error);
			setAlert('Unable to update theme', 'error');
			return;
		}
		setAlert('Theme updated', 'success');
		setUserTheme(oppositeTheme);
		document.documentElement.setAttribute('data-theme', oppositeTheme);
		console.log('Theme successfully updated to:', oppositeTheme);
	};

	// Loading state
	const [loading, setLoading] = useState(true); // New loading state

	useEffect(() => {
		// Simulate data fetching
		const timer = setTimeout(() => {
			setLoading(false); // Data is ready
		}, 1000); // Adjust the delay as needed

		return () => clearTimeout(timer); // Cleanup timer on unmount
	}, []);

	if (loading) {
		return null;
	}

	return (
		<div className='flex flex-row gap-2 items-center text-base-content pr-4'>
			<SunIcon />
			<input
				type='checkbox'
				className='toggle'
				checked={userTheme === 'customDark'}
				onChange={handleThemeUpdate}
			/>
			<MoonIcon />
		</div>
	);
};

export default ThemeToggle;
