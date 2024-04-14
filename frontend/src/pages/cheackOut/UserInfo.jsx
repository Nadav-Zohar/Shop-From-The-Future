/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { userInfoFields, userInfoValidation } from "./joival";

export default function UserInfo({ setUserInfoFormData }) {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);
    const validate = userInfoValidation.validate(obj, { abortEarly: false });
    const errors = {};
    if (validate.error) {
      validate.error.details.forEach((e) => {
        const key = e.context.key;
        const err = e.message;
        errors[key] = err;
      });
    }
    setUserInfoFormData(obj);
    setErrors(errors);
  };
  return (
    <>
      <section
        className="dark:bg-gray-800 dark:text-gray-50 font-medium"
        style={{ fontFamily: "Electrolize, sans-serif" }}
      >
        <form noValidate="" action="" className=" flex flex-col space-y-12">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Information</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              {userInfoFields.map((f) => (
                <div key={f.id} className={`col-span-full ${f.colSpan}`}>
                  <label htmlFor={f.htmlFor} className="text-sm">
                    {f.content}
                  </label>
                  <input
                    id={f.id}
                    onChange={handleChange}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-blue-400 dark:border-gray-700 dark:text-gray-900"
                  />
                  {errors ? (
                    <span className={`text-red-500 p-0.5 text-md w-fit`}>
                      {errors[f.name]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}
