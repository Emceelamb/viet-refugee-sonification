export const DataComponet = ({ year, refugeeNumber }) => {
  return (
    <>
      <span className="text-4xl font-semibold">{year}</span>
      <p className="text-xl">{refugeeNumber} refugees</p>
    </>
  );
};
