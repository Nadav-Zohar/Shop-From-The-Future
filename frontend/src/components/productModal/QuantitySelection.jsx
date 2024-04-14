/* eslint-disable react/prop-types */
const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) =>
      prevQuantity - 1 <= 0 ? 1 : prevQuantity - 1
    );
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          className="px-3 py-1 w-10 border-2 border-slate-400 text-slate-200 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 rounded-md"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={increment}
          className="px-3 py-1 w-10 border-2 border-slate-400 text-slate-200 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 rounded-md"
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
