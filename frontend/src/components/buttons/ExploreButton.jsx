/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ExploreButton = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };
    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (btn) {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  return (
    <>
      <a href="/shop">
        <motion.button
          whileTap={{ scale: 0.985 }}
          ref={btnRef}
          className="relative w-full max-w-64 overflow-hidden rounded-lg bg-[linear-gradient(to_right,#8A2BE2,#16f5e2,#4B0082)] px-4 py-3 text-lg font-medium text-white pointer-events-auto"
        >
          <span className="pointer-events-none relative z-10 mix-blend-difference">
            Discover Now
          </span>
          <span
            ref={spanRef}
            className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-300"
          />
        </motion.button>
      </a>
    </>
  );
};

export default ExploreButton;
