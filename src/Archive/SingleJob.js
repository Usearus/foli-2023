const SingleJob = ({ company, role, sheets, job }) => {
  return (
    <>
      <h2>{company}</h2>
      <h4>{role}</h4>
      <div>
        {sheets
          .filter((sheet) => job.fields.sheets.includes(sheet.id))
          .map((sheet) => (
            <>
              <h2>{sheet.fields.title}</h2>
              <h5>{sheet.fields.content}</h5>
            </>
          ))}
      </div>
    </>
  );
};

export { SingleJob };
