import Sheet from './Sheet';
import { useContext } from 'react';
import { AirtableContext } from '../context/AirtableContext';

const SheetList = ({ className }) => {
  const { currentSheets } = useContext(AirtableContext);

  return (
    <div className={className}>
      {currentSheets
        .filter((sheet) => !currentSheets.find((s) => s.id === sheet.id).hidden)
        .map((sheet) => {
          return <Sheet key={sheet.id} {...sheet} id={sheet.id} />;
        })}
    </div>
  );
};

export default SheetList;
