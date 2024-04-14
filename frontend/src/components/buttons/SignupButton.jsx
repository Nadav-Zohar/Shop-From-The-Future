import { motion } from "framer-motion";

const SignupButton = () => {
  return (
    <div className="flex items-center justify-center">
      <AIButton />
    </div>
  );
};

const AIButton = () => {
  return (
    <a href="/signup">
      <button className="text-white font-medium px-2 2xl:px-5 py-2 2xl:py-4 rounded-md 2xl:rounded-xl overflow-hidden relative transition-transform hover:scale-105 active:scale-95">
        <span className="relative z-10 2xl:text-3xl md:text-base text-xs whitespace-nowrap">
          Sign up
        </span>
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: "-300%" }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 4,
            ease: "linear",
          }}
          className="bg-[linear-gradient(to_right,#8A2BE2,#16f5e2,#4B0082)] absolute z-0 inset-0 w-[400%]"
        ></motion.div>
      </button>
    </a>
  );
};

export default SignupButton;
