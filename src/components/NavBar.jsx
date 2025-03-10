import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../css/NavBar.css";
import { Badge } from "antd";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { SearchFoodApi } from "../API Calls/Foods/SearchFood.jsx";

export default function NavBar({ onMenuClick }) {
  const [openSearch, setOpenSearch] = useState(false);
  const cart = JSON.parse(window.sessionStorage.getItem("Cart") || "[]");
  const cartCount = Array.isArray(cart) ? cart.length : 0;
  const [cookies, setCookies] = useCookies();
  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "#menu", label: "Menu", onClick: onMenuClick }, // Trigger scroll on click
    { to: "/book_table", label: "Book Table" },
    { to: "/contact", label: "Contact Us" },
  ];

  const iconLinks = [
    {
      to: `${cookies.jwt ? "/profile" : "/login"}`,
      icon: (
        <UserOutlined
          onClick={() => {
            if (!cookies.jwt) {
              window.location.href = "/login";
            }
          }}
        />
      ),
      label: "User",
    },
    {
      to: "/cart",
      icon: (
        <Badge count={cartCount} showZero>
          <ShoppingCartOutlined />
        </Badge>
      ),
      label: "Cart",
    },
    {
      to: "#",
      icon: (
        <SearchOutlined
          onClick={() => {
            setOpenSearch(!openSearch);
          }}
        />
      ),
      label: "Search",
    },
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
        {openSearch && <Search />}

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

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const response = await SearchFoodApi(query);
      if (response) {
        setResults(response.data);
      }
    };
    fetchResults();
  }, [query]);
  console.log(query);
  console.log(results);
  return (
    <div className={"SearchContainer"}>
      <div className="Search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button>
          <SearchOutlined />
        </button>
      </div>
      {query && (
        <div className={"Results"}>
          <ul className={"ResultsList"}>
            {results.map((result) => (
              <li key={result.id}>
                <Link to={`/food/${result.id}`}>
                  <div>
                    <img src={result.image_url} alt={result.name} />
                    <p>{result.name}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
