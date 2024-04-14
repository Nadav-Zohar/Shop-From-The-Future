/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../app/App";
import ProductQuentity from "./ProductQuentity";
import Footer from "../../components/footer/Footer";

export default function ShoppingCart() {
  const { updateNotification, setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const isCart = () => {
    if (localStorage.cart || sessionStorage.cart) {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    setLoader(true);
    const sessionCart = sessionStorage.getItem("cart");
    if (sessionCart) {
      setItems(JSON.parse(sessionCart).items);
      setLoader(false);
    } else if (localStorage.token) {
      fetch(`http://localhost:5555/carts/my-cart`, {
        credentials: "include",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            localStorage.cart = data[0]._id;
            setItems(data[0].items);
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    }
    setLoader(false);
  }, []);

  const handleDeleteProduct = (productId) => {
    const deleteCheck = confirm("Are You Sure You Want To Delete?");
    if (deleteCheck) {
      setLoader(true);
      if (sessionStorage.getItem("cart")) {
        const updatedCart = JSON.parse(sessionStorage.getItem("cart"));
        updatedCart.items = updatedCart.items.filter(
          (item) => item.product_Id != productId
        );
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        setItems(updatedCart.items);
        setTimeout(() => {
          updateNotification(true, "success", "Deleted From Cart");
          setLoader(false);
        }, 1500);
      } else {
        fetch(
          `http://localhost:5555/carts/${localStorage.cart}/remove/${productId}`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.token,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setItems((currentItems) =>
              currentItems.filter((item) => item.product_Id != productId)
            );
            setTimeout(() => {
              updateNotification(true, "success", "Deleted From Cart");
              setLoader(false);
            }, 1500);
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            setLoader(false);
          });
      }
    }
  };

  const calculateTotalAmount = () => {
    const total = items.reduce((acc, item) => {
      const subtotal = item.price * item.quantity;
      return acc + subtotal;
    }, 0);

    return total;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <>
      <div className="flex flex-col max-w-full min-h-screen p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100 ">
        <ul className="flex flex-col divide-y dark:divide-gray-700 mt-20">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={`/assets/images/${item.imageName}/${item.imageName}-1.png`}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8 capitalize">
                        {item.name}
                      </h3>
                      <p className="text-sm dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <ProductQuentity
                        quantity={item.quantity}
                        productId={item.product_Id}
                        setItems={setItems}
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {item.price * item.quantity} $
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x">
                    <button
                      type="button"
                      className="flex items-center px-2 py-1 pl-0 space-x-1"
                      onClick={() => handleDeleteProduct(item.product_Id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold"> {totalAmount} $</span>
          </p>
          <p className="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:border-blue-400"
            onClick={() => navigate("/shop")}
          >
            <span className="sr-only sm:not-sr-only">Back To Shop</span>
          </button>
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-blue-400 dark:text-gray-900 dark:border-blue-400"
            onClick={() => isCart()}
          >
            <span className="sr-only sm:not-sr-only">Continue to Checkout</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
