import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const LoginButton = () => {
  return (
    <div className="grid place-content-center">
      <EncryptButton />
    </div>
  );
};

const TARGET_TEXT = "Login";
const CYCLES_PER_LETTER = 5;
const SHUFFLE_TIME = 60;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <a href="/login">
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="group relative overflow-hidden rounded-lg 2xl:rounded-xl border-[1px] border-slate-500 bg-slate-700 px-4 2xl:px-6 py-2 2xl:py-4 font-mono font-medium uppercase text-slate-300 transition-colors hover:text-indigo-300"
      >
        <div className="relative text-sm z-10 flex items-center gap-2 md:text-base 2xl:text-3xl">
          <FiLock />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
    </a>
  );
};

export default LoginButton;
