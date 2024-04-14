/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import React from "react";
import { fields, primaryVariants, signUpValidation } from "./Signup.fields";
import { GeneralContext } from "../../app/App";

export const Signup = () => {
  const [isFormValid, setIsFormValid] = React.useState(false);

  const { updateNotification, setLoader } = React.useContext(GeneralContext);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_type_password: "",
  });

  const [errors, setErrors] = React.useState({});

  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);
    const validate = signUpValidation.validate(obj, { abortEarly: false });
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

    if (formData.password != formData.re_type_password) {
      updateNotification(true, "error", "Passwords don't match");
      return;
    }

    setLoader(true);
    fetch(`http://localhost:5555/users`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const contentType = response.headers.get("Content-Type");
        setTimeout(() => {
          setLoader(false);
        }, 1500);
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();

          if (response.ok) {
            setTimeout(() => {
              updateNotification(true, "success", "User Created");
            }, 1500);
            navigate("/");
          } else {
            throw responseData;
          }
        } else {
          const textResponse = await response.text();
          throw new Error(textResponse);
        }
      })
      .catch((error) => {
        const errorMessage = error.message ? error.message : error.toString();
        updateNotification(true, "error", errorMessage);
      });
  };

  const backgroundImageUrl = "/assets/images/backgrounds/background3.jpg";
  return (
    <>
      <section
        className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr] lg:grid-cols-[1fr] py-24 px-4"
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
          <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
            <motion.h1
              variants={primaryVariants}
              className="mb-2 text-center text-4xl font-semibold text-white"
            >
              Create you account
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

              <motion.div
                variants={primaryVariants}
                className="mb-4 flex w-full items-start gap-1.5"
              >
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  className="h-4 w-4 accent-indigo-600"
                  required
                />
                <label htmlFor="terms-checkbox" className="text-md text-white">
                  By signing up, I agree to the terms and conditions, privacy
                  policy, and cookie policy
                </label>
              </motion.div>

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
                Sign up
              </motion.button>
              <motion.p
                variants={primaryVariants}
                className="text-md text-center text-white "
              >
                Already have an account?{" "}
                <a className="text-indigo-300 underline" href="/login">
                  Log in
                </a>
              </motion.p>
            </form>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};
