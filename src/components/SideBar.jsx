import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GetCurrentUser } from "../API Calls/User/CurrentUser.jsx";
import "../css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { Button, message } from "antd";
import { HomeFilled, LogoutOutlined } from "@ant-design/icons";
import { Logout } from "../API Calls/User/SignOut.jsx";

export default function SideBar() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null,
  );
  const [cookies, setCookies, removeCookie] = useCookies();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    sessionStorage.getItem("activeLink") || "profile",
  );

  // Redirect to login if JWT is missing and after logging out
  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000); // Add a small delay before redirect to allow UI updates
    }
  }, [cookies.jwt]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await GetCurrentUser(cookies.jwt);
        setUser(response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (cookies.jwt && !user) {
      getUser();
    }
  }, [cookies.jwt, user]);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const newActiveLink = path.includes("profile")
      ? "profile"
      : path.includes("orders")
        ? "orders"
        : path.includes("reservations")
          ? "reservations"
          : path.includes("stats")
            ? "stats"
            : activeLink;

    if (newActiveLink !== activeLink) {
      setActiveLink(newActiveLink);
      sessionStorage.setItem("activeLink", newActiveLink);
    }
  }, [location.pathname, activeLink]);

  // Handle logout
  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("activeLink");

    if (cookies.jwt) {
      await Logout(cookies.jwt);
    }

    removeCookie("jwt");

    // Show logout success message after JWT removal
    message.success("Logged out successfully");

    // Delay the redirect to allow the message to appear
    setTimeout(() => {
      window.location.replace("/login");
    }, 1000); // Delay the redirect by 1 second to show the message
  };

  return (
    <div className="SideBarContainer">
      <div className="SideBar">
        <div className="ResName">Feane</div>
        <div className="UserName">
          Welcome, {user ? `${user.first_name} ${user.last_name}` : "Guest"}
        </div>
        <div className="UserLinks">
          <Link
            to="/profile"
            className={activeLink === "profile" ? "active" : ""}
          >
            Your Profile
          </Link>
          <Link
            to="/orders"
            className={activeLink === "orders" ? "active" : ""}
          >
            Orders
          </Link>
          <Link
            to="/reservations"
            className={activeLink === "reservations" ? "active" : ""}
          >
            Reservations
          </Link>
          <Link
            to={"/stats"}
            className={activeLink === "stats" ? "active" : ""}
          >
            Your Stats
          </Link>
        </div>

        <div className={"Actions"}>
          <Link to={"/"}>
            <HomeFilled />
            Home{" "}
          </Link>
          <button onClick={handleLogout}>
            <LogoutOutlined />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
