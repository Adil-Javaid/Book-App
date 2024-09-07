import React, { useState, useEffect } from "react";
import "./arrival.css";
import { Book } from "../type";
import { useNavigate } from "react-router-dom";

interface ArrivalProps {
  addToCart: (book: Book) => void;
}

const Arrival: React.FC<ArrivalProps> = ({ addToCart }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Age Difference");
  const [loading, setLoading] = useState<boolean>(true);

  const types = ["Age Difference", "Force Marriage", "Revenge", "Sad"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:6005/api/new-books");
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => book.type === selectedType);

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <div>
      <div className="typeBar">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              backgroundColor: selectedType === type ? "#007BFF" : "#f0f0f0",
              color: selectedType === type ? "#fff" : "#000",
            }}
            className="typeButton"
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bookGrid">
          {filteredBooks.map((book, index) => (
            <div key={index} className="bookCard">
              <img
                src={book.coverImage}
                alt={book.title}
                className="bookImage"
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="bookPrice">PKR: {book.price}</p>
              <div className="bookActions">
                <button
                  className="addToCartButton"
                  onClick={() => addToCart(book)}
                >
                  Add to Carts
                </button>
                <button className="buyButton" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Arrival;
