import "../css/user_reservations.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GetReservationsApi } from "../API Calls/User/GetRservations.jsx";
import { motion } from "framer-motion";

export default function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "upcoming", "past"
  const [cookies] = useCookies();

  // Check for JWT token before rendering the reservations
  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000); // Add a small delay before redirect to allow UI updates
    }
  }, [cookies.jwt]);

  // Fetch reservations on initial load
  useEffect(() => {
    const fetchReservations = async () => {
      const response = await GetReservationsApi(cookies.jwt);
      if (response) {
        setReservations(response.data);
        setFilteredReservations(response.data); // Initially show all
      } else {
        console.error("Failed to fetch user reservations");
      }
    };
    fetchReservations();
  }, [cookies.jwt]);

  // Filter reservations based on the selected filter
  useEffect(() => {
    const filtered = reservations.filter((reservation) => {
      const reservationTime = new Date(reservation.booked_from).getTime();
      const currentTime = Date.now();
      if (filter === "upcoming") {
        return reservationTime > currentTime; // Upcoming reservations
      } else if (filter === "past") {
        return reservationTime < currentTime; // Past reservations
      } else {
        return true; // All reservations
      }
    });
    setFilteredReservations(filtered);
  }, [filter, reservations]);

  return (
    <div className={"UserReservationsPage"}>
      <div className={"PageTitle"}>
        <h1>Your Reservations</h1>
      </div>

      <div className={"Controllers"}>
        <div className="Filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Display number of reservations */}
        <div className="ReservationsCount">
          <p>{filteredReservations.length} Reservations</p>
        </div>
      </div>
      {/* Reservations Table */}
      <motion.div
        className="ReservationsTable"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>Booked From</th>
              <th>Booked To</th>
              <th>Number Of Seats</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <motion.tr
                key={reservation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={"TableName"}>{reservation.table_name}</td>
                <td className={"BookedFrom"}>
                  {new Date(reservation.booked_from).toLocaleString()}
                </td>
                <td className={"BookedTo"}>
                  {new Date(reservation.booked_to).toLocaleString()}
                </td>
                <td className={"NumOfSeats"}>{reservation.num_of_seats}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
