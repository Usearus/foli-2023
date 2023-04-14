import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';
import MarkdownView from 'react-showdown';
import TemplateTopbar from './TemplateTopbar';

const TemplateCardGrid = () => {
    const {
        currentTemplates,
        previewTemplate,
        activeTemplate,
        setActiveTemplate,
        setPreviewTemplate,
    } = useContext(DatabaseContext);

    const handleClick = (template) => {
        // console.log('template received ', typeof template);
        setActiveTemplate(template);
        setPreviewTemplate(true);
    };

    return (
        <Wrapper>
            {!previewTemplate ? (
                <>
                    <TemplateTopbar />
                    <div className='list-container'>
                        {currentTemplates
                            .sort((a, b) => a.category.localeCompare(b.category))
                            .map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    handleClick={handleClick}
                                />
                            ))}
                    </div>
                </>
            ) : (
                    <div className='sheet-body'>
                        <header className='sheet-title'>
                            <h6>{activeTemplate.title}</h6>
                            <hr />
                        </header>
                        <MarkdownView
                            className='sheet-content markdown-content'
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
        min-height: 500px;
        max-height: 700px;
    }

    .sheet-body {
        height: 100%;
        background: var(--white);
    }

    .sheet-title {
        padding: 1rem 1rem 0.5rem 1rem;
    }
    .sheet-title h6 {
        margin-bottom: 0rem;
        font-weight: 600;
        margin: 0 1rem;
        padding: 0.85rem 0;
    }
    .sheet-content {
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
