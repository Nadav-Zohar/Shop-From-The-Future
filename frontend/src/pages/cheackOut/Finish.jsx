/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../app/App";

export default function Finish({ items, setItems }) {
  const { setLoader } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    const sessionCart = sessionStorage.getItem("cart");
    if (sessionCart) {
      setItems(JSON.parse(sessionCart).items);
      setLoader(false);
    } else {
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
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      <div
        style={{ fontFamily: "Electrolize, sans-serif" }}
        className="flex flex-col p-6 space-y-4 divide-y sm:p-10 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <h2 className="text-2xl font-semibold">Your Items</h2>
        <ul className="flex flex-col pt-4 space-y-2">
          {items.map((item) => (
            <li key={item.name} className="flex items-start justify-between">
              <h3>
                {item.name}
                <span className="text-sm dark:text-blue-400">
                  x {item.quantity}
                </span>
              </h3>
              <div className="text-right">
                <span className="block">${item.price * item.quantity}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="pt-4 space-y-2">
          <div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
