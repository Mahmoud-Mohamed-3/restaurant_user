import { useEffect, useState } from "react";
import "../css/cart.css";
import { DeleteFilled } from "@ant-design/icons";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CreateOrderApi } from "../API Calls/Orders/CreateOrder.jsx";

export default function CartPage() {
  const [cookies] = useCookies();
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.sessionStorage.getItem("Cart")) || [],
  );

  useEffect(() => {
    document.title = "Cart";
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("Cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDelete = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    message.success("Item removed from cart");
  };

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity + delta > 0) {
      newCart[index].quantity += delta;
      setCartItems(newCart);
    }
  };

  const handelOrdering = async () => {
    if (!cookies.jwt) {
      message.error("Please login to order");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    } else {
      const result = await CreateOrderApi(cartItems, cookies.jwt);

      if (result.success) {
        message.success("Order placed successfully!");
        setTimeout(() => {
          window.location.replace("/");
          window.sessionStorage.setItem("Cart", JSON.stringify([]));
          setCartItems([]);
        }, 1000);
      } else {
        message.error(result.message);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="CartPage">
        <div className="Title">Your Cart</div>
        <div className="EmptyCartContainer">
          <div className="EmptyCart">Your cart is empty</div>
          <button
            onClick={() => window.location.replace("/")}
            className="Button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="CartPage">
      <div className="Title">Your Cart</div>
      <div className="ItemsContainer">
        {cartItems.map((item, index) => (
          <div className="Item" key={index}>
            <Link to={"/food/" + item.id}>
              <div className="ItemImage">
                <img src={item.image_url} alt={item.name} />
              </div>
            </Link>
            <div className="ItemDetails">
              <div className="Name">{item.name}</div>
              <div className="Price">{item.price * item.quantity} LE</div>
              <div className="QuantityControls">
                <button onClick={() => handleQuantityChange(index, -1)}>
                  -
                </button>
                <span className="Quantity">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
              <div className="DeleteIcon" onClick={() => handleDelete(index)}>
                <DeleteFilled />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="OrderSummary">
        <div className="SummaryTitle">Order Summary</div>
        <div className="OrderItems">
          {cartItems.map((item, index) => (
            <div className="OrderItem" key={index}>
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>{item.price * item.quantity} LE</span>
            </div>
          ))}
        </div>
        <div className="TotalPrice">Total: {totalAmount} LE</div>
        <button className="CheckoutButton" onClick={handelOrdering}>
          Order Now
        </button>
      </div>
    </div>
  );
}
