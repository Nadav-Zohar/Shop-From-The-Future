/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import ShuffleSortTable from "./UsersTable";
import OrderTable from "./OrderTable";
import ProductsTable from "./ProductsTable";
import { GeneralContext } from "../../app/App";
import InfoPopUp from "./infoPopUp";

export const Management = () => {
  const { updateNotification, setLoader } = useContext(GeneralContext);

  const [selected, setSelected] = useState(TABS[0]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState([]);

  const modalInfo = (info) => {
    setIsOpen(true);
    setInfo(info);
  };

  const renderTable = (selected) => {
    switch (selected) {
      case "Users":
        return (
          <ShuffleSortTable allUsers={allUsers} setAllUsers={setAllUsers} />
        );
      case "Products":
        return (
          <ProductsTable
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            modalInfo={modalInfo}
          />
        );
      case "Orders":
        return (
          <OrderTable
            allOrders={allOrders}
            setAllOrders={setAllOrders}
            modalInfo={modalInfo}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const resources = [
      { path: "users", setState: setAllUsers },
      { path: "products", setState: setAllProducts },
      { path: "orders", setState: setAllOrders },
    ];

    const fetchData = async () => {
      setLoader(true);
      setIsLoading(true);

      await Promise.all(
        resources.map(async ({ path, setState }) => {
          try {
            const response = await fetch(`http://localhost:5555/${path}`, {
              credentials: "include",
              headers: {
                Authorization: localStorage.token,
              },
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch ${path}`);
            }
            const data = await response.json();
            setState(data);
          } catch (error) {
            console.error(`Error fetching ${path}:`, error);
          }
        })
      );

      setIsLoading(false);
      setLoader(false);
    };

    fetchData();
  }, []);

  console.table(allProducts);

  return (
    <>
      <section className="overflow-hidden bg-slate-900 px-4 py-12 text-slate-50 w-full min-h-screen">
        <div className="relative z-10 flex flex-col items-center justify-center mt-12">
          <span className="mb-8 text-5xl font-bold">Management</span>
        </div>

        <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
          {TABS.map((tab) => (
            <button
              onClick={() => setSelected(tab)}
              className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
                selected === tab
                  ? "border-violet-500 text-slate-50"
                  : "border-slate-600 bg-transparent text-slate-400"
              }`}
              key={tab}
            >
              <span className="relative z-10">{tab}</span>
              <AnimatePresence>
                {selected === tab && (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.5,
                      ease: "backIn",
                    }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
        {!isLoading && (
          <div className="mx-auto mt-12 max-w-3xl">
            <AnimatePresence mode="wait">
              {Object.entries(QUESTIONS).map(([tab]) => {
                return selected === tab ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      ease: "backIn",
                    }}
                    className="space-y-4"
                    key={tab}
                  >
                    {renderTable(selected)}
                  </motion.div>
                ) : undefined;
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
      <InfoPopUp isOpen={isOpen} setIsOpen={setIsOpen} info={info} />
      <Footer />
    </>
  );
};

const TABS = ["Users", "Products", "Orders"];

const QUESTIONS = {
  Users: [],
  Products: [],
  Orders: [],
};
