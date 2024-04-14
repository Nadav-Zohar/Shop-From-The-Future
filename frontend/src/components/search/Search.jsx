/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import "./Search.css";

const Search = ({ onChange, value }) => {
  return (
    <div
      className="relative flex h-[100px] items-center justify-center px-4 mt-28 z-50"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      <BeamInput onChange={onChange} value={value} />
    </div>
  );
};

const BeamInput = ({ onChange, value }) => {
  const inputRef = useRef(null);

  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 3,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #a78bfa 100%)`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        inputRef.current.focus();
      }}
      className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="w-full bg-transparent text-sm text-white placeholder-white/80 h-7 focus:outline-0"
        onChange={onChange}
        value={value}
      />

      <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
        <motion.div
          style={{
            backgroundImage,
          }}
          className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
        />
      </div>
    </form>
  );
};

export default Search;
