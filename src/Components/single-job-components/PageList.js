import { useContext, useEffect, useRef, createRef } from 'react';
import { DatabaseContext } from '../../context/DatabaseContext';
import Page from './Page';

const PageList = () => {
	const { currentPages, selectedPageID } = useContext(DatabaseContext);
	const visiblePages = currentPages.filter((page) => page.visible);

	// create a ref to the Pages
	const pageRef = useRef([]);
	const lastPageRef = useRef(null);
	const prevLengthRef = useRef(currentPages.length);

	useEffect(() => {
		const pageToScrollTo = pageRef.current.find(
			(page) => page.id === selectedPageID
		);
		// Scroll to the Page that is selected in Sidebar
		if (pageToScrollTo && pageToScrollTo.ref.current) {
			pageToScrollTo.ref.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			// If scrollIntoView is null or pageToScrollTo is not found, set the current page to the first page
			const firstPage = pageRef.current[0];
			if (firstPage && firstPage.ref.current) {
				firstPage.ref.current.scrollIntoView({ behavior: 'smooth' });
			}
		}

		// Scroll to the last page when currentPages increases
		if (currentPages.length > prevLengthRef.current) {
			if (lastPageRef.current && lastPageRef.current.scrollIntoView) {
				lastPageRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}

		// Update prevLengthRef.current
		prevLengthRef.current = currentPages.length;
	}, [selectedPageID, currentPages.length]);

	if (visiblePages.length > 0) {
		return (
			<div className='flex gap-4 h-full overflow-x-auto snap-x snap-mandatory pl-4 lg:pl-0 lg:snap-none '>
				{visiblePages.map((page, index) => {
					const ref = createRef();
					pageRef.current[index] = { id: page.id, ref };
					const isSelectedPage = page.id === selectedPageID;
					const pageClassName = isSelectedPage ? 'selected-page' : '';

					return (
						<div
							key={page.id}
							className={`h-full snap-center lg:snap-align-none  ${pageClassName}`}
							ref={ref}>
							<Page key={page.id} id={page.id} {...page} />
						</div>
					);
				})}
				<div ref={lastPageRef} style={{ visibility: 'hidden' }} />
			</div>
		);
	}

	if (visiblePages.length === 0) {
		return (
			<div className='text-lg flex justify-center items-center w-full'>
				<h5>No pages are visible. Toggle visibility in Pages list.</h5>
			</div>
		);
	}
};

export default PageList;
