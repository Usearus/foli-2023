import { useContext } from 'react';
import { AirtableContext } from '../context/AirtableContext';
import Sheet from './Sheet';
import SheetPosition from './SheetPosition';

const SheetList = ({ className }) => {
  const { currentSheets } = useContext(AirtableContext);

  const visibleSheets = currentSheets.filter((sheet) => sheet.visible);

  return (
    <div className={className}>
      <SheetPosition />
      {visibleSheets.map((sheet) => {
        return <Sheet key={sheet.id} {...sheet} id={sheet.id} />;
      })}
    </div>
  );
};

export default SheetList;
