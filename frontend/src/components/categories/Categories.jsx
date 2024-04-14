/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";

export default function Categories({
  categories,
  onCategorySelect,
  onPriceSelect,
  onReset,
}) {
  const priceRanges = [
    "0-250",
    "250-1000",
    "1000-2500",
    "2500-5000",
    "5000-10000",
    "10000-100000",
  ];

  return (
    <>
      <aside className="w-2/12 relative z-50 p-6 w-22 mt-14 dark:dark:text-gray-100 hidden sm:block">
        <nav className="space-y-8 text-sm ml-1">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracki uppercase dark:dark:text-gray-400">
              Category
            </h2>
            <div className="flex flex-col space-y-1">
              {categories.map((category, index) => (
                <a
                  onClick={() => onCategorySelect(category)}
                  rel="noopener noreferrer"
                  key={index}
                  className="hover:underline cursor-pointer capitalize"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracki uppercase dark:dark:text-gray-400">
              Price
            </h2>
            <div className="flex flex-col space-y-1">
              {priceRanges.map((range, index) => (
                <a
                  onClick={() => onPriceSelect(range)}
                  key={index}
                  className="hover:underline cursor-pointer"
                >
                  {range}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <Button
          variant="outlined"
          color="error"
          style={{ marginTop: "10px" }}
          onClick={() => onReset()}
        >
          Reset Filter
        </Button>
      </aside>
    </>
  );
}
