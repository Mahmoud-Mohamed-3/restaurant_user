import { useEffect, useState } from "react";
import { GetRecommendedFoodsApi } from "../API Calls/Foods/GetRecommendedFoods.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "../css/recommendedFood.css";
export default function RecommendedFood() {
  const [recommendedFoods, setRecommendedFoods] = useState([]);
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
    const fetchRecommendedFoods = async () => {
      const response = await GetRecommendedFoodsApi();
      if (response) {
        setRecommendedFoods(response.data);
      } else {
        console.error("Failed to fetch recommended foods");
      }
    };
    fetchRecommendedFoods();
  }, []);
  if (!recommendedFoods) {
    return <div>Loading...</div>;
  }
  return (
    <section className="RecommendesFoodSection">
      <div
        className={`CustomCursor ${showCursor ? "visible" : ""}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      >
        Order
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
        className="foodSlider"
      >
        {recommendedFoods.map((food) => (
          <SwiperSlide key={food.id}>
            <Link
              to={`/food/${food.id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div
                className="foodCard"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <img
                  src={food.image_url}
                  alt={food.name}
                  className="foodImage"
                />
                <div className="foodContent">
                  <h3>{food.name}</h3>
                  <p>{food.description.split(" ").slice(0, 10).join(" ")}...</p>
                  <button className="ViewfoodButton">Order Now</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
