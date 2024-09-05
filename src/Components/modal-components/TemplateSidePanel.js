import { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../../Custom Hooks/useAlert';
import { supabase } from '../../API/supabase';
import { DatabaseContext } from '../../context/DatabaseContext';
import SidePanel from './SidePanel';
import MarkdownView from 'react-showdown';
// import { EnvelopeClosedIcon, FileTextIcon } from '@radix-ui/react-icons';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const TemplateSidePanel = ({ isOpen, onClose }) => {
	const { user } = useAuth0();
	const { setAlert } = useAlert();
	const [editing, setEditing] = useState(false);

	const {
		allTemplates,
		previewTemplate, // KEEP
		activeTemplate, // KEEP
		setActiveTemplate, // KEEP
		setPreviewTemplate, // KEEP
		currentJob, // KEEP
		fetchCurrentJobPages, // KEEP
		currentJobPages, // KEEP
	} = useContext(DatabaseContext);

	const handleSetTemplateClick = (template) => {
		setActiveTemplate(template);
		setPreviewTemplate(true);
	};

	const handleCloseActiveTemplate = () => {
		setActiveTemplate(null);
		setPreviewTemplate(false);
	};

	const handleAddPageClick = () => {
		setActiveTemplate(null);
		setPreviewTemplate(false);
		addPageToJob();
		onClose();
	};

	const addPageToJob = async () => {
		await supabase.from('pages').select().eq('id', currentJob.id);
		const { error } = await supabase.from('pages').insert({
			account: user.email,
			title: activeTemplate.title,
			content: activeTemplate.content,
			jobid: currentJob.id,
			position: currentJobPages.length,
		});
		// console.log(data, 'template added');
		fetchCurrentJobPages(currentJob);
		setAlert('Template added', 'success');
		if (error) {
			setAlert('Unable to add template.', 'error');
			console.log(error);
			return;
		}
	};

	const handleEditTemplateClick = () => {
		setEditing(true);
	};

	const handleCancelEditClick = () => {
		setEditing(false);
	};

	//
	//
	// EMAIL ACCORDION FUNCTIONS
	const allEmailTemplates = allTemplates.filter(
		(template) => template.category === 'Emails'
	);

	const emailCategoryCounts = allEmailTemplates.reduce((counts, template) => {
		const status = template.status;
		counts[status] = (counts[status] || 0) + 1;
		return counts;
	}, {});

	const uniqueEmailCategories = Object.keys(emailCategoryCounts).sort();

	const emailTemplateCategoryList = uniqueEmailCategories.map(
		(status, index) => {
			const count = emailCategoryCounts[status];
			// Single-accordian container
			return (
				<div
					key={`${status}-${index}`}
					eventkey={index}
					className='collapse collapse-arrow join-item bg-base-200 cursor-pointer'>
					<input type='radio' name='my-accordion-2' />
					{/* Accordian title */}
					<div className='collapse-title flex gap-2 items-baseline'>
						{status} <span className='text-sm'>({count})</span>
					</div>
					{/* Accordian content */}
					<div className='collapse-content flex flex-col gap-4'>
						{/* Map of cards */}
						{allEmailTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<div
									onClick={() => handleSetTemplateClick(template)}
									className='card card-compact bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-base'>
											{template.title}
											{/* <div className='badge badge-primary'>NEW</div> */}
										</h2>
										<p className='text-sm text-secondary-content'>
											{template.description}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
			);
		}
	);

	//
	//
	// RESOURCE ACCORDION FUNCTIONS
	const allResourceTemplates = allTemplates.filter(
		(template) => template.category === 'Resources'
	);

	const resourceCategoryCounts = allResourceTemplates.reduce(
		(counts, template) => {
			const status = template.status;
			counts[status] = (counts[status] || 0) + 1;
			return counts;
		},
		{}
	);

	const uniqueResourceCategories = Object.keys(resourceCategoryCounts).sort();

	const resourceTemplateCategoryList = uniqueResourceCategories.map(
		(status, index) => {
			const count = resourceCategoryCounts[status];
			return (
				<div
					key={`${status}-${index}`}
					eventkey={index}
					className='collapse collapse-arrow join-item bg-base-200 cursor-pointer'>
					<input type='radio' name='my-accordion-2' />
					{/* Accordian title */}
					<div className='collapse-title flex gap-2 items-baseline'>
						{status} <span className='text-sm'>({count})</span>
					</div>
					{/* Accordian content */}
					<div className='collapse-content flex flex-col gap-4'>
						{/* Map of cards */}
						{allResourceTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<div
									onClick={() => handleSetTemplateClick(template)}
									className='card card-compact bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-base'>
											{template.title}
											{/* <div className='badge badge-primary'>NEW</div> */}
										</h2>
										<p className='text-sm text-secondary-content'>
											{template.description}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
			);
		}
	);

	//
	//
	// DOCUMENTS ACCORDION FUNCTIONS
	const allDocumentTemplates = allTemplates.filter(
		(template) => template.category === 'Documents'
	);

	const documentCategoryCounts = allDocumentTemplates.reduce(
		(counts, template) => {
			const status = template.status;
			counts[status] = (counts[status] || 0) + 1;
			return counts;
		},
		{}
	);

	const uniqueDocumentCategories = Object.keys(documentCategoryCounts).sort();

	const documentTemplateCategoryList = uniqueDocumentCategories.map(
		(status, index) => {
			const count = documentCategoryCounts[status];
			return (
				<div
					key={`${status}-${index}`}
					eventkey={index}
					className='collapse collapse-arrow join-item bg-base-200 cursor-pointer'>
					<input type='radio' name='my-accordion-2' />
					{/* Accordian title */}
					<div className='collapse-title flex gap-2 items-baseline'>
						{status} <span className='text-sm'>({count})</span>
					</div>
					{/* Accordian content */}
					<div className='collapse-content flex flex-col gap-4'>
						{/* Map of cards */}
						{allDocumentTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<div
									onClick={() => handleSetTemplateClick(template)}
									className='card card-compact bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-base'>
											{template.title}
											{/* <div className='badge badge-primary'>NEW</div> */}
										</h2>
										<p className='text-sm text-secondary-content'>
											{template.description}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
			);
		}
	);

	//
	//
	// CUSTOM ACCORDION FUNCTIONS
	const allCustomTemplates = allTemplates.filter(
		(template) => template.category === 'Custom'
	);

	const customCategoryCounts = allCustomTemplates.reduce((counts, template) => {
		const status = template.status;
		counts[status] = (counts[status] || 0) + 1;
		return counts;
	}, {});

	const uniqueCustomCategories = Object.keys(customCategoryCounts).sort();

	const customTemplateCategoryList = uniqueCustomCategories.map(
		(status, index) => {
			const count = customCategoryCounts[status];
			return (
				<div
					key={`${status}-${index}`}
					eventkey={index}
					className='collapse collapse-arrow join-item bg-base-200 cursor-pointer'>
					<input type='radio' name='my-accordion-2' />
					{/* Accordian title */}
					<div className='collapse-title flex gap-2 items-baseline'>
						{status} <span className='text-sm'>({count})</span>
					</div>
					{/* Accordian content */}
					<div className='collapse-content flex flex-col gap-4'>
						{/* Map of cards */}
						{allCustomTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<div
									onClick={() => handleSetTemplateClick(template)}
									className='card card-compact bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-base'>
											{template.title}
											<div className='badge badge-primary'>Custom</div>
										</h2>
										<p className='text-sm text-secondary-content'>
											{template.description}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
			);
		}
	);

	//
	//
	return (
		<SidePanel isOpen={isOpen} onClose={onClose} title='Templates'>
			{!previewTemplate ? (
				<div role='tablist' className='tabs tabs-bordered'>
					{/* Email Tab */}
					<input
						type='radio'
						name='templates'
						role='tab'
						className='tab'
						aria-label='Emails'
						defaultChecked
					/>
					{/* Email Tab content*/}
					<div role='tabpanel' className='tab-content pt-6'>
						{/* Multi-accordian container*/}
						<div className='join join-vertical w-full '>
							{/* Accordian Map */}
							{emailTemplateCategoryList}
						</div>
					</div>

					{/* Resources Tab */}
					<input
						type='radio'
						name='templates'
						role='tab'
						className='tab'
						aria-label='Strategies'
					/>
					{/* Resources Tab content*/}
					<div role='tabpanel' className='tab-content pt-6'>
						{/* Multi-accordian container*/}
						<div className='join join-vertical w-full '>
							{/* Accordian Map */}
							{resourceTemplateCategoryList}
						</div>
					</div>

					{/* Documents Tab */}
					<input
						type='radio'
						name='templates'
						role='tab'
						className='tab'
						aria-label='Documents'
					/>
					{/* Documents Tab content*/}
					<div role='tabpanel' className='tab-content pt-6'>
						{/* Multi-accordian container*/}
						<div className='join join-vertical w-full '>
							{/* Accordian Map */}
							{documentTemplateCategoryList}
						</div>
					</div>

					{/* Custom Tab */}
					<input
						type='radio'
						name='templates'
						role='tab'
						className='tab'
						aria-label='Custom'
					/>
					{/* Custom Tab content */}
					<div role='tabpanel' className='tab-content pt-6'>
						{/* Empty state */}
						{!customTemplateCategoryList.length > 0 ? (
							<h4 className='text-lg'>
								No custom templates created yet. Start by going to the options
								of any page and clicking "save as template".
							</h4>
						) : (
							// Non-empty state
							<div className='join join-vertical w-full '>
								{/* Accordian Map */}
								{customTemplateCategoryList}
							</div>
						)}
					</div>
				</div>
			) : (
				// Content when a template is clicked
				<>
					{!editing ? (
						<div className='h-full flex flex-col gap-4 items-start'>
							<button
								className='btn btn-sm btn-ghost text-primary hover:bg-base-200'
								onClick={handleCloseActiveTemplate}>
								<ArrowLeftIcon /> Back to templates
							</button>
							<div className='p-4 bg-base-200 w-full shadow-md h-full flex flex-col'>
								<header className='page-title'>
									<div className='flex justify-between items-center'>
										<h6 className='text-base font-bold'>
											{activeTemplate.title}
										</h6>
										<button
											className='btn btn-sm btn-primary btn-outline'
											onClick={handleEditTemplateClick}>
											Edit template
										</button>{' '}
									</div>
									<div className='divider m-0 pb-[1px]' />
								</header>

								<MarkdownView
									className='flex-grow overflow-y-auto markdown-content'
									markdown={activeTemplate.content}
								/>
								{/* Actions */}
								<div className='flex gap-2 justify-end mt-4'>
									<button
										className='btn btn-sm btn-primary'
										onClick={handleAddPageClick}>
										Add page
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className='h-full flex flex-col gap-4 items-start'>
							<button
								className='btn btn-sm btn-primary'
								onClick={handleCancelEditClick}>
								Cancel
							</button>
						</div>
					)}
				</>
			)}
		</SidePanel>
	);
};

export default TemplateSidePanel;
