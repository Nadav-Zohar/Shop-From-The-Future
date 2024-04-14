/* eslint-disable no-unused-vars */
import { useContext } from "react";
import QuantitySelector from "./QuantitySelection";
import { GeneralContext } from "../../app/App";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ProductDetails({ product, quantity, setQuantity }) {
  const { updateNotification, setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleAddToCartOrCreate = (navigateTo) => {
    const newProduct = {
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageName: product.imageName,
      product_Id: product._id,
    };

    if (localStorage.token) {
      setLoader(true);
      const url = localStorage.cart
        ? `http://localhost:5555/carts/${localStorage.cart}`
        : `http://localhost:5555/carts`;
      const method = localStorage.cart ? "PATCH" : "POST";
      const body = localStorage.cart
        ? JSON.stringify(newProduct)
        : JSON.stringify({ items: newProduct });

      fetch(url, {
        credentials: "include",
        method: method,
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: body,
      })
        .then((response) => {
          setLoader(false);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          updateNotification(true, "success", "Added To Cart");
          navigate(navigateTo);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          updateNotification(true, "error", "Failed to add to cart");
        });
    } else {
      let cart = sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : { items: [] };
      cart.items.push(newProduct);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      updateNotification(true, "success", "Added To Cart");
      navigate(navigateTo);
    }
  };
  return (
    <>
      <div className="flex flex-col p-5 md:w-6/12 lg:w-4/12 dark:bg-indigo-950 ">
        <h2
          className="text-xl font-semibold capitalize text-start tracking-wider"
          style={{ fontFamily: "Electrolize, sans-serif" }}
        >
          {product.name}
        </h2>
        <p
          className="text-sm underline font-semibold capitalize my-2 mb-8"
          style={{ fontFamily: "Electrolize, sans-serif" }}
        >
          {product.company}
        </p>
        <div className="flex w-full space-x-2 sm:space-x-4">
          <div className="flex flex-col justify-between w-full pb-4">
            <div className="flex justify-between w-full pb-2 space-x-2">
              <div className="space-y-1 tracking-wide mb-8">
                <hr />
                <h3
                  className="text-md font-semibold leading-relaxed "
                  style={{ fontFamily: "Electrolize, sans-serif" }}
                >
                  {product.description}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-end mb-6 mt-3"
          style={{ fontFamily: "Electrolize, sans-serif" }}
        >
          <hr />
          <p className="text-xl mt-2">
            Price:
            <span className="font-semibold"> {product.price} $</span>
          </p>
        </div>
        <div className="flex justify-center">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="flex justify-center space-x-6 mt-5">
          <button
            onClick={() => handleAddToCartOrCreate("/shoppingcart")}
            className="rounded-2xl text-lg border-2 border-dashed border-indigo-400 bg-transparent p-2 text-indigo-100 transition-all duration-300 hover:bg-indigo-900 hover:translate-x-[4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[-4px_4px_0px_rgba(63,56,183)] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Add To Cart
          </button>
          <button
            onClick={() => handleAddToCartOrCreate("/checkout")}
            className="rounded-2xl text-lg border-2 border-dashed border-indigo-400 bg-indigo-900 p-2 text-indigo-100 transition-all duration-300 hover:bg-indigo-900 hover:translate-x-[4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[-4px_4px_0px_rgba(63,56,183)] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
