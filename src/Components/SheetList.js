import Sheet from './Sheet';
import { useContext } from 'react';
import { AirtableContext } from '../context/AirtableContext';

const SheetList = ({ sheets, className }) => {
  const { currentSheets } = useContext(AirtableContext);

  return (
    <div className={className}>
      {sheets
        .filter((sheet) => !currentSheets.find((s) => s.id === sheet.id).hidden)
        .map((sheet) => {
          return <Sheet key={sheet.id} {...sheet} id={sheet.id} />;
        })}
    </div>
  );
};

export default SheetList;
