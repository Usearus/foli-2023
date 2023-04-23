import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import Sheet from './Sheet';
import styled from 'styled-components';

const SheetList = ({ className }) => {
    const { currentSheets, settingPageStack } = useContext(DatabaseContext);
    const visibleSheets = currentSheets.filter((sheet) => sheet.visible);

    const stackClassName = 
        settingPageStack === 'horizontal' ? 'horizontal-stack-sheet' : 
        settingPageStack === 'vertical' ? 'vertical-stack-sheet' : 
        '';

    return (
        <Wrapper className={`${className}`}>
            {visibleSheets.map((sheet) => {
                return (
                    <div
                        key={sheet.id}
                        style={{ scrollSnapAlign: 'center' }}
                        className={stackClassName}
                    >
                        <Sheet key={sheet.id} {...sheet} id={sheet.id} />
                    </div>
                );
            })}
        </Wrapper>
    );
};

export default SheetList;

const Wrapper = styled.div`
    .horizontal-stack-sheet{
        height: 100%;
    }

    .vertical-stack-sheet{
        height: 100%;
        
    }

    /* Desktop */
    @media (min-width: 576px) {
    .vertical-stack-sheet{
    height: 90%;
    }
}
`