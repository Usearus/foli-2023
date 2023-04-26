import { useContext } from 'react';
import styled from 'styled-components';
import { DatabaseContext } from '../../context/DatabaseContext';
import { ButtonGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import useAlert from '../../Custom Hooks/useAlert';
import { RxViewVertical, RxViewHorizontal } from 'react-icons/rx';
import { supabase } from '../../API/supabase';

const TogglePageLayout = () => {
	const { userProfile, fetchUserProfile } = useContext(DatabaseContext);
	const { setAlert } = useAlert();

	const handleUpdateSettingPageStackClick = async (selectedStack) => {
		const { error } = await supabase
			.from('profiles')
			.update({
				page_stack: selectedStack,
			})
			.eq('id', userProfile.id);
		fetchUserProfile();
		// fetchCurrentPages();
		if (error) {
			setAlert('Something went wrong. Setting not updated.', 'danger');
			console.log('error is', error);
			return;
		}
	};

	return (
		<Wrapper>
			<ButtonGroup aria-label='page-stack-buttons'>
				<OverlayTrigger
					placement='top'
					delay={{ show: 250, hide: 0 }}
					overlay={<Tooltip id='vertical-stack'>Vertical layout</Tooltip>}>
					<Button
						variant='outline-secondary'
						onClick={() => handleUpdateSettingPageStackClick('vertical')}
						active={userProfile.page_stack === 'vertical'}>
						<RxViewHorizontal />
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					placement='top'
					delay={{ show: 250, hide: 0 }}
					overlay={<Tooltip id='horizontal-stack'>Horizontal layout</Tooltip>}>
					<Button
						variant='outline-secondary'
						onClick={() => handleUpdateSettingPageStackClick('horizontal')}
						active={userProfile.page_stack === 'horizontal'}>
						<RxViewVertical />
					</Button>
				</OverlayTrigger>
			</ButtonGroup>
		</Wrapper>
	);
};

export default TogglePageLayout;

const Wrapper = styled.div``;
