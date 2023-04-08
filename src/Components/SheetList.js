import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import Sheet from './Sheet';

const SheetList = ({ className }) => {
    const { currentSheets } = useContext(DatabaseContext);

    const visibleSheets = currentSheets.filter((sheet) => sheet.visible);

    return (
        <div className={className}>
            {visibleSheets.map((sheet) => {
                return (
                    <div
                        key={sheet.id}
                        style={{ scrollSnapAlign: 'center', height: '100%' }}
                    >
                        <Sheet key={sheet.id} {...sheet} id={sheet.id} />
                    </div>
                );
            })}
        </div>
    );
};

export default SheetList;
