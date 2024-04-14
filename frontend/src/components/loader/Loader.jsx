import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[60] grid place-items-center overflow-y-scroll z-[100]">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.6,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-indigo-500" />
      <motion.div variants={variants} className="h-12 w-2 bg-indigo-500" />
      <motion.div variants={variants} className="h-12 w-2 bg-indigo-500" />
      <motion.div variants={variants} className="h-12 w-2 bg-indigo-500" />
      <motion.div variants={variants} className="h-12 w-2 bg-indigo-500" />
    </motion.div>
  );
};

export default Loader;
