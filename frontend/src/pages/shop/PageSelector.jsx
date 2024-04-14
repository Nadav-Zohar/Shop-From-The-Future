/* eslint-disable react/prop-types */
export default function PageSelector({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <>
      <div className="flex items-center justify-center space-x-4 my-4 relative z-50">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-violet-500 disabled:bg-gray-600"
        >
          Previous
        </button>

        <div className="flex justify-center space-x-2 my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-violet-500 text-white"
                  : "bg-slate-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-violet-500 disabled:bg-gray-600"
        >
          Next
        </button>
      </div>
    </>
  );
}
