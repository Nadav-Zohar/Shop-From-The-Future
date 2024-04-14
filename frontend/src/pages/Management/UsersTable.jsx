/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
const ShuffleSortTable = ({ allUsers, setAllUsers }) => {
  return (
    <div className="p-8 w-full bg-slate-800 rounded-md">
      <Table allUsers={allUsers} setAllUsers={setAllUsers} />
    </div>
  );
};

const Table = ({ allUsers, setAllUsers }) => {
  const shift = (id, direction) => {
    const index = allUsers.findIndex((u) => u._id === id);
    let usersCopy = [...allUsers];

    if (direction === "up") {
      if (index > 0) {
        [usersCopy[index], usersCopy[index - 1]] = [
          usersCopy[index - 1],
          usersCopy[index],
        ];
      }
    } else {
      if (index < usersCopy.length - 1) {
        [usersCopy[index], usersCopy[index + 1]] = [
          usersCopy[index + 1],
          usersCopy[index],
        ];
      }
    }

    setAllUsers(usersCopy);
  };

  return (
    <div className="w-full bg-slate-700 shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-violet-600 text-slate-100 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-4 font-medium">Full Name</th>
            <th className="text-start p-4 font-medium">Email</th>
            <th className="text-start p-4 font-medium">Create Time</th>
            <th className="text-start p-4 font-medium">Is Admin</th>
            <th className="text-start p-4 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers.map((user, index) => {
            return (
              <TableRows
                key={user._id}
                user={user}
                index={index}
                shift={shift}
                setAllUsers={setAllUsers}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ user, shift, setAllUsers }) => {
  const handleDelete = (userId) => {
    if (user.isAdmin == true) {
      return alert("you cant delete admins...");
    }
    const deleteCheck = confirm("Are You Sure You Want To Delete This User?");
    if (deleteCheck) {
      fetch(`http://localhost:5555/users/${userId}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user.isAdmin }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the user");
          }
          setAllUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleUpdateToAdmin = (userId) => {
    const updateCheck = confirm(
      "after upgrading you cannot downgrade. Are You Sure You Want To update This User?"
    );
    if (updateCheck) {
      fetch(`http://localhost:5555/users/${userId}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user.isAdmin }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update the user");
          }
          setAllUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isAdmin: true } : user
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <motion.tr layoutId={`row-${user._id}`} className={`text-sm`}>
      <td className="pl-4 w-8 text-lg text-indigo-500">
        <button
          className="hover:text-violet-600"
          onClick={() => shift(user._id, "up")}
        >
          <FiChevronUp />
        </button>
        <button
          className="hover:text-violet-600"
          onClick={() => shift(user._id, "down")}
        >
          <FiChevronDown />
        </button>
      </td>

      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium text-slate-100">
            {`${user.firstName} ${user.lastName}`}
          </span>
        </div>
      </td>

      <td className="p-4">
        <div className={`flex items-center gap-2 font-medium text-slate-100`}>
          {user.email}
        </div>
      </td>

      <td className="p-4 font-medium text-slate-100">{user.createdAt}</td>

      <td className="p-4">
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${
            user.isAdmin == true
              ? "bg-violet-800 text-violet-200"
              : user.isAdmin == false
              ? "bg-indigo-800 text-indigo-200"
              : ""
          }`}
        >
          {user.isAdmin ? "admin" : "regular"}
        </span>
      </td>
      <td className="flex flex-row justify-evenly ">
        <button
          onClick={() => handleDelete(user._id)}
          className="hover:scale-125 transition-transform"
        >
          <MdDelete className="text-red-400 text-lg cursor-pointer" />
        </button>
        <button
          className="hover:scale-125 transition-transform"
          onClick={() => handleUpdateToAdmin(user._id)}
        >
          <RiAdminFill className="text-indigo-400 text-lg cursor-pointer" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ShuffleSortTable;
