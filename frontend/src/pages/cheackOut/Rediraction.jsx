/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
export default function Rediraction({ ranDigit }) {

  return (
    <>
      <div
        style={{ fontFamily: "Electrolize, sans-serif" }}
        className="flex w-full flex-col p-6 space-y-4 divide-y sm:p-10 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <h2 className="text-2xl font-semibold text-center">
          Your Order is Complete - Thank You!
        </h2>
        <p className="text-md text-center pt-4">
          Thank you for shopping with "Shop From The Future" ! <br /> We're
          happy to confirm that your order <br /> {ranDigit} <br /> has been
          successfully processed and is now complete.
        </p>
      </div>
    </>
  );
}
