/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddProductBtn from "../../components/buttons/AddProductBtn";
import { addProductValidation, fieldsForProductAdd } from "./ValAndFields";

export default function AddProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    company: "",
    stock: "",
    category: "",
    description: "",
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(
      (file) => file.type === "image/png"
    );
    setFiles(selectedFiles);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);
    const validate = addProductValidation.validate(obj, { abortEarly: false });
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

  const uploadImages = (imageName, files) => {
    const formData = new FormData();
    formData.append("imageName", imageName);

    files.forEach((file, index) => {
      const fileExtension = file.name.split(".").pop();
      formData.append(
        "images",
        file,
        `${imageName}-${index + 1}.${fileExtension}`
      );
    });

    fetch("http://localhost:5555/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Images uploaded successfully!", data))
      .catch((error) => console.error("Error uploading images:", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const imageName = formData.name.toLowerCase().replace(/\s+/g, "-");

    const imageCount = files.length;

    const newFormData = {
      ...formData,
      imageName: imageName,
      imageCount: imageCount,
    };
    fetch("http://localhost:5555/products", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(newFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
        uploadImages(newFormData.imageName, files);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <AddProductBtn setIsOpen={setIsOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[60] grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-3 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <section className="p-5 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 ">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
                    {fieldsForProductAdd.map((field) => (
                      <div key={field.content}>
                        <label
                          className="text-white dark:text-gray-200"
                          htmlFor={field.htmlForAndId}
                        >
                          {field.content}
                        </label>
                        <input
                          onChange={handleChange}
                          id={field.htmlForAndId}
                          name={field.htmlForAndId}
                          type={field.type}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        {errors ? (
                          <span className={`text-red-500 text-sm w-fit`}>
                            {errors[field.htmlForAndId]}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-white">
                        Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-white"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              Upload Images (PNG only)
                            </label>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/png"
                              multiple
                              onChange={handleFileChange}
                            />
                          </div>
                          {files.length > 0 && (
                            <p className="text-sm text-green-500">
                              {files.length} file(s) uploaded
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className={`${
                        !isFormValid ? "bg-slate-400 " : ""
                      } px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600`}
                      disabled={!isFormValid}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
