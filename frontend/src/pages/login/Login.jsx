import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import React from "react";
import { fields, loginValidation, primaryVariants } from "./Login.fields";
import { GeneralContext } from "../../app/App";

export const Login = () => {
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  const { updateNotification, setLoader } = React.useContext(GeneralContext);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);
    const validate = loginValidation.validate(obj, { abortEarly: false });
    const errors = {};
    if (validate.error) {
      validate.error.details.forEach((e) => {
        const key = e.context.key;
        const err = e.message;
        errors[key] = err;
      });
    }
    setIsFormValid(!validate.error);
    setErrors(errors);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    fetch(`http://localhost:5555/users/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const responseData = await response.json();

        if (!response.ok) {
          const errorMessage = "Email or password are incorrect";
          throw new Error(errorMessage);
        }

        setLoader(false);
        updateNotification(true, "success", "You're in!");
        navigate("/");
        location.reload();
        localStorage.token = responseData.token;
      })
      .catch((error) => {
        updateNotification(true, "error", error.message);
        setLoader(false);
      });
  };
  const backgroundImageUrl =
    "http://localhost:5555/images/backgrounds/background3.jpg";
  return (
    <>
      <section
        className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_700px] py-24 px-4"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          viewport={{ once: true }}
          className="flex items-center justify-center pb-4 pt-20 md:py-20 "
          style={{ fontFamily: "Electrolize, sans-serif" }}
        >
          <div className="mx-auto my-auto max-w-sm px-4 md:pr-0">
            <motion.h1
              variants={primaryVariants}
              className="mb-2 text-center text-4xl font-semibold text-white"
            >
              Log in to your account
            </motion.h1>

            <form onSubmit={handleSubmit} className="w-full">
              {fields.map((f) => (
                <motion.div
                  key={f.content}
                  variants={primaryVariants}
                  className="mb-2 w-full"
                >
                  <label
                    htmlFor={f.htmlFor_and_Id}
                    className="mb-1 inline-block text-md font-medium text-white"
                  >
                    {f.content}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id={f.htmlFor_and_Id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600 mb-2"
                    onChange={handleChange}
                    value={formData[f.name]}
                    name={f.name}
                    required
                  />
                  {errors ? (
                    <span className={`text-red-500 p-0.5 text-md w-fit`}>
                      {errors[f.name]}
                    </span>
                  ) : (
                    ""
                  )}
                </motion.div>
              ))}

              <motion.button
                variants={primaryVariants}
                whileTap={{
                  scale: 0.985,
                }}
                type="submit"
                disabled={!isFormValid}
                className={`${
                  !isFormValid ? "bg-slate-400 " : ""
                } mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors`}
              >
                Log in
              </motion.button>
              <motion.p
                variants={primaryVariants}
                className="text-md text-center text-white "
              >
                Dont have an account?{" "}
                <a className="text-indigo-300 underline" href="/signup">
                  Sign up
                </a>
              </motion.p>
            </form>
          </div>
        </motion.div>
        <div className="group sticky top-4 m-4 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950  h-[calc(70vh_-_2rem)] xl:h-[calc(100vh_-_2rem)] hidden md:block">
          <img
            alt="An example image"
            src="http://localhost:5555/images/backgrounds/loginBackground.jpg"
            className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
          />

          <div className="absolute right-2 top-4 z-10">
            <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            transition={{
              staggerChildren: 0.05,
            }}
            viewport={{ once: true }}
            className="absolute inset-0 flex flex-col items-start justify-end p-8"
          >
            <motion.h2
              className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
              variants={primaryVariants}
              style={{ fontFamily: "Electrolize, sans-serif" }}
            >
              Dive into the Future
            </motion.h2>
            <motion.p
              variants={primaryVariants}
              className="mb-6 max-w-md text-md text-slate-100"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Explore a world where innovation meets imagination. Join us on a
              journey beyond the ordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};
