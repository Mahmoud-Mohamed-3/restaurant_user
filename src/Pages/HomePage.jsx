import { useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Landing from "../components/Landing.jsx";
import AboutUS from "../components/AboutUS.jsx";
import Categories from "../components/Categories.jsx";
import OurChefs from "../components/OurChefs.jsx";
import OurCustomersOpinion from "../components/OurCustomersOpinion.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage() {
  // Create a ref for the Categories component (Menu)
  const categoriesRef = useRef(null);

  // Scroll to Categories section
  const handleScrollToCategories = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <NavBar onMenuClick={handleScrollToCategories} />
      <Landing onMenuClick={handleScrollToCategories} />
      <AboutUS />

      {/* Reference Categories to scroll to it */}
      <div ref={categoriesRef}>
        <Categories />
      </div>

      <OurChefs />
      <OurCustomersOpinion />
      <Footer />
    </>
  );
}
