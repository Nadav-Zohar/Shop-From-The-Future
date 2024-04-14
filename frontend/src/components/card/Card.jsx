/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Card.css";

const Card = ({ name, price, imageName, imageCount, onCardClick, _id }) => {
  return (
    <div className="grid w-full place-content-center z-20 bg-transparent px-4 text-slate-900">
      <TiltCard
        name={name}
        price={price}
        imageName={imageName}
        imageCount={imageCount}
        onClick={() => onCardClick(_id)}
      />
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const randomInt = Math.floor(Math.random() * 4) + 1;

const TiltCard = ({ name, price, imageName, onClick }) => {
  const ref = useRef(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onClick={() => onClick(true)}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      className="relative h-[320px] w-[270px] mt-10 rounded-xl bg-transparent cursor-pointer"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          color: "#f9f3f8",
          fontFamily: "Orbitron, sans-serif",
        }}
        className="details absolute inset-4 place-content-center rounded-xl bg-gradient-to-b from-[#290747] from-20%  to-[#0d4042] to-90% shadow-lg "
      >
        <h2 className="product-name uppercase bg-[#290747] min-w-fit min-h-fit text-md text-slate-200 font-medium rounded-br-2xl rounded-tl-2xl rounded-tr-3xl tracking-wide">
          {name}
        </h2>
        <p className="product-price bg-[#0d4042] text-slate-200 font-medium w-18 h-8 text-xs rounded-tl-2xl rounded-br-3xl">
          ${price}
        </p>
        <div className="product">
          <img
            className="product-image "
            src={`http://localhost:5555/images/${imageName}/${imageName}-${randomInt}.png`}
            alt={name}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
