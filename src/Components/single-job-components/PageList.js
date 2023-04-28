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

	// create a ref to the Pages
	const pageRef = useRef([]);
	const lastPageRef = useRef(null);
	const prevLengthRef = useRef(currentPages.length);

	useEffect(() => {
		const pageToScrollTo = pageRef.current.find(
			(page) => page.id === selectedPageID
		);
		// Scroll to the Page that is selected in Sidebar
		if (pageToScrollTo) {
			pageToScrollTo.ref.current.scrollIntoView({ behavior: 'smooth' });
		}
		// Scroll to the last page when currentPages increases
		if (currentPages.length > prevLengthRef.current) {
			lastPageRef.current.scrollIntoView({ behavior: 'smooth' });
		}

		prevLengthRef.current = currentPages.length;
	}, [selectedPageID, currentPages.length]);

	if (visiblePages.length > 0) {
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
	}

	if (visiblePages.length === 0) {
		return (
			<Wrapper className={`${className}`}>
				<div className='empty-state'>
					<h5>No pages are visible. Toggle visibility in Pages list.</h5>
				</div>
			</Wrapper>
		);
	}
};

export default PageList;

const Wrapper = styled.div`
	.horizontal-stack-page {
		height: 100%;
	}

	.vertical-stack-page {
		height: 100%;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		min-width: 400px;
		height: 4rem;
		/* width: 500px; */
	}

	/* Desktop */
	@media (min-width: 576px) {
		.vertical-stack-page {
			height: 90%;
			margin: 0 0 1rem 0;
		}
		.selected-page {
			-webkit-animation: pulsate-fwd 1s ease-in-out 1 both;
			animation: pulsate-fwd 1s ease-in-out 1 both;
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

	@media (max-width: 576px) {
		/* Animate when a page is selected */
		.selected-page {
			-webkit-animation: pulsate-fwd 0.1s ease-in-out 1 both;
			animation: pulsate-fwd 0.1s ease-in-out 1 both;
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
			10% {
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
