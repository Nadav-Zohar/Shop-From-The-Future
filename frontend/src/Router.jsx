import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import Shop from "./pages/shop/Shop";
import ContactMe from "./pages/contactMe/ContactMe";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import CheckOut from "./pages/cheackOut/CheckOut";
import { Management } from "./pages/Management/Management";

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </>
  );
}
