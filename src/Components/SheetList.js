import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import Sheet from './Sheet';
import SheetPosition from './SheetPosition';

const SheetList = ({ className }) => {
    const { currentSheets } = useContext(DatabaseContext);

    const visibleSheets = currentSheets.filter((sheet) => sheet.visible);

    return (
        <div className={className} style={{ scrollSnapType: 'x mandatory' }}>
            <SheetPosition />
            {visibleSheets.map((sheet) => {
                return <Sheet key={sheet.id} {...sheet} id={sheet.id} />;
            })}
        </div>
    );
};

export default SheetList;
