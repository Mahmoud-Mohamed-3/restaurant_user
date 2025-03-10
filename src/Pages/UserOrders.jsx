import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GetUserOrdersApi } from "../API Calls/User/GetOrders.jsx";
import { motion, AnimatePresence } from "framer-motion";
import "../css/user_orders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await GetUserOrdersApi(cookies.jwt);
      if (response) {
        setOrders(response.data);
        setFilteredOrders(response.data);
      } else {
        console.error("Failed to fetch user orders");
      }
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000); // Add a small delay before redirect to allow UI updates
    }
  });
  useEffect(() => {
    let filteredData = orders;

    if (filter === "all") {
      filteredData = orders;
    } else if (filter === "newest") {
      filteredData = [...orders].sort(
        (a, b) => new Date(b.order_time) - new Date(a.order_time),
      );
    } else {
      filteredData = orders.filter((order) => order.order_status === filter);
    }

    setFilteredOrders(filteredData);
  }, [filter, orders]);

  const viewItems = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="UserOrdersPage">
      <div className="PageTitle">
        <h1>Your Orders</h1>
      </div>
      <div className="UserOrdersPageContent">
        <div className="Controllers">
          <motion.div
            className="Text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Showing {filteredOrders.length} orders
          </motion.div>
          <motion.div
            className="Filter"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="newest">Newest</option>
            </select>
          </motion.div>
        </div>

        <div className="OrdersTable">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{order.id}</td>
                    <td className={order.order_status}>{order.order_status}</td>
                    <td className={"OrderTotalPrice"}>
                      {order.total_price} LE
                    </td>
                    <td>{new Date(order.order_time).toLocaleString()}</td>
                    <td>
                      <button
                        className="ViewDetails"
                        onClick={() => viewItems(order)}
                      >
                        View Items
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div
                className="Overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
              ></motion.div>
              <div className={"OrderDetailsContainer"}>
                <motion.div
                  className="OrderItemsModal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="ModalContent">
                    <h2>Order #{selectedOrder.id} Items</h2>
                    <ul>
                      {selectedOrder.order_items.map((item) => (
                        <li key={item.id}>
                          <strong>Food :</strong> {item.food_name} -
                          <strong> Quantity:</strong> {item.quantity} -
                          <strong> Price:</strong>{" "}
                          <span>{item.price} LE -</span>
                          <strong> Status:</strong> {item.status}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="CloseButton"
                      onClick={() => setSelectedOrder(null)}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
