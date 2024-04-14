/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import { useState } from "react";

const ProductModal = ({ isOpen, setIsOpen, productId, products }) => {
  const product = products.find((p) => p._id === productId);

  const [quantity, setQuantity] = useState(1);

  const closeModalAndResetQuantity = () => {
    setIsOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModalAndResetQuantity}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[60] grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-lg md:w-10/12 w-12/12 shadow-xl cursor-default relative overflow-hidden flex md:flex-row flex-col"
            >
              {product && <ProductCarousel product={product} />}
              {product && (
                <ProductDetails
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductModal;
