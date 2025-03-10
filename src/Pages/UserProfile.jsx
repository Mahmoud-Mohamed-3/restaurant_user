import SideBar from "../components/SideBar.jsx";
import { Outlet } from "react-router-dom";
import "../css/userProfile.css";
export default function UserProfile() {
  return (
    <>
      <SideBar />
      <div className={"Outlet"}>
        <Outlet />
      </div>
    </>
  );
}
