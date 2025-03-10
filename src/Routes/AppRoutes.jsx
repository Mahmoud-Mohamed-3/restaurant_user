import Register from "../Pages/Register.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login.jsx";
import HomePage from "../Pages/HomePage.jsx";
import CategoryPage from "../Pages/ShowCategory.jsx";
import FoodPage from "../Pages/FoodPage.jsx";
import CartPage from "../Pages/Cart.jsx";
import BookTable from "../Pages/BookTable.jsx";
import ContactUs from "../Pages/ContactUs.jsx";
import UserProfile from "../Pages/UserProfile.jsx";
import EditProfile from "../components/EditProfile.jsx";
import UserOrders from "../Pages/UserOrders.jsx";
import UserReservations from "../Pages/UserReservations.jsx";
import UserStates from "../Pages/UserStats.jsx";

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
      <Route path={"/contact"} element={<ContactUs />} />
      <Route element={<UserProfile />}>
        <Route path={"/profile"} element={<EditProfile />} />
        <Route path={"/orders"} element={<UserOrders />} />
        <Route path={"/reservations"} element={<UserReservations />} />
        <Route path={"/stats"} element={<UserStates />} />
      </Route>
    </Routes>
  );
}
