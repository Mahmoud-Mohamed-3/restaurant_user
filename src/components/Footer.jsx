import React from "react";
import "../css/footer.css";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        {/* Footer Content Section */}
        <div className="footer_content">
          {/* Logo Section */}
          <div className="footer_item logo_section">
            <a href="/" className="footer-logo">
              Feane
            </a>
            <p className="footer-description">
              Enjoy high-quality food in a cozy atmosphere. Taste the difference
              with Feane.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="footer_item social_section">
            <h4>Follow Us</h4>
            <div className="footer_social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookFilled />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer_bottom">
          <p>
            &copy; {new Date().getFullYear()} Feane. All Rights Reserved.
            <br />
            Crafted with ❤ by{" "}
            <a
              href="https://github.com/Mahmoud-Mohamed-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              MaNo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
