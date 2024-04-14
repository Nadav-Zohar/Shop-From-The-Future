/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { CheckOutBackground } from "./CheckOutBackGround";
import UserInfo from "./UserInfo";
import CreditInfo from "./CreditInfo";
import Rediraction from "./Rediraction";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../app/App";
import { creditInfoValidation, userInfoValidation } from "./joival";
import Finish from "./Finish";
import { Steps } from "./Steps";
import { Types } from "mongoose";
import Footer from "../../components/footer/Footer";

const CheckOut = () => {
  const navigate = useNavigate();
  const { updateNotification, setLoader } = useContext(GeneralContext);

  const [stepsComplete, setStepsComplete] = useState(0);
  const numSteps = 4;

  const [isDisabled, setIsDisabled] = useState(false);

  const [userInfoFormData, setUserInfoFormData] = useState(false);

  const [creditInfoFormData, setCreditInfoFormData] = useState(false);

  const [ranDigit, setRanDigit] = useState();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 9e9) + 1e9;
    setRanDigit(random);
  }, []);

  const handleSetStep = (num) => {
    if (stepsComplete === numSteps - 2) {
      const transformedItems = items.map((item) => ({
        product_Id: new Types.ObjectId(item.product_Id),
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
        total: (item.price * item.quantity).toString(),
      }));

      const total = transformedItems.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0
      );

      const currentOrderData = {
        shippingDetails: userInfoFormData,
        paymentDetails: creditInfoFormData,
        items: transformedItems,
        total: total.toFixed(2),
        trackingNumber: ranDigit,
      };

      fetch("http://localhost:5555/order", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify(currentOrderData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok.");
          return response.json();
        })
        .then((data) => {})
        .catch((error) => {});
    }

    if (stepsComplete === 0) {
      const { error } = userInfoValidation.validate(userInfoFormData);
      if (error) {
        return;
      }
    }

    if (stepsComplete === 1) {
      const { error } = creditInfoValidation.validate(creditInfoFormData);
      if (error) {
        return;
      }
    }

    if (
      (stepsComplete === 0 && num === -1) ||
      (stepsComplete === numSteps && num === 1)
    ) {
      return;
    } else if (stepsComplete === 3 && num === 1) {
      sessionStorage.removeItem("cart");
      localStorage.cart ? deleteCart() : "";
      setLoader(true);
      setIsDisabled(true);
      setTimeout(() => {
        navigate("/shop");
        updateNotification(true, "success", "Order Complete");
        setLoader(false);
      }, 2500);
      return;
    }

    setStepsComplete((pv) => pv + num);
  };

  const deleteCart = () => {
    fetch(`http://localhost:5555/carts/${localStorage.cart}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Failed to delete cart");
      })
      .then((data) => {
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <CheckOutBackground />
      <div className=" relative z-50 px-4 py-14 mt-14">
        <div className="p-8 shadow-lg rounded-md w-full max-w-2xl mx-auto">
          <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
          <div className="w-fit w-full h-fit h-48 my-4 rounded-lg overflow-hidden mx-auto">
            {stepsComplete === 0 && (
              <UserInfo setUserInfoFormData={setUserInfoFormData} />
            )}
            {stepsComplete === 1 && (
              <CreditInfo setCreditInfoFormData={setCreditInfoFormData} />
            )}
            {stepsComplete === 2 && (
              <Finish items={items} setItems={setItems} />
            )}
            {stepsComplete === 3 && (
              <Rediraction ranDigit={ranDigit} setRanDigit={setRanDigit} />
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="px-4 py-1 rounded bg-black text-white"
              onClick={() => handleSetStep(-1)}
              disabled={isDisabled}
            >
              Prev
            </button>
            <button
              className="px-4 py-1 rounded bg-black text-white"
              onClick={() => handleSetStep(1)}
            >
              {stepsComplete === numSteps - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
