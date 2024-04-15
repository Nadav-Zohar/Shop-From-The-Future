/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AddProduct from "./AddProduct";
import { MdDelete } from "react-icons/md";
const ProductsTable = ({ allProducts, setAllProducts, modalInfo }) => {
  const handleDelete = (productdId) => {
    const deleteCheck = confirm(
      "Are You Sure You Want To Delete This product?"
    );
    if (deleteCheck) {
      fetch(`http://localhost:5555/products/${productdId}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the product");
          }
          setAllProducts((prevProduct) =>
            prevProduct.filter((product) => product._id !== productdId)
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="p-8 w-full bg-slate-800 rounded-md">
      <Table
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        modalInfo={modalInfo}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const Table = ({ allProducts, setAllProducts, modalInfo, handleDelete }) => {
  const shift = (id, direction) => {
    const index = allProducts.findIndex((u) => u._id === id);
    let productsCopy = [...allProducts];

    if (direction === "up") {
      if (index > 0) {
        [productsCopy[index], productsCopy[index - 1]] = [
          productsCopy[index - 1],
          productsCopy[index],
        ];
      }
    } else {
      if (index < productsCopy.length - 1) {
        [productsCopy[index], productsCopy[index + 1]] = [
          productsCopy[index + 1],
          productsCopy[index],
        ];
      }
    }

    setAllProducts(productsCopy);
  };

  return (
    <div className="w-full bg-slate-700 shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
      <AddProduct />
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-violet-600 text-slate-100 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-4 font-medium">Name</th>
            <th className="text-start p-4 font-medium">Price</th>
            <th className="text-start p-4 font-medium">Stock</th>
            <th className="text-start p-4 font-medium">CreatedAt</th>
            <th className="text-start p-4 font-medium">Delete</th>
          </tr>
        </thead>

        <tbody>
          {allProducts.map((product, index) => {
            return (
              <TableRows
                key={product._id}
                product={product}
                index={index}
                shift={shift}
                setAllProducts={setAllProducts}
                modalInfo={modalInfo}
                handleDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ product, shift, modalInfo, handleDelete }) => {
  return (
    <motion.tr
      layoutId={`row-${product._id}`}
      className={`text-sm cursor-pointer`}
      onClick={() => modalInfo(product)}
    >
      <td className="pl-4 w-8 text-lg text-indigo-500">
        <button
          className="hover:text-violet-600"
          onClick={(e) => {
            e.stopPropagation();
            shift(product._id, "up");
          }}
        >
          <FiChevronUp />
        </button>
        <button
          className="hover:text-violet-600"
          onClick={(e) => {
            e.stopPropagation();
            shift(product._id, "down");
          }}
        >
          <FiChevronDown />
        </button>
      </td>

      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <div>
          <span className="block mb-1 font-medium text-slate-100 capitalize">
            {`${product.name}`}
          </span>
        </div>
      </td>

      <td className="p-4">
        <div className={`flex items-center gap-2 font-medium text-slate-100`}>
          {product.price}
        </div>
      </td>

      <td className="p-4 font-medium text-slate-100">{product.stock}</td>
      <td className="p-4 font-medium text-slate-100">{product.createdAt}</td>
      <td className="p-4 font-medium text-slate-100 flex flex-row justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(product._id);
          }}
          className="hover:scale-125 transition-transform"
        >
          <MdDelete className="text-red-400 text-lg cursor-pointer" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ProductsTable;
