import { useContext } from 'react';
import { DatabaseContext } from './../../context/DatabaseContext';
import { supabase } from '../../API/supabase';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import useAlert from '../../Custom Hooks/useAlert';

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

	return (
		<div className='flex flex-row gap-2 items-center text-base-content'>
			<input
				type='checkbox'
				className='toggle'
				checked={userTheme === 'customDark'}
				onChange={handleThemeUpdate}
			/>
			{userTheme === 'customDark' ? <MoonIcon /> : <SunIcon />}
		</div>
	);
};

export default ThemeToggle;
