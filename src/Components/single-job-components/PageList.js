import { useContext, useEffect, useRef, createRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import Page from './Page';
import styled from 'styled-components';

const PageList = ({ className }) => {
	const { currentPages, settingPageStack, selectedPageID } =
		useContext(DatabaseContext);
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

	// create a ref to the each page
	const pageRef = useRef([]);

	// useEffect to scroll to the page selected from sidebar
	useEffect(() => {
		const pageToScrollTo = pageRef.current.find(
			(page) => page.id === selectedPageID
		);
		if (pageToScrollTo) {
			pageToScrollTo.ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [selectedPageID]);

	return (
		<Wrapper className={`${className}`}>
			{visiblePages.map((page, index) => {
				const ref = createRef();
				pageRef.current[index] = { id: page.id, ref };
				const isSelectedPage = page.id === selectedPageID;
				const pageClassName = isSelectedPage ? 'selected-page' : '';

				return (
					<div
						key={page.id}
						style={{ scrollSnapAlign: 'center' }}
						className={`${stackClassName} ${pageClassName}`}
						ref={ref}>
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
		/* Animate when a page is selected */
		.selected-page {
			-webkit-animation: pulsate-fwd 1s ease-in-out 2 both;
			animation: pulsate-fwd 1s ease-in-out 2 both;
		}

		@-webkit-keyframes pulsate-fwd {
			0% {
				-webkit-transform: scale(1);
				transform: scale(1);
			}
			50% {
				-webkit-transform: scale(1.02);
				transform: scale(1.02);
			}
			100% {
				-webkit-transform: scale(1);
				transform: scale(1);
			}
		}
		@keyframes pulsate-fwd {
			0% {
				-webkit-transform: scale(1);
				transform: scale(1);
			}
			50% {
				-webkit-transform: scale(1.02);
				transform: scale(1.02);
			}
			100% {
				-webkit-transform: scale(1);
				transform: scale(1);
			}
		}
	}
`;
