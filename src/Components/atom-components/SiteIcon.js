import React from 'react';
import { Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import foliLogo from '../../assets/Logo-Foli-Alpha.png';

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
						color: 'var(--primary-700)',
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
				{/* <img
					src={foliLogo}
					alt='foliLogo'
					style={{ width: '80px', marginRight: '20px' }}
				/> */}
			</>
		</LinkContainer>
	);
};

export default SiteIcon;
