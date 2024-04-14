/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import { GeneralContext } from "../../app/App";
import { jwtDecode } from "jwt-decode";
import NavButtons from "./NavButtons";
import {
  menuLinkArrowVariants,
  menuLinkVariants,
  menuVariants,
} from "./NavLinks";

const navLinks = [
  { text: "Base Station", route: "/" },
  { text: "Quantum Market", route: "/shop" },
  { text: "Origins & Orbits", route: "/about" },
  { text: "Signal Bridge", route: "/contact" },
  { text: "Management", route: "/management", adminOnly: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { checkAuthenticationAndCleanToken } = useContext(GeneralContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthenticationAndCleanToken();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      setIsAdmin(decoded.isAdmin);
    }
  }, []);

  const filteredNavLinks = navLinks.filter(
    (link) => !link.adminOnly || isAdmin
  );

  return (
    <div>
      <nav className="bg-transparent top-0 w-full p-3 mt-4 border-gray-200 flex items-center justify-between absolute z-[60]">
        <div className="flex items-center gap-3 2xl:ml-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block lg:hidden text-2xl"
            onClick={() => setIsOpen((pv) => !pv)}
          >
            <FiMenu style={{ color: "#f9f3f8" }} />
          </motion.button>
          <svg
            id="logo-35"
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              className="ccompli1"
              fill="#007AFF"
            ></path>{" "}
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              className="ccustom"
              fill="#312ECB"
            ></path>{" "}
          </svg>
          {filteredNavLinks.map((l) => (
            <a
              key={l.text}
              href={l.route}
              rel="nofollow"
              className="hidden lg:block h-[30px] ml-2 overflow-hidden font-medium 2xl:text-2xl 2xl:ml-10"
            >
              <motion.div whileHover={{ y: -30 }}>
                <span
                  className="flex items-center h-[30px] "
                  style={{
                    color: "#f9f3f8",
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  {l.text}
                </span>
                <span
                  className="flex items-center h-[30px] text-indigo-600"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {l.text}
                </span>
              </motion.div>
            </a>
          ))}
        </div>
        <NavButtons />
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
        >
          {filteredNavLinks.map((l) => (
            <motion.a
              key={l.text}
              variants={menuLinkVariants}
              rel="nofollow"
              href={l.route}
              className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
            >
              <motion.span variants={menuLinkArrowVariants}>
                <FiArrowRight
                  className="h-[30px]"
                  style={{ color: "#b6b3b8" }}
                />
              </motion.span>
              <motion.div whileHover={{ y: -30 }}>
                <span
                  className="flex items-center h-[30px]"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {l.text}
                </span>
                <span
                  className="flex items-center h-[30px] text-indigo-600"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {l.text}
                </span>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
