import { useContext, useEffect, useRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import Page from './Page';
import styled from 'styled-components';

const PageList = ({ className }) => {
	const { currentPages, settingPageStack } = useContext(DatabaseContext);
	const visiblePages = currentPages.filter((page) => page.visible);

	const stackClassName =
		settingPageStack === 'horizontal'
			? 'horizontal-stack-page'
			: settingPageStack === 'vertical'
			? 'vertical-stack-page'
			: '';

	// create a ref to the last page
	const lastPageRef = useRef(null);
	const prevLengthRef = useRef(currentPages.length);

	// useEffect to scroll to the last page when currentPages increases
	useEffect(() => {
		if (currentPages.length > prevLengthRef.current) {
			lastPageRef.current.scrollIntoView({ behavior: 'smooth' });
		}
		prevLengthRef.current = currentPages.length;
	}, [currentPages.length]);

	return (
		<Wrapper className={`${className}`}>
			{visiblePages.map((page) => {
				return (
					<div
						key={page.id}
						style={{ scrollSnapAlign: 'center' }}
						className={stackClassName}>
						<Page key={page.id} id={page.id} {...page} />
					</div>
				);
			})}
			<div ref={lastPageRef} style={{ visibility: 'hidden' }} />
		</Wrapper>
	);
};

export default PageList;

const Wrapper = styled.div`
	.horizontal-stack-page {
		height: 100%;
	}

	.vertical-stack-page {
		height: 100%;
	}

	/* Desktop */
	@media (min-width: 576px) {
		.vertical-stack-page {
			height: 90%;
			margin: 0 0 1rem 0;
		}
	}
`;
