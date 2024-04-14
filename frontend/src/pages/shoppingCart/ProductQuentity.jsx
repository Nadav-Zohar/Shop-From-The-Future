import { useContext } from "react";
import { GeneralContext } from "../../app/App";

/* eslint-disable react/prop-types */
const ProductQuentity = ({ quantity, productId, setItems }) => {
  const { updateNotification, setLoader } = useContext(GeneralContext);

  const updateSessionCart = (updateFunc) => {
    let cart = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : { items: [] };
    cart.items = cart.items.map((item) => {
      if (item.product_Id === productId) {
        return updateFunc(item);
      }
      return item;
    });
    sessionStorage.setItem("cart", JSON.stringify(cart));
    setItems(cart.items);
  };

  const increment = () => {
    if (localStorage.token) {
      setLoader(true);
      fetch(
        `http://localhost:5555/carts/${localStorage.cart}/increase/${productId}`,
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
        .then((updatedCart) => {
          setTimeout(() => {
            setLoader(false);
            updateNotification(true, "success", "Quantity increased");
          }, 1500);
          setItems(updatedCart.items);
        })
        .catch((error) => console.error("Error increasing product:", error));
    } else {
      updateSessionCart((item) => ({ ...item, quantity: item.quantity + 1 }));
      updateNotification(true, "success", "Quantity increased");
    }
  };

  const decrement = () => {
    if (localStorage.token) {
      setLoader(true);
      fetch(
        `http://localhost:5555/carts/${localStorage.cart}/decrease/${productId}`,
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
        .then((updatedCart) => {
          setTimeout(() => {
            setLoader(false);
            updateNotification(true, "success", "Quantity decreased");
          }, 1500);
          setItems(updatedCart.items);
        })
        .catch((error) => {
          console.error("Error decreasing product:", error);
        });
    } else {
      updateSessionCart((item) => ({
        ...item,
        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
      }));
      updateNotification(true, "success", "Quantity decreased");
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className={`px-3 py-1 w-10 border-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 rounded-md ${
            quantity === 1
              ? "border-slate-600"
              : "hover:bg-slate-400 border-slate-400"
          }`}
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={increment}
          className="px-3 py-1 w-10 border-2 border-slate-400 text-slate-200 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 rounded-md"
        >
          +
        </button>
      </div>
    </>
  );
};

export default ProductQuentity;
