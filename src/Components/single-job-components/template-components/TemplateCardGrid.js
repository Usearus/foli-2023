import { useContext } from 'react';
import { DatabaseContext } from '../../../context/DatabaseContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';
import MarkdownView from 'react-showdown';
import AccordianTemplates from './AccordianTemplates';

const TemplateCardGrid = () => {
	const { previewTemplate, activeTemplate } = useContext(DatabaseContext);

	return (
		<Wrapper>
			{!previewTemplate ? (
				<AccordianTemplates />
			) : (
				<div className='page-body'>
					<header className='page-title'>
						<h6>{activeTemplate.title}</h6>
						<hr />
					</header>
					<MarkdownView
						className='page-content markdown-content'
						markdown={activeTemplate.content}
					/>
				</div>
			)}
		</Wrapper>
	);
};

export default TemplateCardGrid;

const Wrapper = styled.div`
	.list-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1.5rem;
		overflow-x: hidden;
		height: 100%;
	}

	.page-body {
		height: 100%;
		background: var(--white);
	}

	.page-title {
		padding: 1rem 1rem 0.5rem 1rem;
	}
	.page-title h6 {
		margin-bottom: 0rem;
		font-weight: 600;
		margin: 0 1rem;
		padding: 0.85rem 0;
	}
	.page-content {
		overflow-x: scroll;
		max-height: 700px;
		height: auto;
	}

	hr {
		margin: 0 0.5rem;
	}

	.markdown-content {
		padding: 1rem 2rem;
		h1 {
			font-size: 1.8rem;
		}

		h2 {
			font-size: 1.25rem;
		}

		h3 {
			font-size: 1rem;
		}

		h4 {
			font-size: 1rem;
		}

		h5 {
			font-size: 1rem;
		}
		p {
			margin-bottom: 0;
		}

		ul {
			padding-bottom: 1rem !important;
			padding-left: 2rem;
			list-style-type: circle !important;
		}
	}
`;
