/* eslint-disable react/prop-types */
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProductCarousel({ product }) {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(idx);

  const images =
    product.imageName && product.imageCount
      ? Array.from({ length: product.imageCount }, (_, index) => ({
          src: `http://localhost:5555/images/${product.imageName}/${
            product.imageName
          }-${index + 1}.png`,
          id: index,
        }))
      : [];

  const trend = idx > prevIdx ? 1 : -1;

  const imageIndex = Math.abs(idx % images.length);

  return (
    <div className=" min-h-[300px] md:min-h-[500px] md:w-6/12 lg:w-8/12 bg-black relative overflow-hidden">
      {images.length > 0 && (
        <>
          <button
            onClick={() => {
              setPrevIdx(idx);
              setIdx((pv) => pv - 1);
            }}
            className="bg-black/50 hover:bg-black/60 transition-colors text-white p-2 absolute z-10 left-0 top-0 bottom-0"
          >
            <FiChevronLeft />
          </button>
        </>
      )}

      <div className="absolute inset-0 z-[5] backdrop-blur-xl">
        <AnimatePresence initial={false} custom={trend}>
          {images.length > 0 && (
            <motion.img
              variants={imgVariants}
              custom={trend}
              initial="initial"
              animate="animate"
              exit="exit"
              key={images[imageIndex].id}
              src={images[imageIndex].src}
              alt={product.name}
              style={{ y: "-50%", x: "-50%" }}
              className="aspect-square max-h-[90%] max-w-[calc(100%_-_80px)] mx-auto bg-black object-cover shadow-2xl absolute left-1/2 top-1/2"
            />
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setPrevIdx(idx);
          setIdx((pv) => pv + 1);
        }}
        className="bg-black/50 hover:bg-black/60 transition-colors text-white p-2 absolute z-10 right-0 top-0 bottom-0"
      >
        <FiChevronRight />
      </button>

      <AnimatePresence initial={false} custom={trend}>
        {images.length > 0 && images[imageIndex] && (
          <motion.span
            custom={trend}
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={images[imageIndex].id}
            className="text-white text-xl md:text-2xl p-2 rounded-lg bg-white/10 backdrop-blur-lg font-semibold shadow-lg absolute z-20 left-10 bottom-4 capitalize"
          >
            {product.name}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          key={images[imageIndex].id + images.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 object-fill z-0"
          style={{
            backgroundImage: `url(${images[imageIndex].src})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

const imgVariants = {
  initial: (trend) => ({
    x: trend === 1 ? "200%" : "-200%",
    opacity: 0,
  }),
  animate: { x: "-50%", opacity: 1 },
  exit: (trend) => ({
    x: trend === 1 ? "-200%" : "200%",
    opacity: 0,
  }),
};

const titleVariants = {
  initial: (trend) => ({
    y: trend === 1 ? 20 : -20,
    opacity: 0,
  }),
  animate: { y: 0, opacity: 1 },
  exit: (trend) => ({
    y: trend === 1 ? -20 : 20,
    opacity: 0,
  }),
};
