import Register from "../Pages/Register.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login.jsx";
import HomePage from "../Pages/HomePage.jsx";
import CategoryPage from "../Pages/ShowCategory.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
    </Routes>
  );
}
