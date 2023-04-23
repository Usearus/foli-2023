import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import Page from './Page';
import styled from 'styled-components';

const PageList = ({ className }) => {
    const { currentPages, settingPageStack } = useContext(DatabaseContext);
    const visiblePages = currentPages.filter((page) => page.visible);

    const stackClassName = 
        settingPageStack === 'horizontal' ? 'horizontal-stack-page' : 
        settingPageStack === 'vertical' ? 'vertical-stack-page' : 
        '';

    return (
        <Wrapper className={`${className}`}>
            {visiblePages.map((page) => {
                return (
                    <div
                        key={page.id}
                        style={{ scrollSnapAlign: 'center' }}
                        className={stackClassName}
                    >
                        <Page key={page.id} {...page} id={page.id} />
                    </div>
                );
            })}
        </Wrapper>
    );
};

export default PageList;

const Wrapper = styled.div`
    .horizontal-stack-page{
        height: 100%;
    }

    .vertical-stack-page{
        height: 100%;
        
    }

    /* Desktop */
    @media (min-width: 576px) {
    .vertical-stack-page{
    height: 90%;
    }
}
`