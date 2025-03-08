import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/FoodPage.css";
import { GetFoodApi } from "../API Calls/Foods/GetFood.jsx";
import RecommendedFood from "../components/RecommendedFood.jsx";
import { message } from "antd";

export default function FoodPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  // Initialize the cart only if it doesn't already exist
  useEffect(() => {
    if (!window.sessionStorage.getItem("Cart")) {
      window.sessionStorage.setItem("Cart", JSON.stringify([]));
    }
  }, []);

  const HandelAddToCart = () => {
    // Get the current cart from sessionStorage
    let cart = JSON.parse(window.sessionStorage.getItem("Cart"));

    // If the cart is empty, initialize it
    if (!cart) {
      cart = [];
    }

    // Check if the food item is already in the cart
    const existingItemIndex = cart.findIndex((item) => item.id === food.id);

    if (existingItemIndex >= 0) {
      // If the food item is already in the cart, update its quantity
      cart[existingItemIndex].quantity = numberOfItems;
      message.info(
        "The item is already in your order. We updated the quantity.",
      );
      setNumberOfItems(1);
    } else {
      // If the food item is not in the cart, add it
      cart.push({
        id: food.id,
        quantity: numberOfItems,
        image_url: food.image_url,
        name: food.name,
        price: food.price,
      });
      message.success("Added To Your Order");
    }

    // Save the updated cart to sessionStorage
    window.sessionStorage.setItem("Cart", JSON.stringify(cart));
    setNumberOfItems(1);
  };

  useEffect(() => {
    const fetchFood = async () => {
      const response = await GetFoodApi(id);
      if (response) {
        setFood(response[0]);
      } else {
        console.error("Failed to fetch food details");
      }
    };
    fetchFood();
  }, [id]);

  useEffect(() => {
    document.title = food?.name || "Food Item";
  }, [food]);

  const Increment = () => {
    setNumberOfItems(numberOfItems + 1);
  };

  const Decrement = () => {
    if (numberOfItems === 1) {
      return;
    }
    setNumberOfItems(numberOfItems - 1);
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"FoodPage"}>
      {/* Breadcrumb Navigation */}
      <div className={"Breadcrumb"}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/category/${food.category_id}`}>{food.category_name}</Link> /{" "}
        {food.name}
      </div>

      {/* Food Details */}
      <div className={"DisplayFood"}>
        <div className={"FoodName"}>{food.name}</div>
        <div className={"FoodDetails"}>
          <div className={"FoodImage"}>
            <img src={food.image_url} alt={food.name} />
          </div>
          <div className={"Details"}>
            <div className={"Food"}>{food.name}</div>
            <div className={"FoodDescription"}>{food.description}</div>
            <ul className={"Ingredients"}>
              <h3>Ingredients ⚡ </h3>
              {food.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
            <div className={"Quantity"}>
              <div className={"QuantitySelector"}>
                <button onClick={Decrement}>-</button>
                <span>{numberOfItems}</span>
                <button onClick={Increment}>+</button>
              </div>
              <div className={"TotalPrice"}>
                <span>Total Price: </span>
                <span>{food.price * numberOfItems} LE</span>
              </div>
            </div>
            <div className={"AddToCart"}>
              <button onClick={HandelAddToCart}>Add To Your Order 🤗</button>
            </div>
          </div>
        </div>
      </div>

      <div className={"Splitter"}>We Also Recommend 🍔</div>

      <RecommendedFood />
    </div>
  );
}
