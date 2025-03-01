import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Landing from "./components/Landing.jsx";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Landing />
    </>
  );
}
