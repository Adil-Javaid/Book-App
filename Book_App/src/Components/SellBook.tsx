import React, { useState } from "react";
import "./sellBook.css";

interface Book {
  title: string;
  author: string;
  coverImage: string;
  type: string;
  price: number;
}

const SellBook: React.FC = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    coverImage: "",
    type: "Age Difference",
    price: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const types = ["Age Difference", "Force Marriage", "Revenge", "Sad"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Submit the book data to the 'pending-books' API for admin approval
      const response = await fetch("https://booksite-b7kfhvha.b4a.run//api/pending-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setMessage("Book submitted for admin approval!");
        setBook({
          title: "",
          author: "",
          coverImage: "",
          type: "Age Difference",
          price: 0,
        });
      } else {
        setMessage("Failed to submit the book. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="sellBookContainer">
      <h2>Sell Your Book</h2>
      <form className="sellBookForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="coverImage">Cover Image URL:</label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          value={book.coverImage}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price">Price (PKR):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={book.price}
          onChange={handleInputChange}
          min="1"
          required
        />

        <label htmlFor="type">Book Type:</label>
        <select
          id="type"
          name="type"
          value={book.type}
          onChange={handleInputChange}
          required
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Approval"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SellBook;
