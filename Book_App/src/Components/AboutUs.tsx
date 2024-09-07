import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./aboutus.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>
        Welcome to Magic Book.
        We are dedicated to offering the best Urdu Novels and also give you a chance to sell your book.
      </p>
      <p>
        Whether you’re looking for Online reading, buy books, or sell Books,
        Magic Book is here to help you every step of the way.
      </p>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>
          Email: <a href="mailto:info@twinstails.com">info@magicBook.com</a>
        </p>
        <p>
          WhatsApp: <a href="https://wa.me/1234567890">+92 300-1234-567</a>
        </p>
        <div className="social-media">
          <a
            href="https://facebook.com/magicBook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/magicBook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/MagicBook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/company/MagicBook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="company-details">
        <h3>Our Mission</h3>
        <p>
          At Magic Book, we believe that books are best for inner peace. Our mission is to
          provide top-notch Books and selling services.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
