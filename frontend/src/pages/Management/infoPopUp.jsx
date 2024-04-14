/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";

const InfoPopUp = ({ isOpen, setIsOpen, info }) => {
  return <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} info={info} />;
};

const SpringModal = ({ isOpen, setIsOpen, info }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[60] grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full min-h-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="rounded-t-lg dark:bg-gray-300">
                    <tr className="text-right">
                      <th className="p-3 text-left">Field</th>
                      <th className="p-3 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(info).map(([key, value]) => (
                      <tr
                        className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100"
                        key={key}
                      >
                        <td className="px-3 py-2 text-left font-medium">
                          {key}
                        </td>
                        <td className="px-3 py-2 text-left">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPopUp;
