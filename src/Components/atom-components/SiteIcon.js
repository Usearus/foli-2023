import React from 'react';
import { Badge } from 'react-bootstrap';
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
						paddingRight: '.25rem',
					}}>
					fol<i>i</i>
				</span>
				<span>
					<Badge
						pill
						style={{
							fontSize: '.6rem',
							marginRight: '1rem',
						}}>
						alpha
					</Badge>
				</span>
			</>
		</LinkContainer>
	);
};

export default SiteIcon;
