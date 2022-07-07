export const Button = ({ onClick, children}) => {
  return (
    <button className="text-md p-2 hover:text-gray-500 transition-all" onClick={onClick}>
      {children}
    </button>
  );
};
