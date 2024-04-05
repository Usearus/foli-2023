import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const SiteIcon = () => {
	return (
		<LinkContainer to='/'>
			<>
				<span
					style={{
						fontWeight: 700,
						fontSize: '1.5rem',
						cursor: 'default',
						paddingRight: '2rem',
						color: 'var(--primary-700)',
					}}>
					fol<i>i</i>
				</span>
			</>
		</LinkContainer>
	);
};

export default SiteIcon;
