import Register from "../Pages/Register.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login.jsx";
import HomePage from "../Pages/HomePage.jsx";
import CategoryPage from "../Pages/ShowCategory.jsx";
import FoodPage from "../Pages/FoodPage.jsx";
import CartPage from "../Pages/Cart.jsx";
import BookTable from "../Pages/BookTable.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path={"/food/:id"} element={<FoodPage />} />
      <Route path={"/cart"} element={<CartPage />} />
      <Route path={"/book_table"} element={<BookTable />} />
    </Routes>
  );
}
