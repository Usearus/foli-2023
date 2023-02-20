import Sheet from './Sheet';

const SheetList = ({ sheets, className }) => {
  return (
    <div className={className}>
      {sheets.map((sheet) => {
        return <Sheet key={sheet.id} {...sheet} />;
      })}
    </div>
  );
};

export default SheetList;
