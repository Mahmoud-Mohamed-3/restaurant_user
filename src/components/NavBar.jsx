import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../css/NavBar.css";

export default function NavBar() {
  return (
    <div className={"Container"}>
      <nav>
        <div className={"Logo"}>feane</div>
        <ul className={"NavLinks"}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"#"}>Menu</Link>
          </li>
          <li>
            <Link to={"#"}>Book Table</Link>
          </li>
        </ul>
        <ul className={"NavButtons"}>
          <li>
            <Link to={"#"}>
              <UserOutlined />
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <ShoppingCartOutlined />
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <SearchOutlined />
            </Link>
          </li>
        </ul>
        <button className={"OrderButton"}>Order Online</button>
      </nav>
    </div>
  );
}
