import { useContext } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const TemplateTopbar = ({ setSelectedCategory, selectedCategory }) => {
	const {
		allTemplates,
		fetchAllTemplates,
		fetchTemplatesByCategory,
		setPreviewTemplate,
	} = useContext(DatabaseContext);

	const categoryCounts = allTemplates.reduce((counts, template) => {
		const category = template.category;
		counts[category] = (counts[category] || 0) + 1;
		return counts;
	}, {});

	const uniqueCategories = Object.keys(categoryCounts).sort();

	const handleCategoryChange = (e) => {
		const category = e.target.value;
		if (category === 'All') {
			fetchAllTemplates();
		} else {
			fetchTemplatesByCategory(category);
		}
		setSelectedCategory(category);
		setPreviewTemplate(false);
	};

	const templateCategoryList = uniqueCategories.map((category) => {
		const count = categoryCounts[category];
		return (
			<option key={category} value={category}>
				{category} ({count})
			</option>
		);
	});

	const allCount = allTemplates.length;
	const allButtonLabel = `All (${allCount})`;

	return (
		<Wrapper>
			<div className='topbar-container'>
				<div className='category-container'>
					<label htmlFor='category-select'>Categories</label>
					<Form.Select
						id='category-select'
						size='sm'
						aria-label='Select template category'
						onChange={handleCategoryChange}
						value={selectedCategory}
						className='select'>
						<option value='All'>{allButtonLabel}</option>
						{templateCategoryList}
					</Form.Select>
				</div>
			</div>
		</Wrapper>
	);
};

export default TemplateTopbar;

const Wrapper = styled.div`
	.topbar-container {
		width: 100%;
		background: var(--grey-100);
	}

	.select {
		cursor: pointer;
		border: 1px solid var(--grey-600);
		border-radius: 90px;
		max-width: 240px;
	}

	label {
		font-weight: bold;
	}
`;
