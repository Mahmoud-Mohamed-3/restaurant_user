import { useEffect, useState } from "react";
import { GetAllCategories } from "../API Calls/Categories/GetAllCategories.jsx";
import Loader from "./Loader.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../css/categories.css";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await GetAllCategories();
      if (response) {
        setCategories(response);
      } else {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  if (categories.length === 0) {
    return <Loader />;
  }

  return (
    <section className="CategoriesSection" id={"menu"}>
      <h2 className="SectionTitle">What We Offer?</h2>

      <div
        className={`CustomCursor ${showCursor ? "visible" : ""}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      >
        View
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="CategoriesSlider"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/category/${category.id}`}>
              <div
                className="CategoryCard"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <img
                  src={category.image_url}
                  alt={category.title}
                  className="CategoryImage"
                />
                <div className="CategoryContent">
                  <h3>{category.title}</h3>
                  <p>
                    {category.description.split(" ").slice(0, 10).join(" ")}...
                  </p>
                  <button className="ViewCategoryButton">Order Now</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
