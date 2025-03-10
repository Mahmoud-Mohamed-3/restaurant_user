import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { GetUserStatsApi } from "../API Calls/User/GetStats.jsx";
import "../css/user_stats.css";
import { Link } from "react-router-dom";

export default function UserStats() {
  const [cookies] = useCookies();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    }
  }, [cookies.jwt]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await GetUserStatsApi(cookies.jwt);
      if (response) {
        setStats(response.data);
      } else {
        console.error("Failed to fetch user stats");
      }
    };
    fetchStats();
  }, [cookies.jwt]);

  return (
    <div className="UserStatsPage">
      <div className="PageTitle">
        <h1>✨ Your Stats - Let's Celebrate! 🎉</h1>
      </div>

      {/* Displaying Stats */}
      {stats ? (
        <div className="stats">
          {/* Reservations Section */}
          <div className="stat-card">
            <div className="stat-title">
              <span>🏆</span>
              <span className={"Tit"}>
                Reservation Champion – You’ve Got This!
              </span>
            </div>
            <p>
              You’ve booked a total of{" "}
              <span className={"Strong"}>{stats.total_reservations}</span>{" "}
              tables. 🎯 Looks like you’ve got a great taste for dining out! 🌟
            </p>
            <p>
              Your all-time favorite table is{" "}
              <span className={"Strong"}>"{stats.fav_table.table_name}"</span>{" "}
              where you've enjoyed meals with{" "}
              <span className={"Strong"}>
                {stats.fav_table.num_of_seats - 1}
              </span>{" "}
              awesome people! 💕 You truly know how to pick the best spots! 🍽️
            </p>
          </div>

          {/* Orders Section */}
          <div className="stat-card">
            <div className="stat-title">
              <span>💸</span>{" "}
              <span className={"Tit"}>
                Order Stats – You’re Spending Like a Boss!
              </span>
            </div>
            <p>
              You've placed{" "}
              <span className={"Strong"}>{stats.number_of_orders}</span> orders.
              🎉 You’re clearly a connoisseur of fine dining! 🍴
            </p>
            <p>
              You’ve splurged a total of{" "}
              <span className={"Strong"}>{stats.total_spent} LE</span> – that’s
              luxury on a plate! ✨ Treat yourself, you deserve it! 💖
            </p>
            <p>
              Your average spending per order is{" "}
              <span className={"Strong"}>{stats.av_spent} LE</span>. You know
              how to enjoy the finer things in life! 🥂
            </p>
            <p>
              Your fastest order was completed in just{" "}
              <span className={"Strong"}>{stats.fastest_order}</span> minutes!
              ⚡ You’re as fast as your taste is impeccable. 🚀
            </p>
            <p>
              The slowest?{" "}
              <span className={"Strong"}>{stats.slowest_order}</span> minutes –
              but hey, good things come to those who wait! ⏳
            </p>
          </div>

          {/* Most Ordered Food Section */}
          <div className="stat-card">
            <div className="stat-title">
              <span>🍔</span>{" "}
              <span className={"Tit"}>
                Your Favorite Dish – The Ultimate Foodie Flex!
              </span>
            </div>
            <div className="food-info">
              <Link to={`/food/${stats.most_ordered_food.id}`}>
                <img
                  src={stats.most_ordered_food.image_url}
                  alt={stats.most_ordered_food.name}
                  className="food-image"
                />
              </Link>
              <p>
                Your most ordered dish is{" "}
                <span className={"Strong"}>{stats.most_ordered_food.name}</span>
                ! 🍽️ It’s clearly your ultimate foodie flex. 👑 Is it your
                secret obsession? 😍
              </p>
            </div>
          </div>

          {/* Valued Orders Section */}
          <div className="stat-card">
            <div className="stat-title">
              <span>💰</span>{" "}
              <span className={"Tit"}>
                Valued Orders – You’re Living the Luxe Life!
              </span>
            </div>
            <div>
              <h3>Your Most Expensive Order – The Luxe Experience!</h3>
              <p>
                Price:{" "}
                <span className={"Strong"}>
                  {stats.most_valued_order.total_price} LE
                </span>{" "}
                – worth every penny, right? 🏆
              </p>
              <p>
                Ordered At:{" "}
                <span className={"Strong"}>
                  {new Date(
                    stats.most_valued_order.order_time,
                  ).toLocaleString()}
                </span>{" "}
                – only the best for you! 🌟
              </p>
            </div>
            <div>
              <h3>Your Least Expensive Order – Small but Mighty! 💪</h3>
              <p>
                Price:{" "}
                <span className={"Strong"}>
                  {stats.less_valued_order.total_price} LE
                </span>{" "}
                – Even the smallest order has its charm! ✨
              </p>
              <p>
                Ordered At:{" "}
                <span className={"Strong"}>
                  {new Date(
                    stats.less_valued_order.order_time,
                  ).toLocaleString()}
                </span>{" "}
                – Every order tells a story! 📖
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>
          ✨ Hang tight! Your epic dining journey is about to be revealed... 🕒
        </p>
      )}
    </div>
  );
}
