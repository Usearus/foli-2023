import { useContext } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';
import TemplateCard from './TemplateCard';

const AccordianTemplates = ({ setSelectedCategory, selectedCategory }) => {
	const {
		allTemplates,
		fetchAllTemplates,
		fetchTemplatesByCategory,
		setPreviewTemplate,
		currentTemplates,
		previewTemplate,
		activeTemplate,
		setActiveTemplate,
	} = useContext(DatabaseContext);

	const handleClick = (template) => {
		setActiveTemplate(template);
		setPreviewTemplate(true);
	};

	const categoryCounts = allTemplates.reduce((counts, template) => {
		const status = template.status;
		counts[status] = (counts[status] || 0) + 1;
		return counts;
	}, {});

	const uniqueCategories = Object.keys(categoryCounts).sort();

	const templateCategoryList = uniqueCategories.map((status, index) => {
		const count = categoryCounts[status];
		return (
			<Accordion.Item eventKey={index}>
				<Accordion.Header>
					{status} ({count})
				</Accordion.Header>
				<Accordion.Body>
					{allTemplates
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
	});

	return (
		<Wrapper>
			<Accordion defaultActiveKey='1' flush alwaysOpen>
				{templateCategoryList}
			</Accordion>
		</Wrapper>
	);
};

export default AccordianTemplates;

const Wrapper = styled.div``;
