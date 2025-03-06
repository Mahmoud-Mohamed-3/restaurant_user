import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetCategoryDetailsApi } from "../API Calls/Categories/GetCategoryDetails.jsx";
import { motion } from "framer-motion";
import "../css/CategoryPage.css";
import NavBar from "../components/NavBar.jsx";

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await GetCategoryDetailsApi(id);
      if (response) {
        setCategory(response.category);
        setFoods(response.foods);
      } else {
        console.error("Failed to fetch category details");
      }
    };
    fetchCategory();
  }, [id]);

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
    document.title = category?.title || "Category";
  }, [category]);

  const firstTwentyWords = (text) => {
    return (
      text.split(" ").slice(0, 20).join(" ") +
      (text.split(" ").length > 20 ? "..." : "")
    );
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="CategoryPage">
        {/* Breadcrumb Navigation */}
        <div className="Breadcrumb">
          <Link to="/">Home</Link> / {category.title}
        </div>

        <div className="CategoryName">{category.title}</div>
        <div className={"CategoryDetails"}>
          <div className={"CategoryImage"}>
            <img src={category.image_url} alt={category.title} />
          </div>
          <div className={"Details"}>
            <div className={"CategoryTitle"}>
              <h2>{category.title}</h2>
            </div>
            <div className={"CategoryDescription"}>
              <p>{category.description}</p>
            </div>
          </div>
        </div>
        <div className={"FoodsSplitter"}>Explore What We Offer 😋</div>
        <div className={"FoodCardsContainer"}>
          <div
            className={`CustomCursor ${showCursor ? "visible" : ""}`}
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}
          >
            Order
          </div>
          <div className="FoodGrid">
            {foods.map((food) => (
              <Link to={`/food/${food.id}`} key={food.id}>
                <div
                  className="FoodCard"
                  onMouseEnter={() => setShowCursor(true)}
                  onMouseLeave={() => setShowCursor(false)}
                >
                  <div className={"ImageContainer"}>
                    <img
                      src={food.image_url}
                      alt={food.name}
                      srcSet={`${food.image_url}?w=400 400w, ${food.image_url}?w=800 800w`}
                      sizes="(max-width: 768px) 400px, 800px"
                    />
                  </div>

                  <div className="card-body">
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {food.name}
                    </motion.h3>
                    <p>{firstTwentyWords(food.description)}</p>
                    <div className={"Price"}>{food.price} LE</div>
                    <button className={"OrderButton"}>Order Now</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
