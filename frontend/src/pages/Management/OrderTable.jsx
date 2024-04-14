/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
const OrdersTable = ({ allOrders, setAllOrders }) => {
  return (
    <div className="p-8 w-full bg-slate-800 rounded-md">
      <Table allOrders={allOrders} setAllOrders={setAllOrders} />
    </div>
  );
};

const Table = ({ allOrders, setAllOrders }) => {
  const shift = (id, direction) => {
    const index = allOrders.findIndex((u) => u._id === id);
    let ordersCopy = [...allOrders];

    if (direction === "up") {
      if (index > 0) {
        [ordersCopy[index], ordersCopy[index - 1]] = [
          ordersCopy[index - 1],
          ordersCopy[index],
        ];
      }
    } else {
      if (index < ordersCopy.length - 1) {
        [ordersCopy[index], ordersCopy[index + 1]] = [
          ordersCopy[index + 1],
          ordersCopy[index],
        ];
      }
    }

    setAllOrders(ordersCopy);
  };

  return (
    <div className="w-full bg-slate-700 shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-violet-600 text-slate-100 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-3 font-medium">Tracking Number</th>
            <th className="text-start p-3 font-medium">Total</th>
            <th className="text-start p-3 font-medium">payment Details</th>
            <th className="text-start p-3 font-medium">shipping Details</th>
            <th className="text-start p-3 font-medium">order Status</th>
          </tr>
        </thead>

        <tbody>
          {allOrders.map((order, index) => {
            return (
              <TableRows
                key={order._id}
                order={order}
                index={index}
                shift={shift}
                setAllOrders={setAllOrders}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ order, shift, setAllOrders }) => {
  const handleUpdateToComplete = (orderId, orderStatus) => {
    const updateCheck = confirm("Are You Sure The Order Is Complete?");
    if (updateCheck) {
      fetch(`http://localhost:5555/orders/${orderId}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update the user");
          }

          let status = orderStatus;

          if (status == "Pending") {
            status = "Complete";
          } else {
            status = "Pending";
          }

          setAllOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, orderStatus: status } : order
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <motion.tr layoutId={`row-${order._id}`} className={`text-sm`}>
      <td className="pl-4 w-8 text-lg text-indigo-500">
        <button
          className="hover:text-violet-600"
          onClick={() => shift(order._id, "up")}
        >
          <FiChevronUp />
        </button>
        <button
          className="hover:text-violet-600"
          onClick={() => shift(order._id, "down")}
        >
          <FiChevronDown />
        </button>
      </td>

      <td className="p-3 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium text-slate-100">
            {order.trackingNumber}
          </span>
        </div>
      </td>

      <td className="p-3">
        <div className={`flex items-center gap-2 font-medium text-slate-100`}>
          {order.total} $
        </div>
      </td>

      <td className="p-3 font-medium text-slate-100">show</td>

      <td className=" p-3 font-medium text-slate-100 ">show</td>

      <td className="p-3 flex flex-row justify-evenly items-center">
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${
            order.orderStatus == "Pending"
              ? "bg-violet-800 text-violet-200"
              : "bg-green-800 text-green-200"
          }`}
        >
          {order.orderStatus}
        </span>
        <button
          className="hover:scale-125 transition-transform"
          onClick={() => handleUpdateToComplete(order._id, order.orderStatus)}
        >
          <FaCheck className="text-indigo-400 text-lg cursor-pointer" />
        </button>
      </td>
    </motion.tr>
  );
};

export default OrdersTable;
