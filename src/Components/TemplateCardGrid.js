import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';
import TemplateCard from './TemplateCard';
import { Button } from 'react-bootstrap';
import MarkdownView from 'react-showdown';
import { useAuth0 } from '@auth0/auth0-react';
import useAlert from '../Custom Hooks/useAlert';
import { supabase } from '../API/supabase';
import TemplateTopbar from './TemplateTopbar';


const TemplateCardGrid = ({ closeTemplateModal }) => {
    const {
        currentTemplates,
        previewTemplate,
        activeTemplate,
        setActiveTemplate,
        setPreviewTemplate,
        currentJob,
        fetchCurrentSheets,
        currentSheets,
    } = useContext(DatabaseContext);

    const { user } = useAuth0();
    const { setAlert } = useAlert();

    const addSheet = async () => {
        const { data } = await supabase
            .from('sheets')
            .select()
            .eq('id', currentJob.id);
        const { error } = await supabase.from('sheets').insert({
            account: user.email,
            title: activeTemplate.title,
            content: activeTemplate.content,
            jobid: currentJob.id,
            position: currentSheets.length,
        });
        // console.log(data, 'template added');
        fetchCurrentSheets(currentJob);
        setAlert('Sheet successfully added!', 'success');
        if (error) {
            setAlert('There was an error adding the template.', 'error');
            console.log(error);
            return;
        }
    };

    const handleAddSheetClick = () => {
        addSheet();
        closeTemplateModal();
    };

    const handleClick = (template) => {
        // console.log('template received ', typeof template);
        setActiveTemplate(template);
        setPreviewTemplate(true);
    };

    const handleCloseActive = () => {
        setActiveTemplate(null);
        setPreviewTemplate(false);
    };

    // console.log('previewTemplate ', previewTemplate);
    // console.log('template received ', activeTemplate);

    return (
        <Wrapper>
            {!previewTemplate ? (
                <div className='container'>
                    <TemplateTopbar />
                    <div className='grid-container'>
                        
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
                </div>
            ) : (
                <div className='sheet-container'>
                    <div className='sheet-body'>
                        <header className='sheet-title'>
                            <h6>{activeTemplate.title}</h6>
                            <hr />
                        </header>
                        <MarkdownView
                            className='sheet-content markdown-content'
                            markdown={activeTemplate.content}
                        />
                        <div className='sheet-footer'>
                            <Button
                                variant='outline-secondary'
                                onClick={handleCloseActive}
                            >
                                Back to templates
                            </Button>
                            <Button
                                variant='primary'
                                onClick={handleAddSheetClick}
                            >
                                Add sheet
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default TemplateCardGrid;

const Wrapper = styled.div`
    display: flex;

    .grid-container {
        /* overflow-x: scroll; */
        margin-top: 100px;
        gap: 1rem;
    }
    
    .sheet-container {
        
        /* height: 800px; */
        margin: 0 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .sheet-body {
        
        box-shadow: var(--shadow-4);
        background: var(--white);
    }
    .sheet-content {
        
        overflow-x: scroll;
        max-width: 500px;
        padding: 1rem 1rem 0 1rem;
        max-height: 650px;
    }

    .sheet-title {
        padding: 1rem 1rem 0.5rem 1rem;
    }

    .sheet-container h6 {
        margin-bottom: 0rem;
        font-weight: 600;
        margin: 0 1rem;
        padding: 0.85rem 0;
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
    .sheet-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem;
    }
`;
