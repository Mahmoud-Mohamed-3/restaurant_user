import { useState } from "react";
import "../css/contact.css";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span> / </span> <span>Contact Us</span>
      </div>

      {/* Page Title */}
      <h1 className="page-title">Contact Us</h1>

      {/* Contact Section */}
      <div className="contact-container">
        {/* Left: Contact Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <p>
            Have any questions? Send us a message and we’ll get back to you.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Details */}
        <div className="contact-info">
          <h2>Contact Details</h2>
          <p>We’re here to help! Reach out via phone or email.</p>
          <div className="info-item">
            <strong>📍 Address:</strong>
            <p>1234 Main St, City, State, 12345</p>
          </div>
          <div className="info-item">
            <strong>📞 Phone:</strong>
            <p>123-456-7890</p>
          </div>
          <div className="info-item">
            <strong>✉️ Email:</strong>
            <p>contact@yourwebsite.com</p>
          </div>
        </div>
      </div>
      <div className="Wishing">
        <h1>Wishing you a happy day!</h1>
        <p>
          We hope you have a great day. If you have any questions or concerns,
          please feel free to reach out to us. We are here to help.
        </p>
      </div>
    </div>
  );
}
