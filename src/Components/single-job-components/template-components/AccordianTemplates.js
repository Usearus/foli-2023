import { useContext } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';
import TemplateCard from './TemplateCard';

const AccordianTemplates = () => {
	const { allTemplates, setPreviewTemplate, setActiveTemplate } =
		useContext(DatabaseContext);

	const handleClick = (template) => {
		setActiveTemplate(template);
		setPreviewTemplate(true);
	};

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
			return (
				<Accordion.Item key={`${status}-${index}`} eventKey={index}>
					<Accordion.Header>
						{status} ({count})
					</Accordion.Header>
					<Accordion.Body>
						{allEmailTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<TemplateCard
									key={template.id}
									template={template}
									handleClick={handleClick}
								/>
							))}
					</Accordion.Body>
				</Accordion.Item>
			);
		}
	);

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
				<Accordion.Item key={`${status}-${index}`} eventKey={index}>
					<Accordion.Header>
						{status} ({count})
					</Accordion.Header>
					<Accordion.Body>
						{allResourceTemplates
							.filter((template) => template.status === status)
							.sort((a, b) => a.title.localeCompare(b.title))
							.map((template) => (
								<TemplateCard
									key={template.id}
									template={template}
									handleClick={handleClick}
								/>
							))}
					</Accordion.Body>
				</Accordion.Item>
			);
		}
	);

	return (
		<Wrapper>
			<label>Email Communications</label>
			<Accordion flush>{emailTemplateCategoryList}</Accordion>
			<br />
			<label>Resources</label>
			<Accordion flush>{resourceTemplateCategoryList}</Accordion>
		</Wrapper>
	);
};

export default AccordianTemplates;

const Wrapper = styled.div`
	label {
		font-weight: 700;
		margin: 0;
	}
`;
