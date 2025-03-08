import "../css/book_table.css";
import { useEffect, useState } from "react";
import { DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { GetTablesApi } from "../API Calls/Tables/GetAllTables.jsx";
import Tables from "../assets/tables.avif";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BookTableApi } from "../API Calls/Tables/BookTable.jsx";

export default function BookTable() {
  useEffect(() => {
    document.title = "Book Table";
  }, []);

  const [cookies] = useCookies();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingFrom, setBookingFrom] = useState(null);
  const [bookingTo, setBookingTo] = useState(null);

  useEffect(() => {
    const getTables = async () => {
      const response = await GetTablesApi();
      setTables(response);
    };
    getTables();
  }, []);

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const handleSubmit = async () => {
    if (!cookies.jwt) {
      message.error("Please login to book a table");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
      return;
    }
    if (!selectedTable || !bookingFrom || !bookingTo) {
      message.error("Please select a table and a valid date & time.");
      return;
    }

    // Ensure that booking 'to' is strictly after booking 'from'
    if (bookingTo.isBefore(bookingFrom)) {
      message.error("Booking end time must be later than the start time.");
      return;
    }

    const reservation = {
      booked_from: bookingFrom.format("YYYY-MM-DD HH:mm"),
      booked_to: bookingTo.format("YYYY-MM-DD HH:mm"),
    };

    const response = await BookTableApi(
      selectedTable.id,
      reservation,
      cookies.jwt,
    );

    if (!response || !response.status) {
      message.error("An unexpected error occurred. Please try again.");
      return;
    }

    switch (response.status) {
      case 201:
        message.success("Table booked successfully!");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
        break;
      case 400:
        message.error("Invalid request. Please check your inputs.");
        break;
      case 401:
        message.error("Unauthorized! Please log in again.");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
        break;
      case 403:
        message.error("You do not have permission to book this table.");
        break;
      case 404:
        message.error("Table not found. Please refresh and try again.");
        break;
      case 422:
        message.error(
          response.message || "Validation failed. Please check your input.",
        );
        break;
      case 500:
        message.error("Server error! Please try again later.");
        break;
      default:
        message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="BookTablePage">
      <div className={"Breadcrumb"}>
        <Link to="/">Home</Link> / {"Book Table"}
      </div>
      <h1 className="Title">Book a Table</h1>
      <div className={"PageContent"}>
        <div className={"FormContainer"}>
          <p className="Desc">Select a table and choose your booking time.</p>

          <div className="TablesContainer">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`TableItem ${selectedTable?.id === table.id ? "Selected" : ""}`}
                onClick={() => handleTableClick(table)}
              >
                <p>{table.table_name}</p>
                <span>{table.num_of_seats} seats</span>
              </div>
            ))}
          </div>

          <div className="BookingForm">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="Booking From"
              disabledDate={(current) =>
                current && current.isBefore(dayjs().startOf("day"))
              }
              onChange={setBookingFrom}
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="Booking To"
              disabledDate={(current) =>
                // Do not disable the entire day, only times before bookingFrom
                bookingFrom && current.isBefore(bookingFrom.startOf("minute"))
              }
              onChange={setBookingTo}
            />
            <Button type="primary" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </div>
        </div>
        <div className="Image">
          <img src={Tables} alt="Tables" />
        </div>
      </div>

      <div className={"Wishing"}>
        <h2>Enjoy your meal!</h2>
        <p>
          Thank you for choosing our restaurant. We hope you have a wonderful
          dining experience.
        </p>
      </div>
    </div>
  );
}
