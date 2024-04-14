import { FaShoppingCart } from "react-icons/fa";
import LoginButton from "../buttons/LoginButton";
import SignupButton from "../buttons/SignupButton";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { GeneralContext } from "../../app/App";
import { useNavigate } from "react-router-dom";

export default function NavButtons() {
  const { isAuthenticated, updateNotification } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    updateNotification(true, "success", "Log Out");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    sessionStorage.removeItem("cart");
    navigate("/shop");
    location.reload();
  };

  return (
    <div className="flex items-center gap-3">
      <div
        onClick={() => navigate("/shoppingcart")}
        className=" bg-transparent p-2 border-2 rounded-md border-indigo-400 border-solid text-indigo-400 transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[-4px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none cursor-pointer flex gap-2"
      >
        <a>
          <FaShoppingCart size={20} />
        </a>
        <span className={`whitespace-nowrap hidden sm:inline`}>Cargo Hold</span>
      </div>

      {!isAuthenticated && <LoginButton />}
      {!isAuthenticated ? (
        <SignupButton />
      ) : (
        <div
          onClick={handleLogOut}
          className=" bg-transparent p-2 border-2 rounded-md border-indigo-400 border-solid text-indigo-400 transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[-4px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none cursor-pointer flex gap-2"
        >
          <a>
            <IoLogOut size={20} />
          </a>
          <span>Eject</span>
        </div>
      )}
    </div>
  );
}
