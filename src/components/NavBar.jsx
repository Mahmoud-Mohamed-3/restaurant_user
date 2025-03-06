import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../css/NavBar.css";

export default function NavBar({ onMenuClick }) {
  // Memoize the links to avoid unnecessary re-renders (optional in this case but useful for larger components)
  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "#menu", label: "Menu", onClick: onMenuClick }, // Trigger scroll on click
    { to: "#", label: "Book Table" },
    { to: "#", label: "Contact Us" },
  ];

  const iconLinks = [
    { to: "#", icon: <UserOutlined />, label: "User" },
    { to: "#", icon: <ShoppingCartOutlined />, label: "Cart" },
    { to: "#", icon: <SearchOutlined />, label: "Search" },
  ];

  return (
    <div className="Container">
      <nav>
        {/* Logo Section */}
        <div className="Logo" aria-label="Website Logo">
          feane
        </div>

        {/* Navigation Links */}
        <ul className="NavLinks">
          {navigationLinks.map(({ to, label, onClick }) => (
            <li key={label}>
              <Link to={to} onClick={onClick} aria-label={label}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="NavButtons">
          {iconLinks.map(({ to, icon, label }) => (
            <li key={label}>
              <Link to={to} aria-label={label}>
                {icon}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="OrderButton"
          aria-label="Order Online"
          onClick={onMenuClick}
        >
          Order Online
        </button>
      </nav>
    </div>
  );
}
