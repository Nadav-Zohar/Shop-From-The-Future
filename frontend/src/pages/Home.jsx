import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import ExploreButton from "../components/buttons/ExploreButton";
import Footer from "../components/footer/Footer";

export const Home = () => {
  const [scope, animate] = useAnimate();

  const [size, setSize] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    generateGridCount();
    window.addEventListener("resize", generateGridCount);

    return () => window.removeEventListener("resize", generateGridCount);
  }, []);
  useEffect(() => {
    if (localStorage.token) {
      fetch(`http://localhost:5555/carts/my-cart`, {
        credentials: "include",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length == 1) {
            localStorage.cart = data[0]._id;
          }
        });
    }
  }, []);

  const generateGridCount = () => {
    const columns = Math.floor(document.body.clientWidth / 75);
    const rows = Math.floor(document.body.clientHeight / 75);

    setSize({
      columns,
      rows,
    });
  };

  const handleMouseLeave = (e) => {
    // @ts-ignore
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 0)" }, { duration: 1.5 });
  };

  const handleMouseEnter = (e) => {
    // @ts-ignore
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 1)" }, { duration: 0.15 });
  };
  const backgroundImageUrl =
    "assets/images/backgrounds/heroSectionBackground.jpg";

  return (
    <>
      <section
        className="bg-neutral-950"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          ref={scope}
          className="grid h-screen w-full grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
        >
          {[...Array(size.rows * size.columns)].map((_, i) => (
            <div
              key={i}
              id={`square-${i}`}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="h-full w-full border-[1px] border-neutral-900"
            />
          ))}
        </div>
      </section>
      <section className="max-w-2xl 2xl:max-w-4xl absolute top-32 left-10 md:top-52 md:left-32 2xl:top-60 2xl:left-36 pointer-events-none ">
        <div>
          <h3
            className="text-xs md:text-sm 2xl:text-3xl"
            style={{
              textTransform: "uppercase",
              fontWeight: 900,
              lineHeight: "140%",
              color: "white",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            future unveiled
          </h3>
          <p
            className="my-4 md:text-3xl 2xl:text-6xl 2xl:my-10"
            style={{
              fontFamily: "Electrolize, sans-serif",
              textTransform: "uppercase",
              fontWeight: 700,
              lineHeight: "140%",
              color: "white",
            }}
          >
            Dive into tomorrow with cutting-edge, <br /> imaginative
            innovations.
          </p>
          <ExploreButton />
        </div>
      </section>
      <Footer />
    </>
  );
};
